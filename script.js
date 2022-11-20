/*

  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
  
*/
var x;
var $cards = $(".card");
var $style = $(".hover");

$cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      pos = [ e.touches[0].clientX, e.touches[0].clientY ];
    }
    var $card = $(this);
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();

    var px = Math.abs(Math.floor(100 / w * l)-100);
    var py = Math.abs(Math.floor(100 / h * t)-100);
    var pa = (50-px)+(50-py);
  
    // math for gradient / background positions
    var lp = (50+(px - 50)/1.5);
    var tp = (50+(py - 50)/1.5);
    var px_spark = (50+(px - 50)/-1.1);
    var py_spark = (50+(py - 50)/-2);
    var p_opc = 20+(Math.abs(pa)*1.5);
    var ty = ((tp - 50)/2) * -1;
    var tx = ((lp - 50)/1.5) * .5;

    //black hole
    var top = (parseFloat($(".black-hole").css("top"))/h)*100;
    var left = (10/w)*100;

    var bgX_pos = 10 + (((lp - 50)/1.5) * 0.6);
    var bgY_pos = 48.6 - (((tp - 50)/2) * -0.32);
  
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var axis_pos = `transform-origin: ${bgX_pos}% ${bgY_pos}%;`
    var baxis_pos = `top:${bgY_pos}%; left:${bgX_pos}%;`

    //var opc = `opacity: ${p_opc/100};`
    var tf = `transform: rotateX(${ty*-1}deg) rotateY(${tx*-1}deg)`
    // need to use a <style> tag for psuedo elements
    //${opc}
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} }   /* sparkles */ 
      .card:hover .background { ${sprk_pos} }   /* positions mask */
      .black-hole, .dot { ${baxis_pos} }
    `
    // set / apply css class and style

    var xPos = $(".background").css("background-position");

    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function() {
      //$card.addClass("animated");
    },2500);
  });