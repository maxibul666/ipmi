//variables
int miVariable = 1000;
float texto = 1000;
float texto2 = 1000;
int texto3 = 1000;
PImage logo;
PImage ichigomanga;
PFont mi_fuente;
PImage ichigofondo;
int tamtexto =1000;
PImage rukiaichigo;
int tamtexto2 = 1000;
int tamtexto3 = 40;
PFont textoboton;
void setup() {
  size(640, 480);
  logo= loadImage("bleachlogo.jpg");
  ichigomanga = loadImage("bleach-manga-ii-wallpaper-preview.jpg");
  ichigofondo = loadImage("wp8964562.png");
  mi_fuente = loadFont("Verdana-BoldItalic-20.vlw");
  rukiaichigo = loadImage("rukiaichigo.jpeg");
  textoboton = loadFont("Verdana-BoldItalic-48.vlw");
}


void draw() {

  //pantalla 1
  background(255);
 

  image(logo, -30, -100, miVariable, miVariable);

  miVariable = frameCount *3;

  if (frameCount > 250) {
    miVariable =0;
  }
  //pantalla 2



  if (frameCount > 250) {

    image(ichigomanga, 0, 0, 640, 480);
  }




  if (frameCount > 250) {
    texto = frameCount /2;

    fill(0);
    textFont(mi_fuente);
    text("Bleach es un anime producido \n por studio Pierrot \n basado en el manga Bleach \n escrito e ilustrado por Tite kubo.", 0, texto);
  }
  //pantalla 3
  if (frameCount > 620) {
    texto2 = frameCount/3;
  }
  if (frameCount > 620) {

    image(ichigofondo, 0, 0, 640, 480);
  }
  fill(255);
  texto = frameCount/4;
  texto2 = frameCount /3;
  if (frameCount > 620) {

    textSize(20);
    text("Ichigo Kurosaki es \n un estudiante \n de secundario de 15 años. \n Es capaz de ver, escuchar \n y hablar con fantasmas.", texto, texto2);
  }


  //pantalla 4
  if (frameCount > 850) {
    image(rukiaichigo, 0, 0, 640, 480);
  }



  if (frameCount > 850) {

    text("Ichigo se convirtio en \n segador de almas \n después de que Rukia Kuchiki \n le traspase parte de sus poderes.", tamtexto3, texto3);

    texto3 = frameCount/4;
    tamtexto3 = frameCount/20;
    textSize(tamtexto3);
  }

  //boton

  if (frameCount > 1000) {
    if (mousePressed && mouseX > width - 120 && mouseX < width - 20 &&
      mouseY > height - 60 && mouseY < height - 20)
      frameCount = 0;
  }




  //dibujo boton
  if (frameCount > 1000) {
    textFont(textoboton);
    fill(255, 0, 0);
    rect(width-120, height-60, 100, 40, 10);
    fill(255);
    textSize(17);
    text("Reiniciar", width-110, height-35);
  }
}
