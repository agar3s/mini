var hero = new Sprite(hero, animations);
hero.setAnimation('hero');
hero.setPixelSize(5);

var calavera = new Sprite(monster, animations);
calavera.setAnimation('monster');
calavera.setPixelSize(5);
calavera.x = 50;
calavera.y = 50;

var cont=0;
function gameloop(){
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,580,580);
  cont++;
  if(cont%3==0){
    hero.animate();
    calavera.animate();
  }
  hero.draw();
  calavera.draw();

  ra(gameloop);
}
ra(gameloop);
