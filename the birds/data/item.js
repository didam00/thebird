data.item = [
  {
    id: 'moreshroom',
    name: 'Moreshroom',
    url: 'moreshroom.png',
    description: 'bird size up!',
    when_get: function () {
      bird.stat.size += 0.2;
    },
  },
  {
    id: 'giant_doll',
    name: 'Giant Doll',
    url: 'giant_doll.png',
    description: 'bird be giant.',
    when_get: function () {
      bird.stat.size = 3;
      bird.stat.jump = 2;
      bird.health += 15;
    },
  },
  {
    id: 'lesshroom',
    name: 'Lesshroom',
    url: 'lesshroom.png',
    description: 'bird size down!',
    when_get: function () {
      bird.stat.size -= 0.2;
    },
  },
  {
    id: 'blue_spike',
    name: 'Blue Spike',
    url: 'blue_spike.png',
    description: 'speed up!', // 10초마다 속도가 아주 잠깐 미친듯이 증가
    cool_end: function () {
      bird.stat.speed += 25;
      bird.immune = true;
      bird.url = 'blue-bird.png';
      setTimeout(function () {
        bird.stat.speed -= 25;
        bird.immune = false;
        bird.url = 'normal-bird.png';
      }, 200)
    },
    cool: 10000,
  },
  {
    id: 'turtle_shell',
    name: 'Turtle Shell',
    url: 'turtle_shell.png',
    description: 'speed down!',
    when_get: function () {
      bird.stat.speed -= 0.2;
    },
  },
  {
    id: 'ice_glass',
    name: 'Ice Glass',
    url: 'ice_glass.png',
    description: '-', // 레이저가 보는 방향으로 나갑니다, 부딪힌 벽에서 직각으로 반사됩니다.
    when_get: function () {
      
    },
  },
  {
    id: 'magic_mushroom',
    name: 'Magic Mushroom',
    url: 'magic_mushroom.png',
    description: 'you looks more beautiful?', // 무적 시간 증가, 33% 확률로 두배의 데미지인 보라색 레이저 발사, 15초마다 무작위로 속도가 느려지거나 빨라짐
    when_get: function () {
      bird.stat.magic_mushroom += 200;
    },
    cool: 15000,
    cool_end() {
      if(Math.random() < 0.5) {
        bird.stat.speed += 0.25
      } else {
        bird.stat.speed -= 0.25
      }
    }
  },
  {
    id: 'red_brick',
    name: 'Red Brick',
    url: 'red_brick.png',
    description: '-', // 레이저 등의 지속 시간 증가
    when_get: function () {
      bird.stat.redbrick += 0.66;
      bird.stat.ability_cooldown += 0.5;
    },
  },
  {
    id: 'aid_kit',
    name: 'Aid Kit',
    url: 'aid_kit.png',
    description: '-', // 체력 2 회복, 상자를 먹을 시 일정 확률로 체력이 회복됩니다
    when_get: function () {
      bird.health += 2;
    },
  },
  {
    id: 'trampoline',
    name: 'Trampoline',
    url: 'trampoline.png',
    description: '-', // 가시 위에서 50% 확률로 점프
  },
  {
    id: 'emerald_timer',
    name: 'Emerald Timer',
    url: 'emerald_timer.png',
    description: '-', // 아이템 쿨타임 감소
    when_get: function () {
      bird.stat.item_cooldown -= 0.25;
    },
  },
  {
    id: 'yellow_eyeball',
    name: 'Yellow Eyeball',
    url: 'yellow_eyeball.png',
    description: '-', // 능력 발동 쿨타임 감소. 25초마다 쿨타임 초기화
    cool: 25000,
    when_get() {
      bird.stat.ability_cooldown -= 0.2;
    },
    cool_end() {
      bird.ability_cool = 1;
    }
  },
  {
    id: 'loud_speaker',
    name: 'Loud Speaker',
    url: 'loud_speaker.png',
    description: '-', // 레이저의 두께 증가
    when_get() {
      bird.stat.speaker += 0.5;
    },
  },
  {
    id: 'rocket_toy',
    name: 'Rocket Toy',
    url: 'rocket_toy.png',
    description: 'it will take you the Dream.', // 가끔씩 무적 상태로 돌진 가능.
    cool_end: function () {
      bird.url = 'dreaming-bird.png';
      bird.state = 'dream';
      bird.width = 19*3;
      // bird.width = 23*3;
      // bird.height = 16*3;
      bird.stat.speed += 6;
      var dreaming = setInterval(function () {bird.rotate = 0;}, 1)
      setTimeout(function () {
        bird.url = 'normal-bird.png'
        bird.state = 'fly';
        bird.stat.speed -= 6;
        bird.width = 17*3;
        bird.height = 12*3;
        bird.immune = true;
        clearInterval(dreaming)
        setTimeout(function () {
          bird.immune = false;
        }, 2000)
      }, 5000)
    },
    cool: 30000,
  },
]