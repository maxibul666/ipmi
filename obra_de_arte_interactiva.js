// ============================================================================
//  OBRA INTERACTIVA — "Blue 4" (Georgia O'Keeffe) con la voz
// ============================================================================

// ---------- Lienzo achicado para apretar la composición ----------
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 750;

const MAX_OPACIDAD = 255;      
const VEL_PINTADO = 4;         
const VEL_BORRADO = 7;         

const VEL_ALFA_LINEA = 6;      
const VEL_LARGO_LINEA = 2.8;   

const SPIKE_APLAUSO = 0.05;    
const NIVEL_APLAUSO_MIN = 0.08;
const TREBLE_APLAUSO_MIN = 60; 
const COOLDOWN_APLAUSO = 350;  
const SISEO_FRAMES_MIN = 8;    

let manchas = [];   
let lineas  = [];   
let formas  = [];   

let started = false;
let audioListo = false;
let mic, fft, amplitude;

let nivelAnterior = 0;
let cooldownAplauso = 0;
let siseoContador = 0;

let lineaActiva = -1;
let graveSonabaAntes = false;

let energiaGraves = 0, energiaMedios = 0, energiaSiseo = 0, volumen = 0;

let manchaImg, manchaImg2;
let lineaImg1, lineaImg2, lineaImg3;
let fondoImg;

let lienzo, contenedor, panel, lecturasDOM;
let ctrlVol, ctrlGraves, ctrlMedios, ctrlSiseo;
let umbralVolumen, umbralGraves, umbralMedios, umbralSiseo; 


function preload() {
  manchaImg  = loadImage('mancha-mejorada.png');
  manchaImg2 = loadImage('mancha-mejorada-2.png');
  lineaImg1  = loadImage('linea 1.png');
  lineaImg2  = loadImage('linea 2.png');
  lineaImg3  = loadImage('linea 3.png');
  fondoImg   = loadImage('FONDO.png');
}

function setup() {
  lienzo = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  noStroke();

  crearComposicion();      
  crearInterfaz();         
}

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
    fft = new p5.FFT(0.85, 1024); 
    fft.setInput(mic);
    audioListo = true;
  });
}

function draw() {
  blendMode(BLEND);
  
  // Fondo
  imageMode(CORNER);
  image(fondoImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (!started)  { mostrarInstrucciones(); return; }
  if (!audioListo || !fft || !amplitude) { mostrarCargando(); return; }

  umbralVolumen = ctrlVol.slider.value();
  umbralGraves  = ctrlGraves.slider.value();
  umbralMedios  = ctrlMedios.slider.value();
  umbralSiseo   = ctrlSiseo.slider.value();

  fft.analyze();
  energiaGraves = fft.getEnergy(20, 300);     
  energiaMedios = fft.getEnergy(350, 3000);   
  energiaSiseo  = fft.getEnergy(4000, 10000); 
  volumen = amplitude.getLevel();
  let delta = volumen - nivelAnterior;        

  if (cooldownAplauso > 0) cooldownAplauso -= deltaTime;

  if (energiaSiseo > umbralSiseo && volumen > umbralVolumen) {
    siseoContador++;
  } else {
    siseoContador = max(0, siseoContador - 2);
  }
  let borrando = siseoContador > SISEO_FRAMES_MIN;

  let hayVoz   = energiaMedios > umbralMedios;
  let hayGrave = energiaGraves > umbralGraves;

  let esAplauso = delta > SPIKE_APLAUSO &&
                  volumen > max(umbralVolumen, NIVEL_APLAUSO_MIN) &&
                  energiaSiseo > TREBLE_APLAUSO_MIN &&
                  !borrando && cooldownAplauso <= 0;

  if (esAplauso) {
    for (const f of formas) f.invertir();     
    cooldownAplauso = COOLDOWN_APLAUSO;
  } else if (borrando) {
    borrarLIFO(VEL_BORRADO);                  
  } else if (volumen > umbralVolumen) {
    if (hayVoz) {
      let c = map(energiaMedios - umbralMedios, 0, 255 - umbralMedios, 0.5, VEL_PINTADO, true);
      pintarEnOrden(manchas, c);
    } else if (hayGrave) {
      if (!graveSonabaAntes && lineaActiva < lineas.length - 1) lineaActiva++;
      if (lineaActiva < 0) lineaActiva = 0;
      let fuerza01 = map(energiaGraves, umbralGraves, 255, 0.2, 1, true); 
      lineas[lineaActiva].crecer(VEL_ALFA_LINEA, VEL_LARGO_LINEA, fuerza01);
    }
  }

  graveSonabaAntes = hayGrave && !hayVoz;

  blendMode(MULTIPLY);
  for (const f of formas) f.dibujar(); 
  blendMode(BLEND);

  nivelAnterior = volumen;
  actualizarPanel(borrando);
}

function pintarEnOrden(grupo, cantidad) {
  for (const f of grupo) {
    if (f.opacidad < f.opacidadMaxPropia) {
      f.pintar(cantidad);
      return;
    }
  }
}

function borrarLIFO(cantidad) {
  for (let i = formas.length - 1; i >= 0; i--) {
    if (formas[i].opacidad > 0) {
      formas[i].borrar(cantidad);
      return;
    }
  }
}

function crearComposicion() {
  const W = CANVAS_WIDTH, H = CANVAS_HEIGHT;

  // MANCHAS
  let m1 = new Medialuna(W * 0.45, H * 0.42, W * 0.65, manchaImg,   0.05); 
  let m2 = new Medialuna(W * 0.52, H * 0.28, W * 0.80, manchaImg2, -0.04); 
  manchas = [m1, m2];

  // LÍNEAS: L1 inflada a 120 de grosor.
  lineas = [
    new RayaDiagonal(W * 0.60, H * 0.57, 57, 120, H * 0.28, lineaImg1, 200), // L1: ¡Bien gorda! (120)
    new RayaDiagonal(W * 0.60, H * 0.65, 57, 65,  H * 0.18, lineaImg2, 255), // L2: Normal
    new RayaDiagonal(W * 0.64, H * 0.73, 57, 95,  H * 0.28, lineaImg3, 130)  // L3: Gruesa, pero menos que L1
  ];

  formas = [...manchas, ...lineas];
}

// ---------- Interfaz HTML (p5.dom) ----------
function crearInterfaz() {
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

  ctrlVol    = crearControl('Volumen general',        0, 0.2, 0.02, 0.005, 3);
  ctrlGraves = crearControl('Graves · líneas',        0, 255, 85,   1,     0);
  ctrlMedios = crearControl('Medios · manchas (voz)', 0, 255, 90,   1,     0);
  ctrlSiseo  = crearControl('Siseo · borrado',        0, 255, 115,  1,     0);

  createDiv('SEÑAL EN VIVO').parent(panel)
    .style('font-size', '11px').style('letter-spacing', '1.5px')
    .style('color', '#9aa3ba').style('margin', '22px 0 8px');
  lecturasDOM = createDiv().parent(panel)
    .style('font-size', '11px').style('line-height', '1.8').style('color', '#c3c9da');
}

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

function mostrarInstrucciones() {
  push();
  textAlign(CENTER, CENTER);
  fill(50, 55, 70);
  textSize(24);
  textStyle(BOLD);
  text('Pintá la obra con el micrófono', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.20);

  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  textSize(15);
  fill(70, 78, 95);
  let x = CANVAS_WIDTH * 0.10;
  let y = CANVAS_HEIGHT * 0.40;
  let paso = 46;
  
  // INSTRUCCIONES ACTUALIZADAS
  text('Decí "iiiiii" de forma sostenida para dibujar las líneas.', x, y);
  text('Voz media / abierta ("aaah") para pintar las manchas.', x, y + paso);
  text("Un aplauso para invertir las opacidades.", x, y + paso * 2);
  text("Un siseo continuo ('ssss') para ir borrando el cuadro.", x, y + paso * 3);

  textAlign(CENTER, CENTER);
  fill(50, 55, 70);
  textSize(18);
  text('Hacé click para comenzar', CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.80);
  pop();
}
function mostrarCargando() {
  push();
  textAlign(CENTER, CENTER);
  fill(60);
  textSize(18);
  text('Iniciando micrófono…', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 12);
  textSize(12);
  text('(permití el acceso al micrófono)', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 18);
  pop();
}