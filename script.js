/*

  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
  
*/
var x;
var $cards = $(".card");
var $style = $(".hover");
var $border = $(".border");

$cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      var rect = e.target.getBoundingClientRect();
      pos = [ e.targetTouches[0].pageX - rect.left, e.targetTouches[0].pageY - rect.top ];
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

    var x_track = (((lp - 50)/1.5) * 0.6);
    var y_track = (((tp - 50)/2) * -0.32)

    //black hole
    var bgX_pos = 10 + x_track;
    var bgY_pos = 48.6 - y_track;

    //nebula
    var nX_pos = 50 + x_track;
    var nY_pos = 11.5 - y_track;

    //flare 1
    var f1X_pos = 33.5 + x_track;
    var f1Y_pos = 36.5 - y_track;

    //border
    var border_X = (-tx*0.15) - 50;
    var border_Y = (ty*0.08) - 50;
  
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    //var axis_pos = `transform-origin: ${bgX_pos}% ${bgY_pos}%;`
    var baxis_pos = `top:${bgY_pos}%; left:${bgX_pos}%;`
    var naxis_pos = `top:${nY_pos}%; left:${nX_pos}%;`
    var f1axis_pos = `top:${f1Y_pos}%; left:${f1X_pos}%;`

    //var opc = `opacity: ${p_opc/100};`
    var tf = ` transform: rotateX(${ty*-1}deg) rotateY(${tx*-1}deg)`
    var tf_border = `transform: translate(${border_X}%, ${border_Y}%) rotateX(${ty*-1}deg) rotateY(${tx*-1}deg);`
    var hue_rotate = `filter: hue-rotate(${pa}deg) saturate(2) opacity: 0.8;`
    var brightness = 1.6 + (100 - py)/100;
    var gems_glow = `filter: brightness(${brightness}) saturate(2) hue-rotate(${pa}deg);`
    // need to use a <style> tag for psuedo elements
    //${opc}
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} }   /* sparkles */ 
      .card:hover .background, .stars { ${sprk_pos} }   /* positions mask */
      .card:hover .hair-color-fx { ${hue_rotate} }
      .card:hover .jewels { ${gems_glow} }
      .black-hole, .dot { ${baxis_pos} }
      .nebula { ${naxis_pos} }
      .flare { ${f1axis_pos} }
      .card:hover + .border { ${tf_border} filter: drop-shadow(2px 4px 6px #ffd7002f) brightness(1.1); opacity: 1; text-shadow: 0px 0px 5px #ffd7009f;}
    `
    //var string = "x " + lp + " y " + tp;
    //ffd700
    //500050
    // set / apply css class and style
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    //$("#text").html(string);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    $border.removeAttr("style");
    x = setTimeout(function() {
      //$card.addClass("animated");
    },2500);
  });