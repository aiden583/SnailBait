var RUNNER_LEFT = 50;

var PLATFORM_HEIGHT = 3,
  PLATFORM_STROKE_WIDTH = 2,
  PLATFORM_STROKE_STYLE = 'grey';

var TRACK_1_BASELINE = 323,
  TRACK_2_BASELINE = 223,
  TRACK_3_BASELINE = 123;

var platformData = [
  {
    left: 10,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(250,250,0)',
    opacity: 0.5,
    track: 1,
    pulsate: false,
  },
  {
    left: 10,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(250,250,0)',
    opacity: 0.5,
    track: 2,
    pulsate: false,
  },
  {
    left: 10,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(250,250,0)',
    opacity: 0.5,
    track: 3,
    pulsate: false,
  },
];

var canvas = document.getElementById('snailbait-game-canvas'),
  context = canvas.getContext('2d'),
  background = new Image(),
  runnerImage = new Image();

window.requestNextAnimationFrame = (function () {
  var originalWebkitRequestAnimationFrame = undefined,
    wrapper = undefined,
    callback = undefined,
    geckoVersion = 0,
    userAgent = navigator.userAgent,
    index = 0,
    self = this;

  if (window.webkitRequestAnimationFrame) {
    // 定义wrapper函数
    wrapper = function (time) {
      if (time === undefined) {
        time = +new Date();
      }
      self.callback(time);
    };

    // 改变函数调用关系
    originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
    window.webkitRequestAnimationFrame = function (callback, element) {
      self.callback = callback;

      //浏览器调用wrapper函数，wrapper函数调用回调函数
      originalWebkitRequestAnimationFrame(wrapper, element);
    };
  }

  //解决Gecko2.0内核浏览器bug
  if (window.mozRequestAnimationFrame) {
    index = userAgent.indexOf('rv:');
    if(userAgent.indexOf('Gecko') != -1){
      geckoVersion = userAgent.substr(index + 3, 3);
      if(geckoVersion === '2.0') {
        window.mozRequestAnimationFrame = undefined;
      }
    }
  }

  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    winsow.msRequestAnimationFrame ||
    function (callback, element) {
      var start, finish;
      window.setTimeout(function () {
        start = +new Date();
        callback(start);
        finish = +new Date();
        self.timeout = 1000 / 60 - (finish - start);
      }, self.timeout);
    }
  );
})();

function initializeImages() {
  background.src = 'image/background.png';
  runnerImage.src = 'image/runner.png';
  background.onload = function (e) {
    startGame();
  };
}

function startGame() {
  draw();
  drawPlatforms();
}

function testFunc() {
  console.log(window.navigator.userAgent);
}

function draw() {
  drawBackground();
  drawRunner();
}

function drawBackground() {
  context.drawImage(background, 0, 0);
}

function drawRunner() {
  context.drawImage(runnerImage, RUNNER_LEFT, 280);
}

function drawPlatforms() {
  var index;
  for (index = 0; index < platformData.length; index++) {
    drawPlatform(platformData[index]);
  }
}
function drawPlatform(data) {
  var platformTop = calculatePlfmTop(data.track);

  context.lineWidth = PLATFORM_STROKE_WIDTH;
  context.strokeStyle = PLATFORM_STROKE_STYLE;
  context.fillStyle = data.fillStyle;
  context.globalAlpha = data.opacity;

  context.strokeRect(data.left, platformTop, data.width, data.height);
  context.fillRect(data.left, platformTop, data.width, data.height);
}

function calculatePlfmTop(track) {
  if (track === 1) {
    return TRACK_1_BASELINE;
  } else if (track === 2) {
    return TRACK_2_BASELINE;
  } else if (track === 3) {
    return TRACK_3_BASELINE;
  }
}

initializeImages();
