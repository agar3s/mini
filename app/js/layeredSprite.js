
var LayeredSprite = function(sprites){
  var m = this;
  m.sprites = sprites;
  m.pixelSize = 0;
  m.setPixelSize = function(pixelSize){
    m.pixelSize = pixelSize;
    m.sprites.map(function(sprite){sprite.setPixelSize(pixelSize)});
  };
  m.animate = function(){
    m.sprites.map(function(sprite){sprite.animate()});
  };
  m.draw = function(){
    m.sprites.map(function(sprite){sprite.draw()});
  };
  m.setPos = function(x, y){
    m.sprites.map(function(sprite){sprite.x=x; sprite.y=y;});
  }
  m.setAnimation = function(name){
    m.sprites.map(function(sprite){sprite.setAnimation(name)});
  }
}