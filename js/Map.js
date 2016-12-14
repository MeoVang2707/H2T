class Map {
  constructor() {
    // create wall
    for (var i=0; i < 15; i++){
      var wall = Nakama.platforms.create(0, i*48, 'wall');
      wall.body.immovable = true;
      wall.health = 9999999;
      wall = Nakama.platforms.create(960, i*48, 'wall');
      wall.body.immovable = true;
      wall.health = 9999999;
    }
    for (var i=0; i < 21; i++){
      var wall = Nakama.platforms.create(i*48, 0, 'wall');
      wall.body.immovable = true;
      wall.health = 9999999;
      wall = Nakama.platforms.create(i*48, 672, 'wall');
      wall.body.immovable = true;
      wall.health = 9999999;
    }
    for (var i=2; i <13; i +=2 ){
      for(var j=2; j <19; j +=2 ){
        var wall = Nakama.platforms.create(j*48, i*48, 'wall');
        wall.body.immovable = true;
        wall.health = 9999999;
      }
    }

    var treasure = Nakama.treasures.create(912, 624, 'treasure');
    treasure.body.immovable = true;
    treasure.health = 9999999;
    // create stone
    for (var i = 1; i < 14; i++){
      for (var j = 1; j < 20; j++) {
        if (i%2 == 0 && j%2 ==0) {
          continue;
        }
        if ((i < 3 && j< 3) || (i>11 && j >17)){
          continue;
        }
        var x= Math.random()*10 + 1;
        if (x < 1.1){
          var enemy = new Enemy(48*j, 48*i);
          if (j % 2 ==0){
            enemy.sprite.body.velocity.setTo(50,0);
          }
          else if(i % 2 ==0) {
            enemy.sprite.body.velocity.setTo(0,50);
          }
        }
        else if (x < 7){
          continue;
        }
        else {
          var stone = Nakama.platforms.create(48*j, 48*i, 'stone');
          stone.health = 1;
          stone.body.immovable = true;
        }
      }
    }
  }
}
