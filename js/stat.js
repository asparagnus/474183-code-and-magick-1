'use strict';

var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  CURVE: 20,
  X: 100,
  Y: 10,
  COLOR: '#ffffff'
};

var shadowParams = {
  WIDTH: cloudParams.WIDTH,
  HEIGHT: cloudParams.HEIGHT,
  CURVE: cloudParams.CURVE,
  X: cloudParams.X + 10,
  Y: cloudParams.Y + 10,
  COLOR: 'rgba(0, 0, 0, 0.7)'
};

var textParams = {
  TEXT: 'Ура вы победили!\nСписок результатов:',
  FONT: '16px PT Mono',
  COLOR: '#000000',
  LINE_HEIGHT: 20,
  X: cloudParams.X + 20,
  Y: cloudParams.Y + 30,
  MAX_WIDTH: cloudParams.WIDTH - 40,
  HEIGHT: 40
};

var barParams = {
  HEIGHT: 150,
  COLUMN_WIDTH: 40,
  COLUMN_GAP: 50,
  COLOR_YOUR: 'rgba(255, 0, 0, 1)',
  X: cloudParams.X + 40,
  COLUMN_OPACITY_MIN: 0.1,
  COLUMN_OPACTIY_MAX: 1
};

// функция рисования облака
var renderCloud = function (ctx, cloud) {
  ctx.fillStyle = cloud.COLOR;
  ctx.beginPath();
  ctx.moveTo(cloud.X + cloud.CURVE, cloud.Y);
  ctx.lineTo(cloud.X + cloud.WIDTH - cloud.CURVE, cloud.Y);
  ctx.quadraticCurveTo(cloud.X + cloud.WIDTH, cloud.Y, cloud.X + cloud.WIDTH, cloud.Y + cloud.CURVE);
  ctx.lineTo(cloud.X + cloud.WIDTH, cloud.Y + cloud.HEIGHT - cloud.CURVE);
  ctx.quadraticCurveTo(cloud.X + cloud.WIDTH, cloud.Y + cloud.HEIGHT, cloud.X + cloud.WIDTH - cloud.CURVE, cloud.Y + cloud.HEIGHT);
  ctx.lineTo(cloud.X + cloud.CURVE, cloud.Y + cloud.HEIGHT);
  ctx.quadraticCurveTo(cloud.X, cloud.Y + cloud.HEIGHT, cloud.X, cloud.Y + cloud.HEIGHT - cloud.CURVE);
  ctx.lineTo(cloud.X, cloud.Y + cloud.CURVE);
  ctx.quadraticCurveTo(cloud.X, cloud.Y, cloud.X + cloud.CURVE, cloud.Y);
  ctx.closePath();
  ctx.fill();
};

// функция рисования текста
var drawText = function (ctx, text) {
  var lines = text.TEXT.split('\n');
  ctx.fillStyle = text.COLOR;
  ctx.font = text.FONT;
  for (var i = 0; i < lines.length; i++) {
    var words = lines[i].split(' ');
    var line = '';
    for (var j = 0; j < words.length; j++) {
      var testLine = line + words[j] + ' ';
      var testWidth = ctx.measureText(testLine).width;
      if (testWidth > text.MAX_WIDTH) {
        ctx.fillText(line, text.X, text.Y);
        line = words[j] + ' ';
        text.Y += text.LINE_HEIGHT;
        text.HEIGHT += text.LINE_HEIGHT;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, text.X, text.Y);
    text.Y += text.LINE_HEIGHT;
    text.HEIGHT += text.LINE_HEIGHT;
  }
};

// функция расчета насыщенность цвета столбца гистограммы
var getRandomOpacity = function (min, max) {
  return Math.random() * (max - min) + min;
};

// функция рисования колонки гистограммы
var drawColumn = function (ctx, bar, name, value, maxValue, number) {
  var columnOpacity = getRandomOpacity(bar.COLUMN_OPACITY_MIN, bar.COLUMN_OPACTIY_MAX);
  var columnHeight = Math.round(value * bar.HEIGHT / maxValue);
  ctx.fillStyle = name === 'Вы' ? bar.COLOR_YOUR : 'rgba(0, 0, 255, ' + columnOpacity + ')';
  ctx.fillRect(bar.X + number * (bar.COLUMN_GAP + bar.COLUMN_WIDTH), bar.Y + bar.HEIGHT - columnHeight, bar.COLUMN_WIDTH, columnHeight);
  ctx.fillStyle = textParams.COLOR;
  ctx.fillText(Math.round(value), bar.X + number * (bar.COLUMN_GAP + bar.COLUMN_WIDTH), bar.Y + bar.HEIGHT - columnHeight - 10);
  ctx.fillText(name, bar.X + number * (bar.COLUMN_GAP + bar.COLUMN_WIDTH), bar.Y + bar.HEIGHT + 20);
};

window.renderStatistics = function (ctx, names, times) {
  // рисование облака
  renderCloud(ctx, shadowParams);
  renderCloud(ctx, cloudParams);

  // рисование текста на облаке
  drawText(ctx, textParams);

  var maxTime = Math.max.apply(Math, times);

  // добавляем гистограмме координату Y после того, как известна высота блока с текстом
  barParams.Y = cloudParams.Y + textParams.HEIGHT;
  // рисование гистограммы
  for (var i = 0; i < times.length; i++) {
    drawColumn(ctx, barParams, names[i], times[i], maxTime, i);
  }
};
