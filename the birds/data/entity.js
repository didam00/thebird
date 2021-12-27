data.entity = [
  {
    id: 'bat',
    name: 'Bat',
    health: 2,
    speed: 1,
    url: 'bat.gif',
    width: 16,
    height: 6,
    attack: 2,
  },
  {
    id: 'emerald_bat',
    name: 'Emerald Bat',
    url: 'emerald_bat.gif',
    health: 8,
    speed: 0.5,
    width: 18,
    height: 7,
    attack: 3,
    cool: 2000,
    func(o) {
      o.speed = -2;
      setTimeout(function () {
        o.speed = 25;
      }, 500)
    }
  },
  {
    id: 'princess_bunny',
    name: 'Princess Bunny',
    health: 45,
    speed: 0,
    url: 'princess_bunny.png',
    width: 18,
    height: 36,
    attack: 3,
    cool: 2500,
    func(o) {
      var a = entitys.filter(a => a.data.id == 'princess_bunny')[0]
      summon('princess_bunny-bella', a.position.x-30, a.position.y);
    }
  },
  {
    id: 'princess_bunny-bella',
    name: 'Princess Bunny Bella',
    health: 1,
    speed: 3,
    url: 'princess_bunny-bella.gif',
    width: 7,
    height: 8,
    attack: 0,
    cool: 1,
    func(o) {
      var a = entitys.filter(a => a.data.id == 'princess_bunny-bella')[0];
      if(a.position.y < bird.y) {
        a.position.y += 0.35;
      } else if(a.position.y > bird.y) {
        a.position.y -= 0.35;
      }
    },
    when_die: function (o) {
      var a = entitys.filter(a => a.data.id == 'princess_bunny-bella')[0]
      summon('heart_bomb', a.position.x, a.position.y);
    },
    weak: true,
  },
  {
    id: 'heart_bomb',
    name: 'Heart Bomb',
    health: 9999,
    speed: 0,
    url: 'heart_bomb.gif',
    width: 36,
    height: 43,
    attack: 8,
  },
  {
    id: 'blue_bird',
    name: 'Blue Bird',
    url: 'blue_bird_reverse.png',
    health: 25,
    speed: 1,
    width: 17,
    height: 12,
    attack: 8,
    cool: 1,
    func(o) {
      if(bird.y > 21) {
        o.position.y = bird.y;
        o.element.css('transform', 'rotate(-'+(bird.rotate)+'deg)');
      } else {
        o.element.css('transform', 'rotate(0deg)');
      }
    },
    when_die(o) {
      setting.score += 250;
    },
  },
  {
    id: 'boom_fly',
    name: 'Boom Fly',
    health: 60,
    speed: 0,
    url: 'boom_fly.gif',
    width: 25,
    height: 27,
    attack: 8,
    cool: 1200,
    func(o) {
      var a = entitys.filter(a => a.data.id == 'boom_fly')[0];
      summon('flyboom', a.position.x-6, a.position.y+3);
    },
    when_die: function (o) {
      var a = entitys.filter(a => a.data.id == 'boom_fly')[0];
      summon('flyboom', a.position.x-6, a.position.y+3);
      summon('flyboom', a.position.x-6, a.position.y+3);
      summon('flyboom', a.position.x-6, a.position.y+3);
      summon('flyboom', a.position.x-6, a.position.y+3);
      summon('flyboom', a.position.x-6, a.position.y+3);
    },
  },
  {
    id: 'flyboom',
    name: 'Fly Boom',
    health: 1,
    speed: 0.5,
    url: 'flyboom.gif',
    width: 10,
    height: 10,
    attack: 1,
    weak: true,
  },
  {
    id: 'white-box',
    name: 'White Box',
    health: 1,
    speed: 0,
    url: 'white-box.gif',
    height: 12,
    width: 10,
    attack: 0,
    when_die: function (o) {
      if(getid(bird.item, 'aid_kit')) {
        if(Math.random() < 0.5) {
          $('.health').css('display', 'none');
          setTimeout(function () {
            $('.health').css('display', 'block');
            setTimeout(function () {
              $('.health').css('display', 'none');
              setTimeout(function () {
                $('.health').css('display', 'block');
              }, 50)
            }, 50)
          }, 50)
          bird.health += 1;
        }
      }
      getitem(ran(['blue_spike', 'red_brick', 'moreshroom', 'rocket_toy', 'emerald_timer', 'lesshroom', 'yellow_eyeball', 'loud_speaker', 'turtle_shell', 'magic_mushroom', 'trampoline', 'aid_kit']));
    },
    weak: true,
  },
]

function ran(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}