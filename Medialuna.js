class Medialuna {
  constructor(x, y, tamano, img, inclinacion) {
    this.x = x;
    this.y = y;
    this.tamano = tamano;
    this.img = img;
    this.inclinacion = inclinacion; 
    this.opacidadMaxPropia = 255;   // Tope para las lunas
    this.opacidad = 0;              
  }

  pintar(cantidad) {
    this.opacidad = constrain(this.opacidad + cantidad, 0, this.opacidadMaxPropia);
  }

  borrar(cantidad) {
    this.opacidad = constrain(this.opacidad - cantidad, 0, this.opacidadMaxPropia);
  }

  invertir() {
    this.opacidad = this.opacidadMaxPropia - this.opacidad;
  }

  dibujar() {
    if (this.opacidad <= 1) return; 
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.inclinacion);
    tint(255, this.opacidad);
    image(this.img, 0, 0, this.tamano, this.tamano);
    pop();
  }
}