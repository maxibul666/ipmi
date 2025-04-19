PImage miImagen;

void setup(){
  size(800,400);
  miImagen = loadImage("imagentp.jpg");
}

void draw(){
  background(#D3D3ED);
  
  
  
 
  
  
  
image(miImagen, 0, 0,400, 400);




//fondo
fill(#D3D3ED);




line(400, 130, 530, 130);
line(654, 130, 800, 130);
line(423, 367, 464, 400);

//agua

line(423, 153, 430, 153);
line(420, 180, 445, 180);
line(412, 233, 452, 233);

line(410, 388, 430, 388);


line(723, 153, 730, 153);
line(720, 180, 745, 180);
line(712, 233, 752, 233);










 








//roca
stroke(0);
fill(#967062);
stroke(0);





stroke(#967062);
//borde roca
stroke(0);
beginShape();
curveVertex(460, 214); // Punto inicial (no forma parte de la curva visible)
curveVertex(460, 241); // Primer punto visible
curveVertex(538, 241); // Segundo punto visible
curveVertex(577, 253); // Tercer punto visible
curveVertex(769, 306); // Cuarto punto visible
curveVertex(769, 306); // Punto final (no forma parte de la curva visible)
endShape();



stroke(0);
beginShape();
curveVertex(460, 214); // Punto inicial (no forma parte de la curva visible)
curveVertex(460, 241); // Primer punto visible
curveVertex(405, 266 ); // Segundo punto visible
curveVertex(405, 347 ); // Tercer punto visible
curveVertex(420, 365 ); // Cuarto punto visible
curveVertex(420,365 ); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(420, 365); // Punto inicial (no forma parte de la curva visible)
curveVertex(420, 365); // Primer punto visible
curveVertex(445, 373); // Segundo punto visible
curveVertex(453, 388); // Tercer punto visible
curveVertex(465, 400); // Cuarto punto visible
curveVertex(465, 400); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(465, 400); // Punto inicial (no forma parte de la curva visible)
curveVertex(465, 400); // Primer punto visible
curveVertex(800, 400); // Segundo punto visible
curveVertex(785, 320); // Tercer punto visible
curveVertex(769, 306); // Cuarto punto visible
curveVertex(769, 306); // Punto final (no forma parte de la curva visible)
endShape();

noStroke();
triangle(769, 306, 459, 241, 470, 400);
triangle(459, 241, 470, 400, 421, 364);
fill(#C8C7DE);
triangle(546, 242, 546, 257, 575, 253);



noStroke();





noStroke();
stroke(#967062);

line(460, 240, 769, 306);

stroke(0);
noFill();

//sombras sirena

fill(#C8C7DE);

//sirena









line(559, 189, 562, 174);
line(562, 174, 553, 139);
line(553, 139, 538, 159);
line(538, 159, 531, 170);
line(531, 170, 524, 189);
line(524, 189, 522, 197);
line(522, 197, 516, 203);
line(516, 203, 506, 224);
line(506, 224, 464, 228);
line(464, 228, 455, 232);
line(455, 232, 463, 231);
line(455, 232, 463, 233);
line(463, 233, 457, 240);
line(465, 226, 493, 226);
line(495, 222, 499, 211);
line(499, 211, 505, 179);
line(505, 179, 528, 136);
line(528, 136, 539, 111);
beginShape();
curve(567, 104, 550, 102, 539, 110,  536, 115);

endShape();
stroke(0);
//hombro iz
beginShape();
curveVertex(543, 104); // Punto inicial (no forma parte de la curva visible)
curveVertex(543, 104); // Primer punto visible
curveVertex(546, 103); // Segundo punto visible
curveVertex(555, 101); // Tercer punto visible
curveVertex(566, 100); // Cuarto punto visible
curveVertex(567, 103); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();

//hombro derecho
line(609, 99, 627, 103);
line(627, 103, 637, 108);
beginShape();
curveVertex(637,108 ); // Punto inicial (no forma parte de la curva visible)
curveVertex(637,108 ); // Primer punto visible
curveVertex(644,109 ); // Segundo punto visible
curveVertex(651,112); // Tercer punto visible
curveVertex(655,120 ); // Cuarto punto visible
curveVertex(655,130); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();

//cuello
curveVertex(576, 104); // Punto inicial (no forma parte de la curva visible)
curveVertex(576,105 ); // Primer punto visible
curveVertex(585, 109 ); // Segundo punto visible
curveVertex(603, 108 ); // Tercer punto visible
curveVertex(611, 106 ); // Cuarto punto visible
curveVertex(611, 105 ); // Punto final (no forma parte de la curva visible)
endShape();

line(576, 105, 578, 95);//cuello iz
line(611, 105, 604, 86);//cuello derecho
//cabeza

line(578, 95, 567, 98);
line(567, 98, 556, 83);
line(556, 83, 555, 79);
line(555, 79, 551, 74);
line(565, 101, 577, 98);
line(551, 73, 549, 57);
line(549, 57, 555, 50);
line(555, 50, 572, 42);

line(608, 52, 611, 59);

beginShape();
curveVertex(571, 42); // Punto inicial (no forma parte de la curva visible)
curveVertex(572, 43); // Primer punto visible
curveVertex(582, 39); // Segundo punto visible
curveVertex(596,42); // Tercer punto visible
curveVertex(608, 51); // Cuarto punto visible
curveVertex(611,63); // Punto final (no forma parte de la curva visible)
endShape();
  

//nariz
line(556, 85, 556, 75);
line(556, 85, 562, 84);

//ojos

ellipse(552, 74, 2, 3);
ellipse(564, 73, 5, 5);
ellipse(563, 73, 2, 2);

//boca
line(562, 91, 568,91);

//pechos
//iz

beginShape();
curveVertex(555,139); // Punto inicial (no forma parte de la curva visible)
curveVertex(555,139); // Primer punto visible
curveVertex(556,150); // Segundo punto visible
curveVertex(561,152); // Tercer punto visible
curveVertex(568,152); // Cuarto punto visible
curveVertex(568,152); // Punto final (no forma parte de la curva visible)
endShape();

ellipse(557, 147, 2, 2);
//derecho
beginShape();
curveVertex(625,140); // Punto inicial (no forma parte de la curva visible)
curveVertex(625,140); // Primer punto visible
curveVertex(626,153); // Segundo punto visible
curveVertex(620,159); // Tercer punto visible
curveVertex(607,155); // Cuarto punto visible
curveVertex(607,155); // Punto final (no forma parte de la curva visible)
endShape();
ellipse(622, 151, 2, 2);

//ombligo
curve(565, 171, 590, 171, 601, 173, 603, 173);









//pelo

beginShape();
curveVertex(589, 54); // Punto inicial (no forma parte de la curva visible)
curveVertex(590, 54); // Primer punto visible
curveVertex(608, 58); // Segundo punto visible
curveVertex(615, 70); // Tercer punto visible
curveVertex(608, 84); // Cuarto punto visible
curveVertex(609, 85); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(604,83); // Punto inicial (no forma parte de la curva visible)
curveVertex(605, 83); // Primer punto visible
curveVertex(613,85); // Segundo punto visible
curveVertex(615,93); // Tercer punto visible
curveVertex(622,100); // Cuarto punto visible
curveVertex(627,101); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(594,83); // Punto inicial (no forma parte de la curva visible)
curveVertex(595, 83); // Primer punto visible
curveVertex(603,85); // Segundo punto visible
curveVertex(605,93); // Tercer punto visible
curveVertex(612,100); // Cuarto punto visible
curveVertex(617,101); // Punto final (no forma parte de la curva visible)
endShape();


line(559, 189, 559, 194 );

//mechones de pelo

beginShape();
curveVertex(556, 57); // Punto inicial (no forma parte de la curva visible)
curveVertex(556, 57); // Primer punto visible
curveVertex(559, 50); // Segundo punto visible
curveVertex(573, 43); // Tercer punto visible
curveVertex(591, 40); // Cuarto punto visible
curveVertex(591,40); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(552, 60); // Punto inicial (no forma parte de la curva visible)
curveVertex(552,60); // Primer punto visible
curveVertex(561, 60); // Segundo punto visible
curveVertex(578, 67); // Tercer punto visible
curveVertex(602,85 ); // Cuarto punto visible
curveVertex(602, 85); // Punto final (no forma parte de la curva visible)
endShape();
triangle(552, 60, 567, 64, 550, 67);

beginShape();
curveVertex(589, 65); // Punto inicial (no forma parte de la curva visible)
curveVertex(589, 65); // Primer punto visible
curveVertex(609, 64); // Segundo punto visible
curveVertex(615, 76); // Tercer punto visible
curveVertex(614, 84); // Cuarto punto visible
curveVertex(614, 84); // Punto final (no forma parte de la curva visible)
endShape();




//brazo derecho
line(655,120, 655, 132);
line( 655, 132, 652, 145);
line(652, 145, 647, 167);
line(647, 167, 644, 176);

//brazo izquierdo
beginShape();
curveVertex(625, 150); // Punto inicial (no forma parte de la curva visible)
curveVertex(625, 150 ); // Primer punto visible
curveVertex(626,160); // Tercer punto visible
curveVertex(623,170); // Cuarto punto visible
curveVertex(623,170); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(623,170); // Punto inicial (no forma parte de la curva visible)
curveVertex(623,170); // Primer punto visible
curveVertex(620, 177); // Segundo punto visible
curveVertex(595, 184 ); // Tercer punto visible
curveVertex(564, 194); // Cuarto punto visible
curveVertex(564, 194); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(564, 194); // Punto inicial (no forma parte de la curva visible)
curveVertex(564, 194); // Primer punto visible
curveVertex(550, 196); // Segundo punto visible
curveVertex(534, 201 ); // Tercer punto visible
curveVertex(526, 207); // Cuarto punto visible
curveVertex(526, 207); // Punto final (no forma parte de la curva visible)
endShape();


beginShape();
curveVertex(643,178); // Punto inicial (no forma parte de la curva visible)
curveVertex(643,178 ); // Primer punto visible
curveVertex(640,189); // Segundo punto visible
curveVertex(627,199); // Tercer punto visible
curveVertex(604,203); // Cuarto punto visible
curveVertex(604,203); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(604,203); // Punto inicial (no forma parte de la curva visible)
curveVertex(604,203 ); // Primer punto visible
curveVertex(594,203); // Segundo punto visible
curveVertex(570,204); // Tercer punto visible
curveVertex(538,215); // Cuarto punto visible
curveVertex(538,215); // Punto final (no forma parte de la curva visible)
endShape();
//mano
beginShape();
curveVertex(526,206); // Punto inicial (no forma parte de la curva visible)
curveVertex(526,206 ); // Primer punto visible
curveVertex(523,211); // Segundo punto visible
curveVertex(523,219); // Tercer punto visible
curveVertex(523,223); // Cuarto punto visible
curveVertex(523,223); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(523,223); // Punto inicial (no forma parte de la curva visible)
curveVertex(523,223 ); // Primer punto visible
curveVertex(514,226); // Segundo punto visible
curveVertex(498,229); // Tercer punto visible
curveVertex(482,231); // Cuarto punto visible
curveVertex(482,231); // Punto final (no forma parte de la curva visible)
endShape();

line(527, 208, 535, 206);
line(527, 212, 535, 210);

line(529, 211, 540, 208);
line(529, 215, 540, 212);

line(462, 232, 482, 230);

beginShape();
curveVertex(495, 221); // Punto inicial (no forma parte de la curva visible)
curveVertex(495, 221); // Primer punto visible
curveVertex(479, 222); // Segundo punto visible
curveVertex(463, 224); // Tercer punto visible
curveVertex(452, 239); // Cuarto punto visible
curveVertex(452, 239); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(535, 230); // Punto inicial (no forma parte de la curva visible)
curveVertex(535, 230); // Primer punto visible
curveVertex(537, 238); // Segundo punto visible
curveVertex(521,240); // Tercer punto visible
curveVertex(461, 242); // Cuarto punto visible
curveVertex(461, 242); // Punto final (no forma parte de la curva visible)
endShape();

line(461, 242, 453, 238);

//line(



 
//pierna derecha
stroke(0);
beginShape();
curveVertex(643, 174); // Punto inicial (no forma parte de la curva visible)
curveVertex(643, 177); // Primer punto visible
curveVertex(655, 192); // Segundo punto visible
curveVertex(658, 209); // Tercer punto visible
curveVertex(648, 231); // Cuarto punto visible
curveVertex(648, 232); // Punto final (no forma parte de la curva visible)
endShape();

line(648, 232, 654, 235);
beginShape();
curveVertex(654,235 ); // Punto inicial (no forma parte de la curva visible)
curveVertex(654,235 ); // Primer punto visible
curveVertex(658,235 ); // Segundo punto visible
curveVertex(673, 239 ); // Tercer punto visible
curveVertex(690,246); // Cuarto punto visible
curveVertex(690,246); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(670,245 ); // Punto inicial (no forma parte de la curva visible)
curveVertex(670, 245); // Primer punto visible
curveVertex(692,247); // Segundo punto visible
curveVertex(717,255); // Tercer punto visible
curveVertex(730,274); // Cuarto punto visible
curveVertex(730,274); // Punto final (no forma parte de la curva visible)
endShape();


beginShape();
curveVertex(730,274); // Punto inicial (no forma parte de la curva visible)
curveVertex(730,274 ); // Primer punto visible
curveVertex(749,285); // Segundo punto visible
curveVertex(764,295); // Tercer punto visible
curveVertex(768,306); // Cuarto punto visible
curveVertex(768,306); // Punto final (no forma parte de la curva visible)
endShape();


beginShape();
curveVertex(656,271); // Punto inicial (no forma parte de la curva visible)
curveVertex(656,271 ); // Primer punto visible
curveVertex(679,276); // Segundo punto visible
curveVertex(707,287); // Tercer punto visible
curveVertex(724,291); // Cuarto punto visible
curveVertex(724,291); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(625, 198); // Punto inicial (no forma parte de la curva visible)
curveVertex(625, 198); // Primer punto visible
curveVertex(615, 202); // Segundo punto visible
curveVertex(602, 210); // Tercer punto visible
curveVertex(588, 223); // Cuarto punto visible
curveVertex(588, 223); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(588, 223); // Punto inicial (no forma parte de la curva visible)
curveVertex(588, 223 ); // Primer punto visible
curveVertex(581, 238); // Segundo punto visible
curveVertex(577, 251); // Tercer punto visible
curveVertex(586, 260); // Cuarto punto visible
curveVertex(586, 260); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(586, 260); // Punto inicial (no forma parte de la curva visible)
curveVertex(586, 260); // Primer punto visible
curveVertex(598, 262); // Segundo punto visible
curveVertex(622, 265); // Tercer punto visible
curveVertex(637, 263); // Cuarto punto visible
curveVertex(637, 263); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(637, 263); // Punto inicial (no forma parte de la curva visible)
curveVertex(637, 263); // Primer punto visible
curveVertex(661, 263); // Segundo punto visible
curveVertex(687, 266); // Tercer punto visible
curveVertex(701, 276); // Cuarto punto visible
curveVertex(733, 284); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(733, 284); // Punto inicial (no forma parte de la curva visible)
curveVertex(733, 284); // Primer punto visible
curveVertex(722, 276); // Segundo punto visible
curveVertex(741, 291); // Tercer punto visible
curveVertex(767, 306); // Cuarto punto visible
curveVertex(767, 306); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(655, 270); // Punto inicial (no forma parte de la curva visible)
curveVertex(649, 269); // Primer punto visible
curveVertex(626, 264); // Segundo punto visible
curveVertex(602, 262); // Tercer punto visible
curveVertex(588, 261); // Cuarto punto visible
curveVertex(588, 261); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(686, 278); // Punto inicial (no forma parte de la curva visible)
curveVertex(686, 278); // Primer punto visible
curveVertex(670, 275); // Segundo punto visible
curveVertex(653, 270); // Tercer punto visible
curveVertex(634, 268); // Cuarto punto visible
curveVertex(634, 268); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(766, 305);
curveVertex(766, 305);
curveVertex(746, 299);
curveVertex(725, 291);
curveVertex(710, 280);
curveVertex(687, 268);
endShape();

beginShape();
curveVertex(619, 235); // Punto inicial (no forma parte de la curva visible)
curveVertex(632, 235); // Primer punto visible
curveVertex(647, 235); // Segundo punto visible
curveVertex(661, 240); // Tercer punto visible
curveVertex(696, 255); // Cuarto punto visible
curveVertex(696, 255); // Punto final (no forma parte de la curva visible)
endShape();

//pierna izquierda
beginShape();
curveVertex(543, 213); // Punto inicial (no forma parte de la curva visible)
curveVertex(537, 229); // Primer punto visible
curveVertex(539, 245); // Segundo punto visible
curveVertex(546, 253); // Tercer punto visible
curveVertex(557, 258); // Cuarto punto visible
curveVertex(557, 258); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(545, 214); // Punto inicial (no forma parte de la curva visible)
curveVertex(545, 214); // Primer punto visible
curveVertex(539, 220); // Segundo punto visible
curveVertex(537, 224); // Tercer punto visible
curveVertex(536, 231); // Cuarto punto visible
curveVertex(536, 231); // Punto final (no forma parte de la curva visible)
endShape();

beginShape();
curveVertex(556,257 ); // Punto inicial (no forma parte de la curva visible)
curveVertex(556,257 ); // Primer punto visible
curveVertex(566, 258); // Segundo punto visible
curveVertex(575, 257); // Tercer punto visible
curveVertex(577, 253); // Cuarto punto visible
curveVertex(577, 253); // Punto final (no forma parte de la curva visible)
endShape();

}
