// ============================================================================
//  Mancha (medialuna)
//  Imagen PNG tintada SIEMPRE con el mismo color índigo (AZUL, definida en el
//  sketch). Su posición y tamaño son FIJOS; lo único que cambia es la OPACIDAD
//  (canal alfa): sube al detectar graves, se invierte con un aplauso y baja al
//  sisear. No hay animación de movimiento: es una acuarela estática por capas.
// ============================================================================
class Medialuna {
  constructor(x, y, tamano, img, inclinacion) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.img = img;
    this.inclinacion = inclinacion; // radianes (leve y fija)
    this.opacidad = 0;              // alfa acumulado: 0 .. MAX_OPACIDAD
  }

  // Suma opacidad (pintar). Se limita al máximo.
  pintar(cantidad) {
    this.opacidad = constrain(this.opacidad + cantidad, 0, MAX_OPACIDAD);
  }

  // Resta opacidad (borrar).
  borrar(cantidad) {
    this.opacidad = constrain(this.opacidad - cantidad, 0, MAX_OPACIDAD);
  }

  // Invierte: lo opaco se vuelve transparente y viceversa.
  invertir() {
    this.opacidad = MAX_OPACIDAD - this.opacidad;
  }

  dibujar() {
    if (this.opacidad <= 1) return; // nada que pintar todavía
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.inclinacion);
    // Color ÚNICO índigo; la ÚNICA variable visual es el alfa (this.opacidad).
    tint(AZUL[0], AZUL[1], AZUL[2], this.opacidad);
    image(this.img, 0, 0, this.tamano, this.tamano);
    pop();
  }
}
