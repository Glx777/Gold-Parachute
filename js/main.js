var meteorite
var username;
var count = 0;
var score = 0;
var w = $("#playground").width();
var h = $("#playground").height();
var test = false;

$(document).ready(function() {
  $("#startGame").prop('disabled', true);
  $("#gamePlay").hide();
  $("#gameEnd").hide();
});
$("#startGame").click(function() {
  $("#name").text($("#nameInput").val());
  if ($("#nameInput").val() == 'tester') {
    $("#name").text('Тестовый режим');
    test = true;
  }
  $("#gameStart").hide();
  $("#gamePlay").show();
  $("#score").text(score);
  motion = setInterval(spawnMeteorite, 1500);
});
$("#nameInput").keyup(function() {
  if ($(this).val() == '' || $(this).length < 1) {
    $("#startGame").prop('disabled', true);
  } else {
    $("#startGame").prop('disabled', false);
  }
});

function selectMeteorite() {
  var chance = Math.random();
  if (chance < 0.7) {
    meteorite = 'small';
  } else {
    meteorite = 'big';
  }
  return meteorite;
}

function spawnMeteorite() {
  var met = selectMeteorite();
  left = Math.round(Math.random() * (w - 100));
  if (met == 'big') {
    $("#playground").append('<div id="met' + count + '" class="meteorite-big" style="left: ' + left + 'px;" ondblclick="giveParachute(' + count + ')"></div>');
  } else {
    $("#playground").append('<div id="met' + count + '" class="meteorite-small" style="left: ' + left + 'px;" onclick="giveParachute(' + count + ')"></div>');
  }
  objHeight = $("#met" + count).height();
  top = parseInt($("#met" + count).css('top'));
  newTop = h + objHeight;
  $("#met" + count).animate({top: newTop + 'px'}, 6500, 'linear', function() {
    if (test == false) {
      $(this).remove();
      end();
    }
  });

  count += 1;
}

function end() {
  clearInterval(motion);
  $("#gamePlay").hide();
  $("#gameEnd").show();
  $("#namePHP").val($("#name").text());
  $("#scorePHP").val($("#score").text());
  $(".meteorite-small").stop();
  $(".meteorite-big").stop();
  $.post($("#myForm").attr('action'), $('input.info').serializeArray(), function(info) {
    console.log(info);
    $("#Leaderboard").load('./php/get.php');
  });
}

function giveParachute(id) {
  if ($('#met' + id).hasClass('slow') == false && $("#pause_btn").val() == 'Пауза') {
    if ($("#met" + id).hasClass('meteorite-small')) {
      $("#met" + id).addClass("slow").append('<div id="par' + id + '" class="parachute-small"></div>');
      $("#par" + id).show();
      score += 1;
      $("#scoreDIV").animate({
        left: '+=50px'
      },200);
      $("#scoreDIV").animate({
        left: '-=50px'
      },200);
    }
    if ($("#met" + id).hasClass('meteorite-big')) {
      $("#met" + id).addClass("slow").append('<div id="par' + id + '" class="parachute-small"></div>');
      $("#par" + id).fadeIn('slow');
      score += 2;
      $("#scoreDIV").animate({
        left: '+=50px'
      },200);
      $("#scoreDIV").animate({
        left: '-=50px'
      },200);
    }

    $("#score").text(score);
    heightMet = $('#met' + count).height();
    var lastTop = h;
    $("#met" + id).stop();
    $("#met" + id).animate({top: lastTop + 'px'}, 8000, 'linear', function() {
      $(this).remove();
    });
  }
}

$("#pause_btn").click(function() {
  $(this).val($(this).val() == 'Пауза' ? 'Продолжить' : 'Пауза');
  if ($(this).val() == 'Пауза') {
    motion = setInterval(spawnMeteorite, 1500);
    $(".meteorite-small").animate({top: newTop + 'px'}, 6500, 'linear', function() {
      if (test == false) {
        $(this).remove();
        end();
      }
    });
    $(".meteorite-big").animate({top: newTop + 'px'}, 6500, 'linear', function() {
      if (test == false) {
        $(this).remove();
        end();
      }
    });
  }
  if ($(this).val() == 'Продолжить'){
    clearInterval(motion);
    $(".meteorite-small").stop();
    $(".meteorite-big").stop();
  }
});

$('body').keyup(function(e) {
  if (e.keyCode == 32) {
    $("#pause_btn").val($("#pause_btn").val() == 'Пауза' ? 'Продолжить' : 'Пауза');
    if ($("#pause_btn").val() == 'Пауза') {
      motion = setInterval(spawnMeteorite, 1500);
      $(".meteorite-small").animate({top: newTop + 'px'}, 6500, 'linear', function() {
      });
      $(".meteorite-big").animate({top: newTop + 'px'}, 6500, 'linear', function() {
      });
    }
    if ($("#pause_btn").val() == 'Продолжить') {
      clearInterval(motion);
      $(".meteorite-small").stop();
      $(".meteorite-big").stop();
    }
  }
});

$("#startAgain").click(function() {
  $("#gamePlay").show();
  $("#gameEnd").hide();
  $("#score").text('0');
  $(".meteorite-small").remove();
  $(".meteorite-big").remove();
  $("#pause_btn").val("Пауза");
  score = 0;
  count = 0;
  motion = setInterval(spawnMeteorite, 1500);
});
