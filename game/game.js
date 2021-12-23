const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const heart1 = document.querySelector('.img-life1');
const heart2 = document.querySelector('.img-life2');
const heart3 = document.querySelector('.img-life3');
const die = document.querySelector('.die');
const takeLife = document.querySelector('.takeLife');
const tryAgain = document.querySelector('.tryAgain');
const cash = document.querySelector('.cash');

let life = 3; // количество жизней

let enemy = []; // массив врага
let fire = [];  // массив выстрелов
let fireEnemy = []; // массив выстрелов врага
let expl = [];  // массив взрывов
let boss = []; // босс
let enemyCounter = 0; // таймер игры
let ship = { x: 550, y: 500 }; // начальное позиционирование корабля
let killEnemy = 0; // деньги
let shipWidth = 80;
let shipHeight = 80;
let bossLife = 50;

// подключение картинок
const enemyImage = new Image();
enemyImage.src = 'enemy1.png';

const bossImage = new Image();
bossImage.src = 'boss.png';

const enemyFireImage = new Image();
enemyFireImage.src = 'shoot1Enemy.png';

const explosionImage = new Image();
explosionImage.src = 'boom.png'

const fireImage = new Image();
fireImage.src = 'shoot.png';

const shipImage = new Image();
shipImage.src = 'ship.png';

const backgroundImage = new Image();
backgroundImage.src = 'background.jpg';


document.addEventListener('click', function () {
    fire.push({
        x: ship.x + 25,
        y: ship.y - 30,
        dx: 0,
        dy: -5.2,
        animatx: 2,
        animaty: 0
    });
});

let transform = 0;
// потеря жизни
takeLife.addEventListener('click', function () {
    transform = transform + 1;
    if (transform == 1) {
        document.querySelector('.line').style.animationName = 'startTransform2';
    } else {
        document.querySelector('.line').style.animationName = 'startTransform';
    }
    requestAnimationFrame(game);
    die.style.opacity = '0'; die.style.zIndex = '-1';
    takeLife.style.opacity = '0'; takeLife.style.zIndex = '-20';
    shipWidth = 80;
    shipHeight = 80;
    document.querySelector('.endHeart').style.animationName = 'startHeart';
    enemy = [];
    fireEnemy = [];
});

// попробуй снова
tryAgain.addEventListener('click', function () {
    requestAnimationFrame(game);
    location.reload();
});


// отслеживание курсора мыши для позиционирование корабля
canvas.addEventListener('mousemove', function (event) {
    ship.x = event.offsetX - 50;
    ship.y = event.offsetY - 50;
});

// запуск главной функции после прогрузки бекграуда
backgroundImage.onload = function () {
    game();
}

let rec;

// запуск всех функций
function game() {
    update();
    render();
    rec = requestAnimationFrame(game);
}

function update() {
    //NOTE пуш массива enemy по таймеру enemyCounter
    enemyCounter++;
    //TODO первая волна 
    if (enemyCounter == 50 || enemyCounter == 150 || enemyCounter == 250 || enemyCounter == 350 || enemyCounter == 450
        || enemyCounter == 550 || enemyCounter == 650 || enemyCounter == 750 || enemyCounter == 850) {
        enemy.push({
            x: 100,
            y: -100,
            dx: 0, // смещение
            dy: 2, // скорость
            animationx: 0,
            animationy: 0
        });
    };
    //TODO вторая волна, несколько врагов сразу через промежуток posX
    if (enemyCounter == 2000) {
        let = posX = 0;
        let possition = function () {
            posX = posX + 100;
            if (posX <= 700) {
                enemy.push({
                    x: posX,
                    y: -100,
                    dx: 0, // смещение
                    dy: 1, // скорость
                    animationx: 0,
                    animationy: 0
                });
            } else {
                clearInterval(int);
            };
        };
        let int = setInterval(possition, 10);
    };
    //TODO третья волна
    if (enemyCounter == 3000) {
        let = posX = 200;
        let possition = function () {
            posX = posX + 100;
            if (posX <= 900) {
                enemy.push({
                    x: posX,
                    y: -100,
                    dx: 0, // смещение
                    dy: 1, // скорость
                    animationx: 0,
                    animationy: 0
                });
            } else {
                clearInterval(int);
            };
        };
        let int = setInterval(possition, 10);
    };
    //TODO четвертая волна
    if (enemyCounter == 4000) {
        let = posX = -100;
        let = posX2 = 1250;
        let possition = function () {
            posX = posX - 100;
            posX2 = posX2 + 100;
            if (posX > -800 && posX2 < 1750) {
                enemy.push({
                    x: posX,
                    y: -200,
                    dx: 1.7, // смещение
                    dy: 0.7, // скорость
                    animationx: 0,
                    animationy: 0
                });
                enemy.push({
                    x: posX2,
                    y: -200,
                    dx: -1.7, // смещение
                    dy: 0.7, // скорость
                    animationx: 0,
                    animationy: 0
                });
            } else {
                clearInterval(int);
            };
        };
        let int = setInterval(possition, 10);
    };
    //TODO добавление босса
    if (enemyCounter == 4900) {
        document.querySelector('.boss').style.animationName = 'boss';
    };
    if (enemyCounter == 5000) {
        boss.push({
            x: 500,
            y: 20,
            dx: 0, // смещение
            dy: 0, // скорость
            animationx: 0,
            animationy: 0
        });
    };

    // физика босса и его смерть
    for (i in boss) {
        boss[i].x = boss[i].x + boss[i].dx;
        boss[i].y = boss[i].y + boss[i].dy;
        for (j in fire) {
            if (Math.abs(boss[i].x + 85 - fire[j].x) < 90 && Math.abs(boss[i].y - fire[j].y) < 100) {
                if (bossLife >= 1) {
                    expl.push({ x: boss[i].x, y: boss[i].y + 20, animx: 0, animy: 0 });
                    bossLife = bossLife - 1;
                    expWidth = 100;
                    expHeight = 100;
                    fire.splice(j, 1);
                }
                if (bossLife == 0) {
                    expl.push({ x: boss[i].x -50, y: boss[i].y - 30, animx: 0, animy: 0 });
                    expl.push({ x: boss[i].x -100, y: boss[i].y - 30, animx: 0, animy: 0 });
                    expl.push({ x: boss[i].x -50, y: boss[i].y + 10, animx: 0, animy: 0 });
                    expWidth = 200;
                    expHeight = 200;
                    killEnemy = killEnemy + 500;
                    let calculateCash = 0 + killEnemy;
                    let newCash = String(calculateCash) + ' $';
                    cash.innerHTML = newCash;
                    boss.splice(i, 1);
                    fire.splice(j, 1);
                    document.querySelector('.win').style.animationName = 'boss';
                };
                break;
            }
        }
    };
    // физика движения врагов, перебор ключей каждого элемента массива enemy 
    for (a in enemy) {
        // удаление из массива врагов при вылете за пределы canvas 
        if (enemy[a].y >= 700) { enemy.splice(a, 1); } // bottom
        else if (enemy[a].x >= 2000) { enemy.splice(a, 1); }; // right
    };
    for (i in enemy) {
        enemy[i].x = enemy[i].x + enemy[i].dx;
        enemy[i].y = enemy[i].y + enemy[i].dy;
        //NOTE логика движения врагов 
        //первая волна до enemyCounter 2000
        if (enemy[i].y >= 100 && enemyCounter < 2000) { enemy[i].dy = 0, enemy[i].dx = 1 };
        if (enemy[i].x >= 1000 && enemyCounter < 2000) { enemy[i].dx = 0, enemy[i].dy = 5 };
        //вторая волна enemyCounter 2150--3500
        if (enemyCounter == 2150) { enemy[i].dy = 0, enemy[i].dx = 1 };
        if (enemy[i].x >= 1100 && enemyCounter > 2000 && enemyCounter < 3500) { enemy[i].dy = 0, enemy[i].dx = -1 };
        if (enemy[i].x < 0 && enemyCounter > 2100 && enemyCounter < 3000) { enemy[i].dy = 0, enemy[i].dx = 1 };


        //NOTE удаление врагов и патронов при попадании выстрела корабля
        for (j in fire) {
            if (Math.abs(enemy[i].x + 40 - fire[j].x - 15) < 30 && Math.abs(enemy[i].y - fire[j].y) < 25) {
                expWidth = 100;
                expHeight = 100;
                expl.push({ x: enemy[i].x - 60, y: enemy[i].y - 20, animx: 0, animy: 0 });
                fire.splice(j, 1);
                enemy.splice(i, 1);
                killEnemy = killEnemy + 10;
                let calculateCash = 0 + killEnemy;
                let newCash = String(calculateCash) + ' $';
                cash.innerHTML = newCash;
                break;
            }
        }
        //NOTE столкновение с кораблем врага и потери жизней
        for (i in enemy) {
            if (Math.abs(ship.x + 0 - enemy[i].x) < 40 && Math.abs(ship.y - enemy[i].y) < 40) {
                expWidth = 100;
                expHeight = 100;
                expl.push({ x: enemy[i].x - 60, y: enemy[i].y - 20, animx: 0, animy: 0 });
                enemy.splice(i, 1);
                shipWidth = 0;
                shipHeight = 0;
                expl.push({ x: ship.x - 60, y: ship.y - 20, animx: 0, animy: 0 });
                life = life - 1;
                function endLife() {
                    if (life == 2) {
                        enemyCounter = 0;
                        heart1.style.display = 'none';
                        die.style.opacity = '1'; die.style.zIndex = '3';
                        takeLife.style.opacity = '1'; takeLife.style.zIndex = '3';
                        document.querySelector('.endHeart').style.animationName = 'endHeart';
                        cancelAnimationFrame(rec);
                    };
                    if (life == 1) {
                        enemyCounter = 0;
                        heart2.style.display = 'none';
                        die.style.opacity = '1'; die.style.zIndex = '3';
                        takeLife.style.opacity = '1'; takeLife.style.zIndex = '3';
                        document.querySelector('.endHeart').style.animationName = 'endHeart';
                        cancelAnimationFrame(rec);
                    };
                    if (life == 0) {
                        enemyCounter = 0;
                        heart3.style.display = 'none';
                        die.style.opacity = '1'; die.style.zIndex = '3';
                        tryAgain.style.opacity = '1'; tryAgain.style.zIndex = '3';
                        document.querySelector('.endHeart').style.animationName = 'endHeart';
                        cancelAnimationFrame(rec);
                        life = 3;
                    };
                };
                setTimeout(endLife, 700);
            }
        }
    }

    // анимация взрывов врагов
    for (i in expl) {
        expl[i].animx = expl[i].animx + 0.4;
        if (expl[i].animx > 5) { expl[i].animy++; expl[i].animx = 0 };
        if (expl[i].animy > 4) { expl.splice(i, 1) };
    };

    // физика выстрела---позиция выстрела + скорости выстрела корабля
    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx;
        fire[i].y = fire[i].y + fire[i].dy;
        fire[i].animatx = fire[i].animatx + 0.14;
        if (fire[i].animatx > 4) { fire[i].animaty++; fire[i].animatx = 0 };

        // границы выстрела при котором он исчезает 
        if (fire[i].y <= -50) { fire.splice(i, 1) };
    }

    //NOTE физика выстрела противника и смерь корабля из-за попадания патрона
    for (fi in fireEnemy) {
        if (fireEnemy[fi].y >= 700) { fireEnemy.splice(fi, 1) };
    }
    for (i in fireEnemy) {
        fireEnemy[i].x = fireEnemy[i].x + fireEnemy[i].dx;
        fireEnemy[i].y = fireEnemy[i].y + fireEnemy[i].dy;
        fireEnemy[i].animax = fireEnemy[i].animax + 0.14;
        if (fireEnemy[i].animax > 4) { fireEnemy[i].animay++; fireEnemy[i].animax = 0 };
        if (Math.abs(ship.x + 10 - fireEnemy[i].x) < 30 && Math.abs(ship.y - fireEnemy[i].y) < 30) {
            fireEnemy.splice(i, 1);
            shipWidth = 0;
            shipHeight = 0;
            life = life - 1;
            expWidth = 100;
            expHeight = 100;
            expl.push({ x: ship.x - 60, y: ship.y - 20, animx: 0, animy: 0 });
            function endLife() {
                if (life == 2) {
                    enemyCounter = 0;
                    heart1.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    takeLife.style.opacity = '1'; takeLife.style.zIndex = '3';
                    document.querySelector('.endHeart').style.animationName = 'endHeart';
                    cancelAnimationFrame(rec);
                };
                if (life == 1) {
                    enemyCounter = 0;
                    heart2.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    takeLife.style.opacity = '1'; takeLife.style.zIndex = '3';
                    document.querySelector('.endHeart').style.animationName = 'endHeart';
                    cancelAnimationFrame(rec);
                };
                if (life == 0) {
                    enemyCounter = 0;
                    heart3.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    tryAgain.style.opacity = '1'; tryAgain.style.zIndex = '3';
                    document.querySelector('.endHeart').style.animationName = 'endHeart';
                    cancelAnimationFrame(rec);
                    life = 3;
                };
            };
            setTimeout(endLife, 700);
        }
        // границы выстрела при котором он исчезает 
    }

    //NOTE  выстрелы врагов и босса
    for (i in enemy) {
        if (enemyCounter % 100 == 0) {
            fireEnemy.push({
                x: enemy[i].x + 10,
                y: enemy[i].y + 15,
                dx: 0,
                dy: Math.random() * 2 + 5,
                animax: 0,
                animay: 0
            });
        }
    }
    for (i in boss) {
        if (enemyCounter % 100 == 0 && yp == 10) {
            fireEnemy.push({
                x: boss[i].x + 80,
                y: boss[i].y + 100,
                dx: 0,
                dy: Math.random() * 2 + 5,
                animax: 0,
                animay: 0
            });
            fireEnemy.push({
                x: boss[i].x + 80,
                y: boss[i].y + 100,
                dx: Math.random() * (-10 + 1) - 1,
                dy: Math.random() * 2 + 5,
                animax: 0,
                animay: 0
            });
            fireEnemy.push({
                x: boss[i].x + 80,
                y: boss[i].y + 100,
                dx: Math.random() * (10 - 1) + 1,
                dy: Math.random() * 2 + 5,
                animax: 0,
                animay: 0
            });
            fireEnemy.push({
                x: boss[i].x + 80,
                y: boss[i].y + 100,
                dx: Math.random() * (-20 + 10) - 10,
                dy: Math.random() * 2 + 2,
                animax: 0,
                animay: 0
            });
            fireEnemy.push({
                x: boss[i].x + 80,
                y: boss[i].y + 100,
                dx: Math.random() * (20 - 10) + 10,
                dy: Math.random() * 2 + 2,
                animax: 0,
                animay: 0
            });
        }
        // потеря жизни при столкновенни с боссом
        if (Math.abs(ship.x - boss[i].x - 50) < 100 && Math.abs(ship.y - boss[i].y) < 100) {
            expWidth = 200;
            expHeight = 200;
            expl.push({ x: boss[i].x - 50, y: boss[i].y - 30, animx: 0, animy: 0 });
            boss.splice(i, 1);
            shipWidth = 0;
            shipHeight = 0;
            expl.push({ x: ship.x - 60, y: ship.y - 20, animx: 0, animy: 0 });
            life = life - 3;
            function endLife() {
                if (life == 0) {
                    heart1.style.display = 'none';
                    heart2.style.display = 'none';
                    heart3.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    tryAgain.style.opacity = '1'; tryAgain.style.zIndex = '3';
                    document.querySelector('.endHeart').style.animationName = 'endHeart';
                    cancelAnimationFrame(rec);
                    life = 3;
                };
            };
            setTimeout(endLife, 700);
        }
    }
}

let expWidth = 100;
let expHeight = 100;

// переменные для босса
let xp = 510; // начальная позиция
let yp = -200; // начальная позиция
let u = 1;
let angle = 0;

// рендеринг картинок
function render() {
    context.drawImage(backgroundImage, 0, 0, 1200, 600);
    context.drawImage(shipImage, ship.x, ship.y, shipWidth, shipHeight);
    // босс
    for (i in boss) {
        let drawBoss = function (xp, yp, w, h) {
            let dx = xp + w / 2; // определяем центр кручения
            let dy = yp + h / 2; // определяем центр кручения
            context.save();
            context.translate(dx, dy); // смещение центра
            context.rotate(angle); // градус
            context.translate(-dx, -dy); // смещение центра
            context.drawImage(bossImage, xp, yp, w, h); // отрисовка босса с параметрами
            context.restore();
        };
        angle = angle + 0.01; // смена градуса
        if (yp < 10) { // смена позиции 
            yp = yp + 3;
        }
        if (yp == 10) {
            yp == 10;
        }
        drawBoss(xp, yp, 180, 180); // запуск функции отрисовки с передачей аргументов
    };

    for (i in fire) context.drawImage(fireImage, 190.6 * Math.floor(fire[i].animatx), 185.8 * Math.floor(fire[i].animaty), 190.6, 185.8, fire[i].x, fire[i].y, 30, 30);
    for (i in enemy) context.drawImage(enemyImage, enemy[i].x, enemy[i].y, 80, 80);
    for (i in expl) context.drawImage(explosionImage, 192 * Math.floor(expl[i].animx), 192 * Math.floor(expl[i].animy), 192, 192, expl[i].x + 50, expl[i].y + 10, expWidth, expHeight);
    for (i in fireEnemy) context.drawImage(enemyFireImage, 133.8 * Math.floor(fireEnemy[i].animax), 134.2 * Math.floor(fireEnemy[i].animay), 133.8, 134.2, fireEnemy[i].x, fireEnemy[i].y, 60, 60);
};

