var fs = require('fs');
var dir = './app/sprites';

//assuming sprites with 16X16 dimmension
var cols = 16;
var rows = 16;


function main(cb){
  fs.readdir(dir, function(err, files){
    var sprites = [];
    if (err) throw err;
    files.forEach(function(filename){
      var file = fs.readFileSync(dir+'/'+filename, 'utf-8');
      sprites.push(processSprite(filename, file));
    });

    var result = joinSprites(sprites);
    return cb(result);
  });
};

function processSprite(name, rawSprite){
  var indexOfAnimation = rawSprite.indexOf('\nAnimation:\n');
  var frames = rawSprite.substring(0, indexOfAnimation).split('//new Frame');
  var animations = rawSprite.substring(indexOfAnimation+12).split(',');
  for (var i = 0; i < frames.length; i++) {
    frames[i] = encodeFrame(frames[i]);
  };
  
  var animres = buildDiffArray(frames, animations);
  return {
    name: name.replace('.sprite', ''),
    key: frames[0], 
    frames: animres
  };
};

function encodeFrame(frame){
  var byteArray = [];
  var encoded = '';
  var data = frame.replace(/\n/g, '');
  if(data.length!=256) process.exit();

  for (var i = 0; i < data.length; i++) {
    var character = data[i];
    if(character==='M'){
      byteArray.push(i);
    }
    if(character==='/'){
      break;
    }
  };

  for (var i = 0; i < byteArray.length; i++) {
    var b = byteArray[i];
    var code = '';
    if(b<0X55){
      code = '{';
    }else if(b<0XAA){
      code = '';
    }else{
      code = '~';
    }
    var byte = b%0X55+0X21;
    code += String.fromCharCode(byte);
    encoded+=code;
  }

  return encoded;

};

function buildDiffArray(encodedFrames, animations){
  var diffArray = [];
  var arrangedFrames = [];
  for (var i = 0; i < animations.length; i++) {
    arrangedFrames.push(encodedFrames[animations[i]]);
  };

  
  for (var j = 0; j < arrangedFrames.length; j++) {
    arrangedFrames[j] = convertArray(arrangedFrames[j]);
    if(j==0) continue;
    var diffElement = []; 
    for (var k = arrangedFrames[j].length - 1; k >= 0; k--) {
      if(arrangedFrames[j-1].indexOf(arrangedFrames[j][k])==-1){
        diffElement.push(arrangedFrames[j][k]);
      }
    };
    for (var k = arrangedFrames[j-1].length - 1; k >= 0; k--) {
      if(arrangedFrames[j].indexOf(arrangedFrames[j-1][k])==-1){
        diffElement.push(arrangedFrames[j-1][k]);
      }
    };
    diffArray.push(diffElement);
  };

  for (var i = 0; i < diffArray.length; i++) {
    diffArray[i] = diffArray[i].join('');
  };
  return diffArray;
};

function convertArray(sprite){
  var i=0, char=sprite[i];
  var dataArray=[];
  while(char){
    if(char[0]=='{'){
      char += sprite[++i];
    }
    if(char[0]=='~'){
      char += sprite[++i];
    }
    dataArray.push(char);
    char = sprite[++i];
  }
  return dataArray;
};

function joinSprites(sprites){
  var keyFrames = {};
  var frames = [''];
  var animations = {};

  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    if(!keyFrames[sprite.key]){
      keyFrames[sprite.key] = sprite.name;
    };
    var kf = sprite.name;
    var f = [];
    for (var j = 0; j < sprite.frames.length; j++) {
      var nFrame = sprite.frames[j];
      var index = frames.indexOf(nFrame);
      
      if(index==-1){
        frames.push(nFrame);
        index = frames.length - 1;
      }
      f.push(index);
    };

    animations[sprite.name] = {
      kf: keyFrames[sprite.key],
      f: f
    }
  };

  return asTemplate(keyFrames, frames, animations);
}

function asTemplate(keyFrames, frames, animations){
  var variablesAsCode = '';
  var keyCodes = Object.keys(keyFrames);
  for (var i = 0; i < keyCodes.length; i++) {
    var value = keyCodes[i];
    var name = keyFrames[value];
    variablesAsCode+= "var "+name+" = '"+ value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")+"';\n"
  };
  var framesAsCode = 'var frames = [\n';
  for (var i = 0; i < frames.length; i++) {
    framesAsCode += "  '"+frames[i].replace(/\\/g, "\\\\").replace(/'/g, "\\'")+"', // "+i+'\n'
  };
  framesAsCode += '];\n';

  var animationsAsCode = 'var animations = {\n'
  var animationKeys = Object.keys(animations);
  for (var i = 0; i < animationKeys.length; i++) {
    var key = animationKeys[i];
    var value = animations[key];
    animationsAsCode += '  ' + key + ': {\n';
    animationsAsCode += '    kf: ' + value.kf + ',\n';
    animationsAsCode += '    f: [' + value.f + ']\n';
    animationsAsCode += '  },\n';
  };
  animationsAsCode += '};'

  return variablesAsCode + '\n' + framesAsCode + '\n' + animationsAsCode;
}

main(function(script){
  fs.writeFile('./app/js/generatedSprites.js', script, function(err){
    if(err){
      console.log('exception:', err);
      return;
    }
    console.log('file created');
  });
  
})