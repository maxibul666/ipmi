// ============================================================================
//  Línea (raya diagonal)
//  Imagen PNG tintada con el MISMO índigo. El ancla (x, y) es el extremo
//  SUPERIOR de la raya (arriba-derecha). Con un ángulo POSITIVO el trazo cae
//  hacia ABAJO-IZQUIERDA, dando una diagonal "/" (parte baja a la izquierda,
//  parte alta a la derecha).
//
//  A diferencia de la mancha, la línea NO tiene tamaño fijo: su alfa (opacidad)
//  funciona como un único "driver" 0..MAX_OPACIDAD del que se derivan el largo
//  y el grosor. Más agudo (voz) -> más alfa -> la línea se dibuja más larga,
//  más gruesa y más oscura, todo junto. El aplauso invierte ese alfa y el siseo
//  lo baja, así que la línea se achica/aclara al borrar.
// ============================================================================
class RayaDiagonal {
  constructor(x, y, anguloGrados, grosorMax, largoMax, img) {
    this.x = x;                          // ancla = extremo SUPERIOR (arriba-derecha)
    this.y = y;
    this.angulo = radians(anguloGrados); // POSITIVO => cae hacia abajo-izquierda ("/")
    this.grosorMax = grosorMax;
    this.largoMax = largoMax;
    this.grosorMin = grosorMax * 0.45;   // tamaño de la línea recién iniciada
    this.largoMin = largoMax * 0.30;
    this.img = img;
    this.opacidad = 0;                   // driver único: 0 .. MAX_OPACIDAD
  }

  // Suma opacidad (pintar). Como el tamaño se deriva del alfa, esto también
  // hace crecer la línea. Se limita al máximo.
  pintar(cantidad) {
    this.opacidad = constrain(this.opacidad + cantidad, 0, MAX_OPACIDAD);
  }

  // Resta opacidad (borrar). La línea se achica y se aclara al mismo tiempo.
  borrar(cantidad) {
    this.opacidad = constrain(this.opacidad - cantidad, 0, MAX_OPACIDAD);
  }

  // Invierte: lo opaco/grande se vuelve transparente/chico y viceversa.
  invertir() {
    this.opacidad = MAX_OPACIDAD - this.opacidad;
  }

  dibujar() {
    if (this.opacidad <= 1) return; // nada que pintar todavía
    // Progreso 0..1 derivado del alfa: gobierna largo, grosor y (vía tint) oscuridad.
    let t = this.opacidad / MAX_OPACIDAD;
    let grosor = lerp(this.grosorMin, this.grosorMax, t);
    let largo  = lerp(this.largoMin,  this.largoMax,  t);
    push();
    imageMode(CORNER);
    translate(this.x, this.y);
    rotate(this.angulo);            // +ángulo: el cuerpo se extiende hacia abajo-izquierda
    tint(AZUL[0], AZUL[1], AZUL[2], this.opacidad);
    // Se dibuja desde el ancla (tope) hacia +Y local, centrada en el grosor.
    image(this.img, -grosor / 2, 0, grosor, largo);
    pop();
  }
}
