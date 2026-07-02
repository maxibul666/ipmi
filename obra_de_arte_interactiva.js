// ============================================================================
//  OBRA INTERACTIVA — "acuarela por opacidad"
//  ---------------------------------------------------------------------------
//  Modelo: la composición es FIJA (2 manchas + 5 líneas). El micrófono NO crea
//  formas nuevas: revela (sube opacidad) u oculta (borra) una composición que
//  ya está posicionada. Un único color índigo; toda la variación es el alfa.
//
//  p5.js 1.x  →  createSlider/createDiv son parte del CORE (p5.dom ya integrado),
//  así que no hace falta cargar ninguna librería extra para el menú HTML.
// ============================================================================

// ---------- Lienzo vertical (tipo cuadro) ----------
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 900;

// ---------- Color ÚNICO (azul marino / índigo) ----------
const AZUL = [33, 42, 92];

// ---------- Parámetros de comportamiento (ajustables) ----------
const MAX_OPACIDAD = 200;      // alfa máximo por forma
const VEL_PINTADO = 4;         // cuánto sube el alfa por frame al haber señal
const VEL_BORRADO = 7;         // cuánto baja el alfa por frame al sisear

const SPIKE_APLAUSO = 0.05;    // salto brusco de volumen para contar como aplauso
const NIVEL_APLAUSO_MIN = 0.08;// volumen mínimo absoluto para el aplauso
const TREBLE_APLAUSO_MIN = 60; // energía mínima en agudos altos para el aplauso.
                               // Un aplauso es un "chasquido" de banda ancha (tiene
                               // agudos); un grave/bombo puro NO -> así el grave ya
                               // no se confunde con un aplauso.
const COOLDOWN_APLAUSO = 350;  // ms de descanso tras un aplauso (evita repetir)
const SISEO_FRAMES_MIN = 8;    // frames de siseo sostenido para empezar a borrar

// ---------- Estado ----------
let manchas = [];   // [mancha1 (abajo), mancha2 (arriba)]
let lineas  = [];   // [linea1 (arriba) ... linea5 (abajo)]
let formas  = [];   // orden de dibujo/stack = manchas + líneas (define el LIFO)

let started = false;
let audioListo = false;
let mic, fft, amplitude;

let nivelAnterior = 0;
let cooldownAplauso = 0;
let siseoContador = 0;

// Lecturas de señal (para el panel en vivo)
let energiaGraves = 0, energiaMedios = 0, energiaSiseo = 0, volumen = 0;

// ---------- Recursos ----------
let manchaImg, manchaImg2, lineaImg;
let papel;

// ---------- DOM ----------
let lienzo, contenedor, panel, lecturasDOM;
let ctrlVol, ctrlGraves, ctrlMedios, ctrlSiseo;
let umbralVolumen, umbralGraves, umbralMedios, umbralSiseo; // valores de los sliders


function preload() {
  manchaImg  = loadImage('mancha-mejorada.png');
  manchaImg2 = loadImage('mancha-mejorada-2.png');
  lineaImg   = loadImage('linea-mejorada.png');
}

function setup() {
  lienzo = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  noStroke();

  papel = granoDePapel();  // textura estática de papel
  crearComposicion();      // posiciones FIJAS de manchas y líneas
  crearInterfaz();         // panel HTML con sliders (p5.dom)
}

// El audio del navegador exige un gesto del usuario:
// arrancamos el micrófono al hacer click sobre el lienzo.
function mousePressed() {
  if (!started) {
    started = true;
    userStartAudio().then(iniciarAudio);
  }
}

function iniciarAudio() {
  mic = new p5.AudioIn();
  mic.start(() => {
    amplitude = new p5.Amplitude();
    amplitude.setInput(mic);
    fft = new p5.FFT(0.85, 1024); // suavizado alto → energías estables (acuarela quieta)
    fft.setInput(mic);
    audioListo = true;
  });
}


function draw() {
  blendMode(BLEND);
  background(241, 234, 215);
  dibujarPapel();

  if (!started)  { mostrarInstrucciones(); return; }
  if (!audioListo || !fft || !amplitude) { mostrarCargando(); return; }

  // 1) Leer umbrales de los sliders (tiempo real)
  umbralVolumen = ctrlVol.slider.value();
  umbralGraves  = ctrlGraves.slider.value();
  umbralMedios  = ctrlMedios.slider.value();
  umbralSiseo   = ctrlSiseo.slider.value();

  // 2) Analizar el micrófono.
  //    Uso rangos de Hz EXPLÍCITOS (no los presets de p5, que no coinciden con
  //    los rangos que pediste).
  fft.analyze();
  energiaGraves = fft.getEnergy(20, 250);     // GRAVES  -> manchas
  energiaMedios = fft.getEnergy(1000, 3000);  // MEDIOS  -> líneas (voz)
  energiaSiseo  = fft.getEnergy(4000, 10000); // SISEO   -> borrar
  volumen = amplitude.getLevel();
  let delta = volumen - nivelAnterior;        // salto brusco -> aplauso

  // 3) Temporizadores
  if (cooldownAplauso > 0) cooldownAplauso -= deltaTime;

  // 4) Siseo sostenido ("ssss"): treble alto durante varios frames seguidos.
  //    El contador filtra transitorios (un aplauso no lo sostiene).
  if (energiaSiseo > umbralSiseo && volumen > umbralVolumen) {
    siseoContador++;
  } else {
    siseoContador = max(0, siseoContador - 2);
  }
  let borrando = siseoContador > SISEO_FRAMES_MIN;

  // 5) Decidir la acción del frame (mutuamente excluyentes):
  //    aplauso (invertir)  >  siseo (borrar LIFO)  >  pintar por frecuencia
  //    El aplauso exige treble (banda ancha): un grave fuerte también da un salto
  //    de volumen, pero sin agudos, así que ya NO dispara la inversión.
  let esAplauso = delta > SPIKE_APLAUSO &&
                  volumen > max(umbralVolumen, NIVEL_APLAUSO_MIN) &&
                  energiaSiseo > TREBLE_APLAUSO_MIN &&
                  !borrando && cooldownAplauso <= 0;

  if (esAplauso) {
    for (const f of formas) f.invertir();     // INVERSIÓN de opacidades
    cooldownAplauso = COOLDOWN_APLAUSO;
  } else if (borrando) {
    borrarLIFO(VEL_BORRADO);                   // BORRADO Last-In-First-Out
  } else if (volumen > umbralVolumen) {
    // PINTAR: de a UNA forma por vez, en orden. Cada forma se completa antes de
    // pasar a la siguiente. En un mismo frame pinta SÓLO la banda dominante
    // (la de mayor energía), así un grave no toca las líneas ni un agudo las
    // manchas (evita el "bleed" entre bandas).
    //   - Graves dominantes: pintan mancha 1, después mancha 2. Con las 2
    //     completas, los graves ya no hacen NADA.
    //   - Medios (voz) dominantes: dibujan las líneas (que además crecen).
    if (energiaGraves > umbralGraves && energiaGraves >= energiaMedios) {
      let c = map(energiaGraves - umbralGraves, 0, 255 - umbralGraves, 0.5, VEL_PINTADO, true);
      pintarEnOrden(manchas, c);
    } else if (energiaMedios > umbralMedios && energiaMedios > energiaGraves) {
      let c = map(energiaMedios - umbralMedios, 0, 255 - umbralMedios, 0.5, VEL_PINTADO, true);
      pintarEnOrden(lineas, c);
    }
  }

  // 6) Render acuarela: capas de opacidad multiplicativas.
  //    Fijo el modo ANTES del bucle (fuera de cualquier push) para que se
  //    mantenga MULTIPLY en toda la pasada; luego vuelvo a BLEND.
  blendMode(MULTIPLY);
  for (const f of formas) f.dibujar(); // orden fijo: manchas (1,2) y luego líneas (1..5)
  blendMode(BLEND);

  nivelAnterior = volumen;
  actualizarPanel(borrando);
}


// Pintado EN ORDEN: llena la PRIMERA forma del grupo que todavía no esté
// completa. Al completarse (MAX_OPACIDAD), el próximo frame agarra la
// siguiente. Si están todas completas, no hace nada -> el sonido de esa
// banda deja de tener efecto (así los graves "dibujan solo 2 manchas").
function pintarEnOrden(grupo, cantidad) {
  for (const f of grupo) {
    if (f.opacidad < MAX_OPACIDAD) {
      f.pintar(cantidad);
      return;
    }
  }
}

// Borrado LIFO: apaga la ÚLTIMA forma dibujada que todavía tenga opacidad.
// Al llegar a 0, el próximo frame pasa a la anterior (líneas 5→1, luego manchas).
// Es el espejo de pintarEnOrden: uno llena desde el principio, el otro vacía
// desde el final. Por eso, tras borrar, la forma que quedó a medias vuelve a
// ser la candidata a pintarse.
function borrarLIFO(cantidad) {
  for (let i = formas.length - 1; i >= 0; i--) {
    if (formas[i].opacidad > 0) {
      formas[i].borrar(cantidad);
      return;
    }
  }
}


// ---------- Composición FIJA (sin ningún random) ----------
function crearComposicion() {
  const W = CANVAS_WIDTH, H = CANVAS_HEIGHT;

  // MANCHAS: sólo en la mitad superior, en "cascada" vertical.
  // Mancha 1 va más abajo (se dibuja primero → queda debajo).
  // Mancha 2 va por encima (se dibuja después → se superpone).
  let m1 = new Medialuna(W * 0.47, H * 0.35, W * 0.62, manchaImg,   0.06); // abajo
  let m2 = new Medialuna(W * 0.53, H * 0.19, W * 0.55, manchaImg2, -0.05); // arriba
  manchas = [m1, m2];

  // LÍNEAS: de la mitad inferior hacia abajo, en diagonal "/" (parte baja a la
  // izquierda, parte alta a la derecha). El ancla es el extremo SUPERIOR
  // (arriba-derecha) y el cuerpo cae hacia abajo-izquierda cuando crece.
  // Ángulo POSITIVO => diagonal "/". Se pasan grosorMax y largoMax; el tamaño
  // real depende de cuánto agudo reciban (arrancan chicas y crecen).
  // La primera (más alta) roza el borde inferior de la Mancha 1.
  lineas = [
    new RayaDiagonal(W * 0.64, H * 0.52, 55, 34, H * 0.26, lineaImg),
    new RayaDiagonal(W * 0.55, H * 0.61, 52, 32, H * 0.25, lineaImg),
    new RayaDiagonal(W * 0.66, H * 0.70, 58, 34, H * 0.24, lineaImg),
    new RayaDiagonal(W * 0.52, H * 0.78, 50, 32, H * 0.23, lineaImg),
    new RayaDiagonal(W * 0.62, H * 0.86, 56, 32, H * 0.22, lineaImg),
  ];

  // Orden de dibujo y de stack: manchas (1,2) y luego líneas (1..5).
  // Este MISMO orden define el LIFO del borrado (se borra desde el final).
  formas = [...manchas, ...lineas];
}


// ---------- Interfaz HTML (p5.dom) ----------
function crearInterfaz() {
  // Contenedor flex: lienzo + panel, uno al lado del otro.
  contenedor = createDiv().id('contenedor');
  contenedor.style('display', 'flex');
  contenedor.style('gap', '24px');
  contenedor.style('align-items', 'flex-start');

  lienzo.parent(contenedor);
  lienzo.style('box-shadow', '0 12px 45px rgba(20, 25, 45, 0.25)');
  lienzo.style('border-radius', '2px');

  panel = createDiv().parent(contenedor);
  panel.style('width', '250px');
  panel.style('font-family', 'ui-monospace, Menlo, Consolas, monospace');
  panel.style('color', '#e7e2d5');
  panel.style('background', '#1b2130');
  panel.style('border-radius', '12px');
  panel.style('padding', '20px');
  panel.style('box-sizing', 'border-box');

  createDiv('C O N T R O L E S').parent(panel)
    .style('font-size', '12px').style('letter-spacing', '2px')
    .style('color', '#9aa3ba').style('margin-bottom', '18px');

  // Los cuatro umbrales pedidos:
  ctrlVol    = crearControl('Volumen general',       0, 0.2, 0.02, 0.005, 3);
  ctrlGraves = crearControl('Graves · manchas',      0, 255, 120,  1,     0);
  ctrlMedios = crearControl('Medios · líneas (voz)', 0, 255, 95,   1,     0);
  ctrlSiseo  = crearControl('Siseo · borrado',       0, 255, 115,  1,     0);

  // Lecturas en vivo para calibrar los umbrales mirando la señal real.
  createDiv('SEÑAL EN VIVO').parent(panel)
    .style('font-size', '11px').style('letter-spacing', '1.5px')
    .style('color', '#9aa3ba').style('margin', '22px 0 8px');
  lecturasDOM = createDiv().parent(panel)
    .style('font-size', '11px').style('line-height', '1.8').style('color', '#c3c9da');
}

// Crea una fila "etiqueta + slider" y devuelve una referencia para leer/actualizar.
function crearControl(etiqueta, minV, maxV, valor, paso, decimales) {
  let fila = createDiv().parent(panel).style('margin-bottom', '16px');
  let lab = createDiv(etiqueta).parent(fila)
    .style('font-size', '11px').style('color', '#c3c9da')
    .style('margin-bottom', '7px');
  let s = createSlider(minV, maxV, valor, paso).parent(fila);
  s.style('width', '100%');
  s.style('accent-color', '#5b6ea8');
  return { slider: s, lab: lab, base: etiqueta, decimales: decimales };
}

function actualizarPanel(borrando) {
  actualizarEtiqueta(ctrlVol);
  actualizarEtiqueta(ctrlGraves);
  actualizarEtiqueta(ctrlMedios);
  actualizarEtiqueta(ctrlSiseo);

  lecturasDOM.html(
    filaLectura('volumen', nf(volumen, 1, 3)) +
    filaLectura('graves',  round(energiaGraves)) +
    filaLectura('medios',  round(energiaMedios)) +
    filaLectura('siseo',   round(energiaSiseo)) +
    (borrando ? '<div style="color:#e0a86b;margin-top:6px">⌫ borrando…</div>' : '')
  );
}

function actualizarEtiqueta(c) {
  c.lab.html(c.base + ' &nbsp;<b style="color:#eef">' +
             nf(c.slider.value(), 1, c.decimales) + '</b>');
}

function filaLectura(nombre, valor) {
  return '<div style="display:flex;justify-content:space-between">' +
         '<span>' + nombre + '</span><span>' + valor + '</span></div>';
}


// ---------- Pantallas de texto ----------
function mostrarInstrucciones() {
  push();
  textAlign(CENTER, CENTER);
  fill(50, 55, 70);
  textSize(30);
  textStyle(BOLD);
  text('Pintá la obra con el micrófono', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.20);

  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(17);
  fill(70, 78, 95);
  let x = CANVAS_WIDTH * 0.10;
  let y = CANVAS_HEIGHT * 0.40;
  let paso = 46;
  text('Sonidos graves para pintar las manchas.', x, y);
  text('Sonidos agudos (voz) para pintar las líneas.', x, y + paso);
  text("Un aplauso para invertir las opacidades.", x, y + paso * 2);
  text("Un siseo continuo ('ssss') para ir borrando el cuadro.", x, y + paso * 3);

  textAlign(CENTER, CENTER);
  fill(50, 55, 70);
  textSize(20);
  text('Hacé click para comenzar', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.80);
  pop();
}

function mostrarCargando() {
  push();
  textAlign(CENTER, CENTER);
  fill(60);
  textSize(20);
  text('Iniciando micrófono…', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 12);
  textSize(14);
  text('(permití el acceso al micrófono)', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 18);
  pop();
}


// ---------- Textura de papel (estática) ----------
function granoDePapel() {
  const puntos = [];
  for (let i = 0; i < 850; i++) {
    puntos.push({
      x: random(CANVAS_WIDTH),
      y: random(CANVAS_HEIGHT),
      w: random(1, 5),
      h: random(1, 5),
      c: color(118, 104, 78, random(3, 10)),
    });
  }
  return puntos;
}

function dibujarPapel() {
  noStroke();
  for (const p of papel) {
    fill(p.c);
    rect(p.x, p.y, p.w, p.h);
  }
}
