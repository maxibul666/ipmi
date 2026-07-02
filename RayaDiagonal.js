class RayaDiagonal {
  constructor(x, y, anguloGrados, grosorMax, largoMax, img, opMax = 255) {
    this.x = x;                          
    this.y = y;
    this.angulo = radians(anguloGrados); 
    this.grosorMax = grosorMax;
    this.largoMax = largoMax;
    this.grosorMin = grosorMax * 0.55;   
    this.largoMin  = largoMax * 0.28;    
    this.img = img;
    this.opacidadMaxPropia = opMax;      // NUEVO: Limita qué tan oscura puede ser
    this.opacidad = 0;                   
    this.largo  = this.largoMin;         
    this.grosor = this.grosorMin;
  }

  crecer(cAlfa, cLargo, fuerza01) {
    this.opacidad = constrain(this.opacidad + cAlfa, 0, this.opacidadMaxPropia);
    this.largo = min(this.largo + cLargo, this.largoMax);
    let objetivo = lerp(this.grosorMin, this.grosorMax, constrain(fuerza01, 0, 1));
    this.grosor = max(this.grosor, objetivo); 
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
    imageMode(CORNER);
    translate(this.x, this.y);
    rotate(this.angulo);            
    tint(255, this.opacidad);       
    image(this.img, -this.grosor / 2, 0, this.grosor, this.largo);
    pop();
  }
}