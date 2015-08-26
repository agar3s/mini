var coords = {
  x: 0,
  y:0
}

canvas.addEventListener('click', function(e){
  coords.x = e.offsetX;
  coords.y = e.offsetY;
  e.preventDefault();
});