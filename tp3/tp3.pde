//https://www.youtube.com/watch?v=zaGkf4TFU0A
PImage opart;

int cant = 10;
int tam;
boolean usarColorOriginal = true;  // TRUE = colores originales, FALSE = alternativos

// instrucciones
void mostrarMensaje(String mensaje) {
  println(mensaje);
}

// opacidad
float calcularTono(float x, float y) {
  float distancia = dist(x, y, 400, 45);
  float tono = distancia * 255 / dist(width, height, 0, 0);
  return tono;
}

void setup() {
  size(800, 400);
  mostrarMensaje("Presioná R para cambiar entre colores originales y alternativos.");
  opart = loadImage("carlos-cruz-diez-physichromie-1920-1.jpg");
}

void draw() {
  background(#B7A843);

  tam = width / cant;
  image(opart, 0, 0, 400, 400);  // original a la izquierda

  float tono = calcularTono(mouseX, mouseY);

  // Líneas de división
  strokeWeight(1.8);
  stroke(0);
  line(546, 45, 546, 360);
  line(658, 45, 658, 360);

  // LÍNEAS DE FONDO A COLOR DESDE LA IMAGEN
  int xMin = width / 2;
  int xMax = width;
  int paso = 3;
  strokeWeight(1);
  for (int x = xMin; x < xMax; x += paso) {
    int imgX = int(map(x, xMin, xMax, 0, opart.width));
    int imgY = opart.height / 2;
    color c = opart.get(imgX, imgY);
    stroke(c);
    line(x, 0, x, height);
  }


  if (mousePressed) {
    fill(#1482BE, tono);
  } else {
    fill(0, tono);
  }
  noStroke();
  rect(435, 45, 335, 315);

  // ACTIVAR MODO DE MEZCLA PARA LÍNEAS DEL CUADRADO
  blendMode(LIGHTEST);

  int xInicio = 435;
  int anchoZona = 111;
  int alto = 315;
  int yInicio = 45;

  for (int i = 0; i < 3; i++) {
    for (int x = 0; x < anchoZona; x++) {
      float offset = sin((x + frameCount) * 0.1) * map(mouseY, 0, height, -3, 3);
      float xPos = xInicio + i * anchoZona + x + offset;

      // colores superiores e inferiores según franja y modo   <<< cambio
      color cTop, cBot;
      if (usarColorOriginal) {
        if (i == 0) {
          cTop = color(227, 28, 42);
          cBot = color(255, 215, 0);
        } else if (i == 1) {
          cTop = color(255, 215, 0);
          cBot = color(0, 80, 155);
        } else {
          cTop = color(0, 80, 155);
          cBot = color(227, 28, 42);
        }
      } else {
        if (i == 0) {
          cTop = color(0, 255, 0);
          cBot = color(0, 0, 255);
        } else if (i == 1) {
          cTop = color(0, 0, 255);
          cBot = color(128, 0, 128);
        } else {
          cTop = color(128, 0, 128);
          cBot = color(0, 255, 0);
        }
      }

      // dibujar línea con gradiente vertical punto por punto   <<< cambio
        for (int y = 0; y < alto; y++) {
        float t = y / float(alto);
        color c = lerpColor(cTop, cBot, t);
        stroke(c);
        point(xPos, yInicio + y);
      }
    }
  }


  // VOLVER AL MODO NORMAL
  blendMode(BLEND);

  // MARCO BLANCO
  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(400, 5, 400, -100);
  rect(400, 392, 395, 20);
  rect(400, -7, 1, 400);
  rect(795, -7, 100, 400);
}

// CAMBIAR MODO CON LA TECLA R
void keyPressed() {
  if (key == 'r' || key == 'R') {
    usarColorOriginal = !usarColorOriginal;
    println("Modo: " + (usarColorOriginal ? "Colores alternativos" : "Colores originales"));
  }
}
