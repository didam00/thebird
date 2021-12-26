let bird = {
  y: 200,
  width: 51,
  height: 36,
  gravity_speed: -2,
  rotate: 0,
  state: 'fly',
  ability: 'raser',
  ability_cool: 0,
  immune: false,
  health: 20,
  stat: {
    size: 1,
    health: 20,
    speed: 1,
    power: 1,
    ability_cooldown: 1,
    item_cooldown: 1,
    max_cool: 2000,
    redbrick: 1,
    jump: 1,
  },
  item: [],
  url: 'normal-bird.png',
}

var setting = {
  calc: 1,
  frame: 1000/60,
  high_score: 0,
  score: 0,
  meter: 0,
}

function getid(where, id) {
  return where.filter(a => a.id == id)[0];
}

function getitem(id) {
  var item_w = $('<div id="'+id+'" class="item-white"></div>');
  var item_g = $('<div id="'+id+'" class="item-gray"></div>');
  var item_data = data.item.filter(a => a.id == id)[0];
  item_w.css('background', 'url(res/ui/'+item_data.url+')');
  item_g.css('background', 'url(res/ui/'+item_data.url+')');
  item_w.css('background-size', '21px');
  item_g.css('background-size', '21px');
  item_w.css('left', ((bird.item.length % 2) * 27) + 'px');
  item_g.css('left', ((bird.item.length % 2) * 27) + 'px');
  item_w.css('top', (Math.floor(bird.item.length / 2) * 27) + 'px');
  item_g.css('top', (Math.floor(bird.item.length / 2) * 27) + 'px');
  item_w.attr('id', id);
  item_g.attr('id', id);
  $('.items').append(item_w);
  $('.items').append(item_g);
  bird.item.push({
    id: id,
    data: item_data,
    how: 1,
    cool: item_data != undefined ? item_data.cool*bird.stat.item_cooldown : null,
  });

  $('.getitem').text(item_data.name);
  $('.getitem').css('transition', '');
  $('.getitem').css('opacity', '0.33');
  setTimeout(function () {
    $('.getitem').css('transition', 'opacity 3s');
    $('.getitem').css('opacity', '0');
  }, 2000)

  if(item_data.hasOwnProperty('when_get')) {
    item_data.when_get();
  }
  return bird.item[bird.item.length-1];
}

// setting
var pause = false;

var entitys = [];

// space = {h: 400, w: 700}

function summon(id, x=700, y=(Math.random()*340)+30) {
  var entity = $('<img class="entity"></img>');
  var entity_data = data.entity.filter(a => a.id == id)[0];
  entity.attr('src', 'res/'+entity_data.url);
  entity.attr('class', 'entity');
  entity.attr('id', id);
  entity.css('position', 'absolute');
  entity.css('left', x + 'px');
  entity.css('bottom', y + 'px');
  entity.css('width', (entity_data.width*3) + 'px');
  entity.css('height', (entity_data.height*3) + 'px');
  entity.css('z-index', '-1');
  $('.space').append(entity);
  entitys.push({
    element: entity,
    data: entity_data,
    health: entity_data.health,
    position: {x: x, y: y},
    cool: entity_data.cool,
  });
  return entity;
}

var tick, frame;

function tickfunction() {
  // put gravity on bird
  if(bird.gravity_speed < 9 && bird.y > 0 && bird.y <= 400 && bird.state != 'dream') {
    bird.gravity_speed += 0.02*((bird.stat.size-1)/2+1) * setting.calc;
    bird.rotate += bird.gravity_speed/5;
    bird.y -= bird.gravity_speed;
  } else if(bird.y <= 0) {
    bird.y = 0;
    bird.state = 'die';
    // if((bird.rotate % 360) <= 0.1 && (bird.rotate % 360) >= -0.1) {
    //   bird.rotate = 0;
    // } else if((bird.rotate % 360) > 0) {
    //   bird.rotate -= (bird.rotate % 360)/8;
    // } else if((bird.rotate % 360) < 0) {
    //   bird.rotate -= (bird.rotate % 360)/8;
    // }
  } else if(bird.y > 400) {
    bird.y = 400;
    bird.gravity_speed = 2 * setting.calc;
    bird.state = 'stun';
    setTimeout(function () {
      bird.state = 'fly';
    }, 350);
  }

  // cool count ability
  if(bird.ability_cool == 0) { // 쿨타임이 끝났을 때
    $('.ability').filter('.item-white').css('filter','none');
    setTimeout(function () {if(bird.ability_cool <= 0) $('.ability').filter('.item-white').css('filter','brightness(0.5)');},80)
    setTimeout(function () {if(bird.ability_cool <= 0) $('.ability').filter('.item-white').css('filter','none');},160)
    setTimeout(function () {if(bird.ability_cool <= 0) $('.ability').filter('.item-white').css('filter','brightness(0.5)');},240)
    setTimeout(function () {if(bird.ability_cool <= 0) $('.ability').filter('.item-white').css('filter','none');},320)
  } else if(bird.ability_cool > 0) {
    $('.ability').filter('.item-white').css('filter','brightness(0.5)');
  }

  if(bird.ability_cool > -1) bird.ability_cool -= 5 * setting.calc;

  if(bird.ability_cool >= 0) {
    $('.ability').filter('.item-gray').height(bird.ability_cool/(bird.stat.max_cool*bird.stat.ability_cooldown) * 48);
  }

  // cool count item
  for(var i = 0; i < bird.item.length; i++) {
    let itemelement = $('.items .item-white').filter('#'+bird.item[i].id);
    if(bird.item[i].cool == null) {
      itemelement.css('filter','none');
      break;
    }

    if(bird.item[i].cool >= 0) {
      bird.item[i].cool -= 5 * setting.calc;
    }

    if(bird.item[i].cool == 0) {
      itemelement.css('filter','none');
      if(bird.item[i].data.hasOwnProperty('cool_end')) {
        bird.item[i].data.cool_end();
        bird.item[i].cool = bird.item[i].data.cool * bird.stat.item_cooldown;
      }
    } else if(bird.item[i].cool > 0) {
      itemelement.css('filter','brightness(0.5)');
    }
  }

  if(bird.stat.size < 0.2) {bird.stat.size = 0.2;}
  if(bird.state != 'die') {
    if(bird.stat.speed < 0.2) {bird.stat.speed = 0.2;}
  }


  if(bird.state == 'stun') {
    if($('.stun').length == 0) {
      var stun_effect = $('<img class="stun" src="res/stun.gif"></img>');
      $('#bird').css('opacity', 0.5);
      stun_effect.css('position', 'absolute');
      stun_effect.css('width', '24px');
      $('.space').append(stun_effect);
    }
  } else if(bird.immune) {
    $('#bird').css('opacity', 0.5);
  } else {
    $('#bird').css('opacity', 1);
    $('.stun').remove();
  }

  // check die
  if(bird.health <= 0) {
    bird.state = 'die';
  }
  
  if(bird.state == 'die' && $('.game-over').css('display') == 'none') {
    $('.game-over').css('display', 'block');
    bird.stat.speed = 0;
    bird.health = 0;
    bird.gravity_speed += 3 * setting.calc;
  }

  // summon entity
  if(Math.random() < 0.004 * setting.calc * (bird.stat.speed)/2) {
    summon('bat');
  }

  if(Math.random() < 0.0002 * setting.calc * (bird.stat.speed)/2) {
    summon('white-box');
  }

  $('.entity').each(function (i, e) {
    var entity = entitys[i];

    entity.position.x -= (entity.data.speed/2 + bird.stat.speed/2) * setting.calc

    // func
    if(entity.data.hasOwnProperty('func')) {
      entity.cool -= 5 * setting.calc;
    }

    if(entity.cool <= 0) {
      entity.cool = entity.data.cool;
      entity.data.func();
    }

    // if entitys collide with raser, entity's health -2
    if($('.raser').length > 0) {
      if(entity.element.position().left + entity.data.width*2 > $('.raser').position().left && entity.element.position().left < $('.raser').position().left + $('.raser').width()) {
        if(entity.element.position().top + entity.data.height*2 > $('.raser').position().top && entity.element.position().top < $('.raser').position().top + $('.raser').height()) {
          entity.health -= bird.stat.power * getid(data.ability, bird.ability).damage;
          entity.element.css('filter', 'opacity(0.5) drop-shadow(0 0 0 red)');
          setTimeout(function () {
            entity.element.css('filter', '');
          }, 10)
        }
      }
    }
    
    // if bird collide with entity, bird's health - entity's attack with using obb collision
    if((!bird.immune) && (bird.state != 'dream')) {
      if(entity.element.position().left + entity.data.width*2 > $('#bird').position().left && entity.element.position().left < $('#bird').position().left + $('#bird').width()) {
        if(entity.element.position().top + entity.data.height*2 > $('#bird').position().top && entity.element.position().top < $('#bird').position().top + $('#bird').height()) {
          if(bird.state != 'die') {
            bird.health -= entity.data.attack;
            if(entity.data.hasOwnProperty('weak')) {
              if(entity.data.hasOwnProperty('when_die')) {
                entity.data.when_die();
              }
              entity.element.remove();
              entitys.splice(i, 1);
            }
            if(bird.health <= 0) {
              bird.state = 'die';
            }
            bird.immune = true;
            setTimeout(function () {
              bird.immune = false;
            }, 500);
          }
        }
      }
    }

    if(bird.state == 'dream'){
      if(entity.element.position().left + entity.data.width*2 > $('#bird').position().left && entity.element.position().left < $('#bird').position().left + $('#bird').width()) {
        if(entity.element.position().top + entity.data.height*2 > $('#bird').position().top && entity.element.position().top < $('#bird').position().top + $('#bird').height()) {
          if(bird.state != 'die') {
            entity.health -= 10;
            entity.element.css('filter', 'opacity(0.5) drop-shadow(0 0 0 red)');
            setTimeout(function () {
              entity.element.css('filter', '');
            }, 10)
          }
        }
      }
    }
  });

  // flyboom
  for(var i = 0; i < entitys.filter(a => a.data.id == 'flyboom').length; i++) {
    var flyboom = entitys.filter(a => a.data.id == 'flyboom')[i];
    if(flyboom.position.y < bird.y) {
      flyboom.position.y += 0.4 * setting.calc;
    } else if(flyboom.position.y > bird.y) {
      flyboom.position.y -= 0.4 * setting.calc;
    }
  }
  
  for(var i = 0; i < entitys.filter(a => a.data.id == 'princess_bunny-bella').length; i++) {
    var flyboom = entitys.filter(a => a.data.id == 'princess_bunny-bella')[i];
    if(flyboom.position.y < bird.y) {
      flyboom.position.y += 0.35 * setting.calc;
    } else if(flyboom.position.y > bird.y) {
      flyboom.position.y -= 0.35 * setting.calc;
    }
  }

  setting.meter += bird.stat.speed/2 * setting.calc;
  setting.score += bird.stat.speed * setting.calc / 10;
}

function framefunction() {
  if($('.raser')) {
    $('.raser').css('bottom', (bird.y - 2) + 'px');
    // $('.raser-end').css('bottom', (bird.y - 5) + 'px');
  }
  
  for(var i = 0; i < bird.item.length; i++) {
    var itemelement = $('.items .item-gray').filter('#'+bird.item[i].id);
    if(bird.item[i].cool >= 0) {
      itemelement.height(bird.item[i].cool/bird.item[i].data.cool * 21);
    }
  }
  
  $('#bird').css('bottom', bird.y + 'px');
  $('#bird').css('transform', 'rotate(' + bird.rotate + 'deg)');
  $('#bird').attr('src', 'res/' + bird.url);

  $('.health').css('width', (bird.health*9)+'px');

  $('#bird').css('width', (bird.width*bird.stat.size) + 'px');
  $('#bird').css('height', (bird.height*bird.stat.size) + 'px');

  $('.entity').each(function (i, e) {
    var entity = entitys[i];
    if(entity.health <= 0 || (entity.element.position().left < 0)) {
      if(entity.health <= 0) {
        setting.score += 250;
        $('.score, .score div').css('transition', '');
        $('.score, .score div').css('color', '#00ff00');
        setTimeout(function () {
          $('.score, .score div').css('transition', 'all 500ms');
          $('.score, .score div').css('color', '');
        }, 500)

        if(entity.data.hasOwnProperty('when_die')) {
          entity.data.when_die();
        }
      }
      entity.element.remove();
      entitys.splice(i, 1);
    } else {
      entity.element.css('left', entity.position.x + 'px');
      entity.element.css('bottom', entity.position.y + 'px');
    }
  });
  
  $('.stun').css('left', (Number($('#bird').css('left').replace('px', '')) + bird.width/2 - 12) + 'px');
  $('.stun').css('bottom', (bird.y + bird.height + 6) + 'px');

  $('.spike').css('background-position-x',  (-setting.meter) + 'px');

  // fill empty space in score letter with '0'
  var score = Math.floor(setting.score).toString();
  var score_length = score.length;
  for(var i = 0; i < 10 - score_length; i++) {
    score = '0' + score;
  }
  var high_score = Math.floor(setting.high_score).toString();
  var high_score_length = high_score.length;
  for(var i = 0; i < 10 - high_score_length; i++) {
    high_score = '0' + high_score;
  }
  $('.score div').html(score);
  $('.high_score div').html(high_score);
}

window.onload = function () {
  tick = setInterval(tickfunction, setting.calc)
  frame = setInterval(framefunction, setting.frame)

  $('.restart-button').hover(function () {
    $(this).attr('src', 'res/ui/restart-button_hover.gif');
  }, function () {
    $(this).attr('src', 'res/ui/restart-button.png');
  })

  $('.restart-button').click(function () {
    // when died
    bird.y = 200;
    bird.gravity_speed = -2 * setting.calc;
    bird.rotate = 0;
    bird.state = 'fly';
    bird.ability_cool = 1;
    bird.stat.speed = 1;
    bird.stat.size = 1;
    bird.stat.ability_cooldown = 1;
    bird.stat.item_cooldown = 1;
    bird.stat.redbrick = 1;
    bird.stat.max_cool = 2000;
    bird.stat.power = 1;
    bird.stat.jump = 1;
    bird.health = 20;
    bird.item = [];
    bird.immune = false;
    $('.items').empty();
    setting.high_score = setting.score > setting.high_score ? setting.score : setting.high_score;
    setting.score = 0;
    $('#bird').css('bottom', bird.y + 'px');
    $('#bird').css('transform', 'rotate(' + bird.rotate + 'deg)');
    $('.game-over').css('display', 'none');
    $('.raser').remove();
    // $('.raser-end').remove();
    $('.entity').remove();
    entitys = [];
  })

  onkeydown = function (e) {
    if(e.keyCode == 32 && bird.state == 'fly' && !pause) {
      if(bird.state == 'fly' && bird.y > 0 && bird.y <= 400) {
        bird.gravity_speed = -2 * setting.calc * bird.stat.jump;
        bird.rotate -= 5;
      }
      if(bird.ability_cool <= 0) {
        if(bird.ability == 'raser') {
          $('#bird').animate({
            left: '-=6px',
          }, 50, function () {$('#bird').animate({
            left: '+=6px',
          }, 450)});
          bird.gravity_speed = -1 * setting.calc * bird.stat.jump;
          bird.url = 'raser-bird.png';
          this.setTimeout(function () {bird.url = 'normal-bird.png'}, 500*bird.stat.redbrick);
          bird.ability_cool = bird.stat.max_cool * bird.stat.ability_cooldown;
          var raser = $('<div class="raser"></div>');
          raser.css('position', 'absolute');
          raser.css('z-index', '-1');
          raser.css('left', ($('#bird').width()+106)+'px');
          // raser.css('transform', 'rotate(' + bird.rotate + 'deg)');
          raser.css('width', '700px');
          raser.css('height', (24*bird.stat.size)+'px');
          raser.css('background-color', '#fff');
          if(getid(bird.item, 'ice_glass')) {
            raser.css('transform-origin', 'left center');
            raser.css('transform', 'rotate(' + bird.rotate + 'deg)');
          } else {
            var raser_rebound = setInterval(function () {
              bird.rotate -= (bird.rotate%360)/8;
            }, 1)
            this.setTimeout(function() {clearInterval(raser_rebound)}, 50);
          }
          $(function live_raser() {raser.animate({
            opacity: '-=0.5',
          }, 100, function () {
            live_raser();
            raser.css('opacity', '+=0.5');
          })});
          // var raser_end = $('<img class="raser-end" src="res/raser-end.gif"></img>');
          // raser_end.css('right', '0px');
          // raser_end.css('position', 'absolute');
          // raser_end.css('z-index', '0');
          // raser_end.css('height', '36px');
          $('.space').append(raser);
          // $('.space').append(raser_end);
          setTimeout(function () {
            raser.remove();
            // raser_end.remove();
          }, 500 * bird.stat.redbrick);
        }
      }
    }
    if(bird.state == 'die' && e.keyCode == 32) {
      $('.restart-button').click()
    }
    // when 'esc' is pressed, pause the game
    if(e.keyCode == 27) {
      $('.pause-button').click()
    }
  }

  $('.pause-button').click(function() {
    if(!pause) {
      pause = true;
      clearInterval(tick);
      clearInterval(frame);
      $(this).attr('src', 'res/ui/pause_button_pressed.png');
      $('.space').css('pointer-events', 'none');
      $('.space').css('opacity', '0.5');
      $('.space-border').css('opacity', '0.5');
    } else {
      pause = false;
      tick = setInterval(tickfunction, setting.calc);
      frame = setInterval(framefunction, setting.frame);
      $(this).attr('src', 'res/ui/pause_button.png');
      $('.space').css('pointer-events', 'auto');
      $('.space').css('opacity', '1');
      $('.space-border').css('opacity', '1');
    }
  })
}