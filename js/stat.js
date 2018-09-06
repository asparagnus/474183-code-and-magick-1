'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 130;
var TEXT_CLOUD_Y = 260;
var RECT_CLOUD_Y = 250;
var BAR_WIDTH = 40;
var BAR_HIGHT = 150;
var TEXT_TIME_Y = 80;
var GAP = 50; // коэффициент
var GAP_STEPS = BAR_WIDTH + GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Максимальное время в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, time) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)'); // тень
  renderCloud(ctx, 100, 10, '#00BFF5'); // квадрат
  ctx.fillStyle = '#000000'; // текст
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 150, 30);
  ctx.fillText('Список результатов:', 150, 50);
  var maxTime = getMaxElement(time);
  for (var i = 0; i < players.length; i++) {
    // MAX_BAR/DAR_WIDTH = BAR[i]/X
    // X = (BAR_WIDTH * BAR[i]) / MAX_BAR
    if (players[i] === 'Вы') { // цвет
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(14, 32, 232, ' + Math.random(0.3, 0.9) + ')';
    }
    ctx.fillRect(CLOUD_X + GAP_STEPS * i, RECT_CLOUD_Y, BAR_WIDTH, -BAR_HIGHT * time[i] / maxTime); // прямоугольники
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + GAP_STEPS * i, TEXT_CLOUD_Y);
    ctx.fillText(Math.round(time[i]), CLOUD_X + GAP_STEPS * i, TEXT_TIME_Y); // время
  }
};
