var hero = '{H{I{X{Y"#$134ACERSVcdsu~.~0~=~?~M~O~]~^~_~`';
var monster = '{D{L{S{T{V{W{X{Y{Z{\\{]{c{d{e{f{g{h{i{j{k{l{m{t{u#&\'0123456@ABCDEFQRSTUabcderst';

var frames = [
  '', // 0
  'F?/!{uVRA1', // 1
  '~\\~LD6{f{U{T{S~^~M?/!{u', // 2
  '!{e{FFE6{f{T{S', // 3
  'B{j{i{g{Z{V{G{8D"!{e{X{U{I{H{F', // 4
  '~[~K~<1{k{[{X{H{:{9~]~\\~L{i{Y{V{G{8', // 5
  '~-tRA2%{i{h{]{\\{Y~.uB1{k{g{X{H{:{9', // 6
  '~J~;~:rQ@1)(\'&~[~K~=RA{h{]{\\{[{Z{Y', // 7
  '~K~@~=B"~J~:Q@1)(', // 8
  '~]~\\~L~.uD{Z{Y~K~@~<~;~-trB\'&%', // 9
  '~^~MVREA1{X{I{H~\\~LD2{j{i{Z', // 10
  '~\\~`~_~^~]~O~M~?~=~0~.usdcVSRECA431$#"{Y{X{I{H', // 11
  '~/~.~-uqecaTR', // 12
  '~?~>~=~0~,usqdb', // 13
  '~O~N~M~@~<~0~.~,tr', // 14
  '~0~.~,tr~O~N~M~@~<', // 15
  'usqdb~?~>~=~0~,', // 16
  'ecaTR~/~.~-uq', // 17
];

var animations = {
  hero: {
    kf: hero,
    f: [1,2,3,4,5,6,7,8,9,10]
  },
  hero2: {
    kf: hero,
    f: [11]
  },
  monster: {
    kf: monster,
    f: [0,12,0,13,0,14,0,0,15,0,16,0,17]
  },
};