const canvas = document.getElementById('game')
const context = canvas.getContext('2d')
const heart1 = document.querySelector('.img-life1');
const heart2 = document.querySelector('.img-life2');
const heart3 = document.querySelector('.img-life3');
const die = document.querySelector('.die');
const takeLife = document.querySelector('.takeLife');
const tryAgain = document.querySelector('.tryAgain');

let life = 3; // количество жизней

let aster = []; // инициализация литерала массива астероидов
let fire = [];  // инициализация литерала массива выстрелов
let expl = [];  // инициализация литерала массива взрывов
let timer = 0; // начальная позиция таймера пуша литерала массива астероидов
let ship = { x: 550, y: 500 }; // инициализация начального позиционирования корабля

// инициализация констант картинок и их подключение
const asteroid = new Image();
asteroid.src = 'asteroid1.png';

const explosionImage = new Image();
explosionImage.src = 'boom.png'

const fireImage = new Image();
fireImage.src = 'shoot.png';

const shipImage = new Image();
shipImage.src = 'ship.png';

const backgroundImage = new Image();
backgroundImage.src = 'background.jpg';

// пуш литерала массива выстрелов при клике
document.addEventListener('click', function () {
    fire.push({
        x: ship.x + 20,
        y: ship.y - 30,
        dx: 0,
        dy: -5.2,
        animatx: 2,
        animaty: 0
    });
});

// забрал жизнь
takeLife.addEventListener('click', function () {
    requestAnimationFrame(game);
    die.style.opacity = '0'; die.style.zIndex = '-1';
    takeLife.style.opacity = '0'; takeLife.style.zIndex = '-20';
    aster = [];
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

backgroundImage.onload = function () {
    game();
}

// запуск всех функций
function game() {
    update();
    render();
    requestAnimationFrame(game);
}

function update() {
    // пуш литерала массива по таймеру
    timer++;
    if (timer % 10 == 0) {
        aster.push({
            x: Math.random() * 1100,
            y: -100,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 5,
            animationx: 0,
            animationy: 0
        })
    };

    // физика астероида
    for (i in aster) {
        aster[i].x = aster[i].x + aster[i].dx;
        aster[i].y = aster[i].y + aster[i].dy;
        aster[i].animationx = aster[i].animationx + 0.4;
        if (aster[i].animationx > 8) { aster[i].animationy++; aster[i].animationx = 0 };

        // границы отскока и удаления астероида
        if (aster[i].x > 1100 || aster[i].x < -25) { aster[i].dx = -aster[i].dx };
        if (aster[i].y >= 600) { aster.splice(i, 1) };

        //перебор астероидов для удаление из литерала массива
        for (j in fire) {
            if (Math.abs(aster[i].x + 40 - fire[j].x - 15) < 30 && Math.abs(aster[i].y - fire[j].y) < 25) {
                expl.push({ x: aster[i].x - 60, y: aster[i].y - 30, animx: 0, animy: 0 });
                aster[i].del = 1;
                fire.splice(j, 1);
                aster.splice(i, 1);
                break;
            }
        }

        //анимация взрывов метеоритов
        for (i in expl) {
            expl[i].animx = expl[i].animx + 0.1;
            if (expl[i].animx > 5) { expl[i].animy++; expl[i].animx = 0 };
            if (expl[i].animy > 5) { expl.splice(i, 1) };
        }

        //столкновение с метеора с кораблем и потери жизней
        if (Math.abs(ship.x + 0 - aster[i].x) < 40 && Math.abs(ship.y - aster[i].y) < 40) {
            life = life - 1;
            function endLife() {
                if (life == 2) {
                    heart1.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    takeLife.style.opacity = '1'; takeLife.style.zIndex = '3';
                    cancelAnimationFrame();
                };
                if (life == 1) {
                    heart2.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    takeLife.style.opacity = '1'; takeLife.style.zIndex = '3';
                    cancelAnimationFrame();
                };
                if (life == 0) {
                    heart3.style.display = 'none';
                    die.style.opacity = '1'; die.style.zIndex = '3';
                    tryAgain.style.opacity = '1'; tryAgain.style.zIndex = '3';
                    cancelAnimationFrame();
                    life = 3;
                };
            };
            endLife()
        }
    }
    // физика выстрела---позиция выстрела + скорости выстрела
    for (i in fire) {
        fire[i].x = fire[i].x + fire[i].dx;
        fire[i].y = fire[i].y + fire[i].dy;
        fire[i].animatx = fire[i].animatx + 0.14;
        if (fire[i].animatx > 4) { fire[i].animaty++; fire[i].animatx = 0 };

        // границы выстрела при котором он исчезает 
        if (fire[i].y <= -50) { fire.splice(i, 1) };
    }
}

// рендеринг картинок
function render() {
    context.drawImage(backgroundImage, 0, 0, 1200, 600);
    context.drawImage(shipImage, ship.x, ship.y, 80, 80);
    for (i in fire) context.drawImage(fireImage, 190.6 * Math.floor(fire[i].animatx), 185.8 * Math.floor(fire[i].animaty), 190.6, 185.8, fire[i].x, fire[i].y, 30, 30);
    for (i in aster) context.drawImage(asteroid, 128 * Math.floor(aster[i].animationx), 128 * Math.floor(aster[i].animationy), 128, 128, aster[i].x, aster[i].y, 80, 80);
    for (i in expl) context.drawImage(explosionImage, 192 * Math.floor(expl[i].animx), 192 * Math.floor(expl[i].animy), 192, 192, expl[i].x + 50, expl[i].y + 10, 100, 100);
}
