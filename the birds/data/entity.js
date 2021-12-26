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
    id: 'princess_bunny',
    name: 'Princess Bunny',
    health: 45,
    speed: -0.5,
    url: 'princess_bunny.png',
    width: 18,
    height: 36,
    attack: 3,
    cool: 2500,
    func() {
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
    func() {
      var a = entitys.filter(a => a.data.id == 'princess_bunny-bella')[0];
      if(a.position.y < bird.y) {
        a.position.y += 0.35;
      } else if(a.position.y > bird.y) {
        a.position.y -= 0.35;
      }
    },
    when_die: function () {
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
    id: 'boom_fly',
    name: 'Boom Fly',
    health: 60,
    speed: -0.8,
    url: 'boom_fly.gif',
    width: 25,
    height: 27,
    attack: 8,
    cool: 500,
    func() {
      var a = entitys.filter(a => a.data.id == 'boom_fly')[0];
      summon('flyboom', a.position.x-6, a.position.y+3);
    },
    when_die: function () {
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
    when_die: function () {
      getitem(ran(['blue_spike', 'red_brick', 'moreshroom', 'rocket_toy', 'emerald_timer', 'lesshroom', 'giant_doll']));
    }
  },
]

function ran(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}