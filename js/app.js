function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum);
            break;
        default:
            return 0;
            break;
    }
}

function getEnemyX(x) {
    var enemyX = parseInt(x)+60;
    // console.log("locate enemy.x:"+enemyX);
    if(enemyX < 0 || enemyX > 101*5){
        return -1;
    }else if(enemyX>=0 && enemyX<=101*1){
        enemyX = 0;
        return enemyX;
    }else if(enemyX>101*1 && enemyX<=101*2){
        enemyX = 101*1;
        return enemyX;
    }else if(enemyX>101*2 && enemyX<=101*3){
        enemyX = 101*2;
        return enemyX;
    }else if(enemyX>101*3 && enemyX<=101*4){
        enemyX = 101*3;
        return enemyX;
    }else if(enemyX>101*4 && enemyX<=101*5) {
        enemyX = 101 * 4;
        return enemyX;
    }
}

// 这是我们的玩家要躲避的敌人
var Enemy = function(startX=randomNum(10)-10,startRow=randomNum(3)) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = startX*101;
    this.y = startRow*83;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x+=101*dt;
    if(this.x>101*4){
        this.x  = 0-101* Math.random()*5;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(startX=101*2,startY=83*4){
    this.x = startX;
    this.y = startY
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    checkCollisions();
    setTimeout(checkResult,1000);

}

var isPlay = true;
function checkResult() {
    if(player.y==0 && isPlay){
        var confirmOption = confirm("Congratulation! 再玩一次!");
       if(confirmOption){
           player.x= 101*2;
           player.y = 83*4;
           allEnemies.forEach(function(enemy) {
               enemy.x = (randomNum(10)-10)*101;
               enemy.render();
           });
           player.render();
       }else {
           isPlay = false;
       }
    }
}

function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        var enemyX = getEnemyX(enemy.x);

        if(enemyX == player.x && enemy.y == player.y){
            // console.log("撞上了");
            //回到开始位置
            player.x  = 101*2;
            player.y =83*4;
        }
    });
}


Player.prototype.handleInput = function (key) {
    switch(key){
        case 'left':
            if(this.x>=101){
                this.x -= 101;
            }else {
                console.log("locate x超出游戏范围");
            }
            break;
        case 'up':
            if(this.y>=83){
                this.y -= 83;
            }else {
                console.log("locate y超出游戏范围");
            }
            break;
        case 'right':
            if(this.x<=101*3){
                this.x += 101;
            }else {
                console.log("locate x超出游戏范围");
            }
            break;
        case 'down':
            if(this.y<=83*4){
                this.y += 83;
            }else {
                console.log("locate y超出游戏范围");
            }
            break;
    }
    isPlay = true;
    this.render();

    // console.log("locate x:"+this.x+" y:"+this.y);

}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [new Enemy, new Enemy, new Enemy,new Enemy, new Enemy, new Enemy];  //TODO 根据游戏关卡设置数量、速度
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
