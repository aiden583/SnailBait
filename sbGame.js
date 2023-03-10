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
  runnerImage = new Image(),
  fps;

function drawBackground() {
  context.drawImage(background, 0, 0);
}

function drawRunner() {
  context.drawImage(runnerImage, RUNNER_LEFT, 280);
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

function drawPlatform(data) {
  var platformTop = calculatePlfmTop(data.track);

  context.lineWidth = PLATFORM_STROKE_WIDTH;
  context.strokeStyle = PLATFORM_STROKE_STYLE;
  context.fillStyle = data.fillStyle;
  context.globalAlpha = data.opacity;

  context.strokeRect(data.left, platformTop, data.width, data.height);
  context.fillRect(data.left, platformTop, data.width, data.height);
}

function drawPlatforms() {
  var index;
  for (index = 0; index < platformData.length; index++) {
    drawPlatform(platformData[index]);
  }
}

function draw(now) {
  drawBackground();
  drawRunner();
  drawPlatforms();
}

function testFunc() {
  // context.fillText('1234534645754678ASDFSHFGHJ', 100, 150);
  context.fillText('1234534645754678ASDFSHFGHJ', 0, 5);
  // testDrawGrid();
}

// draw some lines to make sure the axis
function testDrawGrid() {
  context.lineWidth = 1;
  context.strokeStyle = '#ffffff';
  for (let i = 0; i < canvas.height; i += 10) {
    context.beginPath();
    if (i <= 10) {
      context.lineWidth = 3;
      context.strokeStyle = 'rgb(0,250,0)';
    } else {
      context.lineWidth = 1;
      context.strokeStyle = '#ffffff';
    }
    context.moveTo(0, i);
    context.lineTo(canvas.height, i);
    context.stroke();
  }
}

var lastAnimationFrameTIme = 0,
  lastFpsUpdateTime = 0,
  fpsELement = document.getElementById('snailbait-fps');
function calculateFps(now) {
  var fps = (1 / (now - lastAnimationFrameTIme)) * 1000;
  if (now - lastFpsUpdateTime > 1000) {
    lastFpsUpdateTime = now;
    fpsELement.innerHTML = 'fps: ' + fps.toFixed(4);
  }
  lastAnimationFrameTIme = now;
  return fps;
}

function animate(now) {
  fps = calculateFps(now);
  draw(now);
  testFunc();
  // requestNextAnimationFrame(animate);
}

function startGame() {
  requestNextAnimationFrame(animate);
}

function initializeImages() {
  background.src = 'image/background.png';
  runnerImage.src = 'image/runner.png';
  background.onload = function (e) {
    startGame();
  };
}
initializeImages();
