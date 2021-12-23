function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


(function () {
  var $slides = document.querySelectorAll('.slide');
  var $controls = document.querySelectorAll('.slider__control');
  var numOfSlides = $slides.length;
  var slidingAT = 1300; // sync this with scss variable
  var slidingBlocked = false;

  [].slice.call($slides).forEach(function ($el, index) {
    var i = index + 1;
    $el.classList.add('slide-' + i);
    $el.dataset.slide = i;
  });

  [].slice.call($controls).forEach(function ($el) {
    $el.addEventListener('click', controlClickHandler);
  });

  function controlClickHandler() {
    if (slidingBlocked) return;
    slidingBlocked = true;

    var $control = this;
    var isRight = $control.classList.contains('m--right');
    var $curActive = document.querySelector('.slide.s--active');
    var index = +$curActive.dataset.slide;
    (isRight) ? index++ : index--;
    if (index < 1) index = numOfSlides;
    if (index > numOfSlides) index = 1;
    var $newActive = document.querySelector('.slide-' + index);

    $control.classList.add('a--rotation');
    $curActive.classList.remove('s--active', 's--active-prev');
    document.querySelector('.slide.s--prev').classList.remove('s--prev');

    $newActive.classList.add('s--active');
    if (!isRight) $newActive.classList.add('s--active-prev');


    var prevIndex = index - 1;
    if (prevIndex < 1) prevIndex = numOfSlides;

    document.querySelector('.slide-' + prevIndex).classList.add('s--prev');

    setTimeout(function () {
      $control.classList.remove('a--rotation');
      slidingBlocked = false;
    }, slidingAT * 0.75);
  };
}());




//слайдер тайма
let position = 100;
const sliderItem = document.querySelector('.slider-line');
const titleWeek1 = document.querySelector('.name_current_week1');
const titleWeek2 = document.querySelector('.name_current_week2');
const titleWeek3 = document.querySelector('.name_current_week3');

document.querySelector('.right_arrow_week').addEventListener('click', function(){
  position = position + 100;
  if (position > 200) {
    position = 0;
    sliderItem.style.transition = 'all ease 0.2s';
  }
  if (position > 0) {
  sliderItem.style.transition = 'all ease 1s';
  }
  if (position == 0) {
    titleWeek3.style.opacity = '0';
    titleWeek1.style.opacity = '1';
  }
  if (position == 100) {
    titleWeek1.style.opacity = '0';
    titleWeek2.style.opacity = '1';
  }
  if (position == 200) {
    titleWeek2.style.opacity = '0';
    titleWeek3.style.opacity = '1';
  }
  sliderItem.style.left = -position + 'vw';
});


document.querySelector('.left_arrow_week').addEventListener('click', function(){
  position = position - 100;
  if (position < 0) {
    position = 200;
    sliderItem.style.transition = 'all ease 0.2s';
  }
  if (position < 200) {
    sliderItem.style.transition = 'all ease 1s';
  }
  if (position == 0) {
    titleWeek2.style.opacity = '0';
    titleWeek1.style.opacity = '1';
  }
  if (position == 100) {
    titleWeek3.style.opacity = '0';
    titleWeek2.style.opacity = '1';
  }
  if (position == 200) {
    titleWeek1.style.opacity = '0';
    titleWeek3.style.opacity = '1';
  }
  sliderItem.style.left = -position + 'vw';
});

