var frames = 0

var iter 
var colors
var vx
var vy
var zoom
var px
var colorss
var py
var lo = false

function test(x, y){
  
  let a = x;
  let b = y;
  let n = 0;
  while (n < iter) {
    const aa = a * a;
    const bb = b * b;
    const twoab = 2.0 * a * b;
    a = aa - bb + x;
    b = twoab + y;
        
    if (a*a + b*b > 4) {
        return n;  // Bail
    }
    n++;
  }
  
  return -1;
  
}

function down() {
  saveCanvas(c, 'Canvas', 'png');
}

function l() {
  
  lo = false
  
  
  iter = parseFloat(f_iter.value())
  px = parseInt(f_px.value())
  py = parseInt(f_px.value())
  vx = parseFloat(f_vx.value())
  vy = parseFloat(f_vy.value())
  colors = parseInt(f_colors.value())
  zoom = 1 / eval(f_zoom.value())
  colorss = parseFloat(f_colorss.value()) * (colors/10)
  
  resizeCanvas(px, py)
  
  c.position(300, 5)
  
  background(0)
  stroke(255,0,0)
  colorMode(HSB,colors,255,255)
  
  frames = 0
  lo = true
}

function res(){
  for(let p1 = 0; p1 < px; p1++){ 
    for(p2 = 0; p2 < py; p2++){
      
       set(p1,p2, color(0,0,0))
    }
   }
}



function setup() {
  c = createCanvas(0, 0)
  f_iter = createInput("45000")
  f_iter.position(100, 5)
  s_iter = createSpan('Iterations: ');
  s_iter.position(5, 5)
  
  f_px = createInput("1000")
  f_px.position(100, 30)
  s_px = createSpan('Resulution: ');
  s_px.position(5, 30)
  
  f_vx = createInput("-0.705487583735286")
  f_vx.position(100, 55)
  s_vx = createSpan('Coord X: ');
  s_vx.position(5, 55)
  
  f_vy = createInput("-0.248418484681000")
  f_vy.position(100, 80)
  s_vy = createSpan('Coord Y: ');
  s_vy.position(5, 80)
  
  f_zoom = createInput("1E-13")
  f_zoom.position(100, 105)
  s_zoom = createSpan('Zoom: ');
  s_zoom.position(5, 105)
  
  f_colors = createInput("20000")
  f_colors.position(100, 130)
  s_colors = createSpan('Colors: ');
  s_colors.position(5, 130)
  
  f_colorss = createInput("7")
  f_colorss.position(100, 155)
  s_colorss = createSpan('Color adj 0-10: ');
  s_colorss.position(5, 155)
  
  dbutton = createButton('Start');
  dbutton.size(245,25)
  dbutton.position(5, 180);
  dbutton.mousePressed(l);
  
  dbutton = createButton('Download picture');
  dbutton.size(245,50)
  dbutton.position(5, 210);
  dbutton.mousePressed(down);
}

function draw() {
  if(frames < px){
    frames++
    for(var p2 = 0;p2 < py; p2++){ 
        
      let c = map(frames, 0, px, (-2.5 ) / zoom + vx, (2.5 ) / zoom + vx)
      let c2 = map(p2, 0, py, (-2.5 ) / zoom - vy, (2.5 ) / zoom - vy);
      var t = test(c, c2)

      if(t > -1){
        t = (t+colorss) % colors;
        set(frames,p2, color(t,255,255))
      }else{
        set(frames,p2, color(0,0,0))
      }

    }
  }
  updatePixels(); 
}