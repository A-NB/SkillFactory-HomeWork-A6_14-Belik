const numDivs = 36;
const maxHits = 10;

let score = 0; // Количество набранных очков

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый  // Fixed (See handleClick)

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером  // Fixed

  $(divSelector).text(hits + 1);

  // FIXME: тут надо определять при первом клике firstHitTime  // Fixed

  if (hits === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала  // Fixed

  $(".row:nth-of-type(-n+6)").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");

  $(".info").text(`Игра окончена! Вы набрали ${score > 0 ? score : 0} очков из 100 возможных. Допущено промахов: ${(100 - score) / 5}.`);  // Вывод уведомления о количестве набранных очков, а так же количестве допущенных промахов
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?  // Fixed

  if ($(event.target).hasClass("target")) {
    hits += 1; //hits = hits + 1;

    $(".target").text("");
    $(".target").removeClass("target");   
    
    score += 10; // +10 очков за точное попадание

    round();

      // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss  // Fixed

  } else if ($(".game-field").hasClass("target")) {    
    
    $(this).addClass("miss");
    setTimeout(() => {$(".miss").removeClass("miss")}, 100); 

    score -= 5; // -5 очков за промах

  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке  // Fixed

  $("#button-start").click(function() {
    $(this).addClass("d-none");
    $(".rules").addClass("d-none");    
    $(".info").removeClass("d-none");    

    round();

  });


  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);