//https://www.youtube.com/watch?v=P7__9zp5jQ0

PImage opart;

int cant = 10;
int tam;

void mostrarMensaje(String mensaje) {
  println(mensaje);
}


float calcularTono(float x, float y) {
  float distancia = dist(x, y, 400, 45);
  float tono = distancia * 255 / dist(width, height, 0, 0);
  return tono;
}

void setup() {
  size(800, 400);

  mostrarMensaje("Al hacer click, el cuadrado cambia de color. Arrastrar el mouse mueve las líneas. Mover el mouse cambia la tonalidad del color.");

  opart = loadImage("carlos-cruz-diez-physichromie-1920-1.jpg");
}

void draw() {
  background(#B7A843);

  tam = width / cant;
  image(opart, 0, 0, 400, 400);


  float tono = calcularTono(mouseX, mouseY);

  if (mousePressed) {
    fill(255, 0, 0);
  } else {
    fill(0, 255, 0, tono);
  }

  rect(435, 45, 335, 315);

  strokeWeight(1.8);
  line(546, 45, 546, 360);
  line(658, 45, 658, 360);

  stroke(0);
  strokeWeight(1);
  for (int x = width / 2; x < width; x += 3) {
    line(x, 0, x, 400);
  }
}

void mouseDragged() {
  for (int l = width / 2; l < width; l += 6) {
    line(pmouseX, 45, pmouseX, 360);
    line(658, pmouseY, 658, 360);
    
  }
}

void keyPressed() {
  frameCount = 0;
}
