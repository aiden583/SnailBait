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

var backgroundOffset = 0;
// translate coordinate system to draw bg with offset
function drawBackground() {
  context.translate(-backgroundOffset, 0);
  context.drawImage(background, 0, 0);
  context.drawImage(background, background.width, 0);
  context.translate(backgroundOffset, 0); // recover coordinate
}

// calculate offset based on time
var BACKGROUND_VELOCITY = 25,
  bgVelocity = BACKGROUND_VELOCITY;
function setBackgroungOffset(now) {
  backgroundOffset += ((now - lastAnimationFrameTime) / 1000) * bgVelocity;
  if (backgroundOffset > background.width || backgroundOffset < 0) {
    // not sure setting 0 correct
    backgroundOffset = 0;
  }
}

// velocity po/ne according to turning right or left
function turnLeft() {
  bgVelocity = -BACKGROUND_VELOCITY;
}
function turnRight() {
  bgVelocity = BACKGROUND_VELOCITY;
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
  setBackgroungOffset(now);
  drawBackground();
  drawRunner();
  drawPlatforms();
}

var lastAnimationFrameTime = 0,
  lastFpsUpdateTime = 0,
  fpsELement = document.getElementById('snailbait-fps');
function calculateFps(now) {
  var fps = (1 / (now - lastAnimationFrameTime)) * 1000;
  if (now - lastFpsUpdateTime > 1000) {
    lastFpsUpdateTime = now;
    fpsELement.innerHTML = 'fps: ' + fps.toFixed(4);
  }
  lastAnimationFrameTime = now;
  return fps;
}

function animate(now) {
  draw(now);
  fps = calculateFps(now);
  requestNextAnimationFrame(animate);
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
