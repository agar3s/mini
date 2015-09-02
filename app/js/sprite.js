var ppp=16;
var pp1=15;

var convertTobyte = function(d){
  var bArray = new Int16Array(ppp);
  for (var i = 0; i < d.length; i++) {
    bArray[d[i] >> 4] |= 1<<pp1-(d[i] & 0XF);
  }
  return bArray;
}

var loadByString= function(sprite){
  var i=0, char=sprite[i];
  var byteArray=[];
  var byte = 0;
  while(char){
    var mod = 0X55;
    if(char[0]=='{'){
      char = sprite[++i];
      mod=0;
    }
    if(char[0]=='~'){
      char = sprite[++i];
      mod=0XAA;
    }
    byteArray.push(char.charCodeAt()+mod-0X21);
    char = sprite[++i]
  }
  return byteArray;
}

var Sprite = function(code){
  var m = this;
  m.x = 0;
  m.y = 0;
  m.color = '#000';
  m.byteArray = new Int16Array(ppp);
  m.data = loadByString(code);
  m.frames = [];
  m.iFrame = 0;
  m.byteArray = convertTobyte(m.data);
  m.pixelSize = 0;

  m.setPixelSize = function(pixelSize){
    m.pixelSize = pixelSize;
    m.height = m.width = m.pixelSize*16;
  }
  
  m.addFrame = function(data){
    m.frames.push(convertTobyte(data));
    m.iFrame = m.frames.length-1;
  }

  m.animate = function(){
    if(++m.iFrame>=m.frames.length){
      m.iFrame=0;
    }
    if(typeof(m.frames[m.iFrame])=='string'){
      return m.setAnimation(m.frames[m.iFrame]);
    }
    var data2 = [];
    for(var j = 0; j < ppp; j++) {
      m.byteArray[j] = m.byteArray[j]^m.frames[m.iFrame][j];
      for (var i = 0; i < ppp; i++) {
        if(1<<(pp1-i)&m.byteArray[j]){
         data2.push(j*ppp+i);
        }
      }
    }
    m.data = data2;
  }

  m.draw= function(){
    ctx.fillStyle = m.color;
    for(var i = 0; i < m.data.length; i++) {
      var k = (m.data[i] & 0XF)
      ctx.fillRect(m.x+(m.direction?k:15-k)*m.pixelSize, m.y+(m.data[i] >> 4)*m.pixelSize, m.pixelSize, m.pixelSize);
      console.log(m.x);
    }
  }

  m.setAnimation = function(name){
    if(m.currentAnimation == name||!animations[name]) return;
    m.currentAnimation = name;
    m.frames = [];
    var animation = animations[name].f;
    m.byteArray = convertTobyte(loadByString(animations[name].kf));
    for (j = 0; j < animation.length; j++) {
      var ha = frames[animation[j]];
      if(animation[j]==-1){
        m.iFrame = m.frames.length;
        return m.frames.push('i');
      }
      m.addFrame(loadByString(ha));
    }
  }
}