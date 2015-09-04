var mixed = new LayeredSprite([
  { key:badrobotN, color:'#828282', layer:'N'},
  { key:badrobotP, color:'#000', layer:'P'},
  { key:badrobotQ, color:'#E12B26', layer:'Q'},
]);
mixed.setAnimation('badrobot');
mixed.setPixelSize(20);
/*
var triggers = {
  '0': function(){
    mixed.setPixelSize(8);
  },
  '10': function(){
    mixed.setPixelSize(20);
  },
  '20': function(){
    mixed.setPos(50,60);
  },
  '60': function(){
    mixed.setPos(0,0);
    mixed.setPixelSize(2);
  },
  '80': function(){
    mixed.setPixelSize(5);
  },
}
*/
var cont=0;
function gameloop(){
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,580,580);
  cont++;
  if(cont%3==0){
    mixed.animate();
  }/*
  var trigger = triggers[cont];
  if(trigger) trigger();
  if(cont>100) cont=0;*/
  mixed.draw();

  ra(gameloop);
}
ra(gameloop);
