var r = document.querySelector(':root');
var nida = document.getElementById("nida");

nida.addEventListener('mousemove', moveEvt);
nida.addEventListener('touchmove', moveEvt, {passive: true});

nida.addEventListener('mouseout', leaveEvt);
nida.addEventListener('mouseleave', leaveEvt);
nida.addEventListener('touchend', leaveEvt, {passive: true});
nida.addEventListener('touchcancel', leaveEvt, {passive: true});

function moveEvt(e) {
  var pos = [e.offsetX,e.offsetY];
  e.preventDefault();
  if ( e.type === "touchmove" ) {
    var rect = e.target.getBoundingClientRect();
    pos = [ e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top ];
  }
  // math for mouse position
  var l = pos[0];
  var t = pos[1];
  var h = 700; //$card.height();
  var w = 500; //$card.width();

  var px = Math.abs(Math.floor(100 / w * l)-100);
  var py = Math.abs(Math.floor(100 / h * t)-100);
  var pa = (50-px)+(50-py);

  // math for gradient / background positions
  var lp = (50+(px - 50)/1.5);
  var tp = (50+(py - 50)/1.5);
  var px_spark = (50+(px - 50)/-1.1);
  var py_spark = (50+(py - 50)/-2);
  var ty = ((tp - 50)/2) * -1;
  var tx = ((lp - 50)/1.5) * .5;

  var x_track = (((lp - 50)/1.5) * 0.6);
  var y_track = (((tp - 50)/2) * -0.32)

  //black hole
  var bX = (((lp - 50)/1.5) * 0.6);
  var bY = (((tp - 50)/2) * -0.32);

  //flare 1
  var f1X_pos = 33.5 + x_track;
  var f1Y_pos = 36.5 - y_track;

  //border
  var border_X = (-tx*0.15) - 50; //-50 for 2d
  var border_Y = (ty*0.08) - 50;

  var brightness = 1.6 + (100 - py)/100;

  r.style.setProperty('--xPos', `${px_spark}%`);
  r.style.setProperty('--yPos', `${py_spark}%`);
  r.style.setProperty('--rx', `${ty*-1}deg`);
  r.style.setProperty('--ry', `${tx*-1}deg`);
  r.style.setProperty('--hairHue', `${pa+180}deg`);
  r.style.setProperty('--jwlBrightness', `${brightness}`);
  r.style.setProperty('--jwlHue', `${pa}deg`);
  r.style.setProperty('--cardHue', `${pa+240}deg`); //+270 aligns with glow
  //black hole
  r.style.setProperty('--bX', `${bX}%`);
  r.style.setProperty('--bY', `${bY*-1}%`);
   //nebula
   r.style.setProperty('--nLeft', `${bX}%`);
   r.style.setProperty('--nTop', `${bY}%`);
  //border
  r.style.setProperty('--bTx', `${border_X}%`);
  r.style.setProperty('--bTy', `${border_Y}%`);

  if ( e.type === "touchmove" ) {
    return false; 
  }
}

function leaveEvt(e) {
  r.style.setProperty('--rx', `0deg`);
  r.style.setProperty('--ry', `0deg`);
  r.style.setProperty('--jwlBrightness', `1.6`);
  r.style.setProperty('--cardHue', `0deg`);
  r.style.setProperty('--hairHue', `0deg`);
  r.style.setProperty('--bTx', `-50%`);
  r.style.setProperty('--bTy', `-50%`);
  r.style.setProperty('--bX', `0%`);
  r.style.setProperty('--bY', `0%`); 
  r.style.setProperty('--nLeft', `50%`);
   r.style.setProperty('--nTop', `11.5%`);
}