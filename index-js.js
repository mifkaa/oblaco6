// let intervalId;
// const sliderGoBar = document.querySelectorAll('.sliderBox .progressbar .bar .goBar');

// function startTimer() {
//   sliderGoBar.forEach(goBar => {
//     goBar.classList.add('go')
//   });

//   intervalId = setInterval(() => {
//     if (flagSlid) {
//       flagSlid = false;
//       currentIndex += 1;


//       barIndex += 1;
//       barIndexPred = barIndex - 1;


//       if (barIndex == 8) {
//         barIndex = 0;
//       }
//       if (barIndexPred == 8) {
//         barIndexPred = 0;
//       }
//       progressBars[barIndexPred].classList.remove('open')

//       progressBars[barIndex].classList.add('open')




//       sliderPart.forEach(part => {
//         if (part.offsetLeft <= 0) {
//           part.style.opacity = 0;
//           part.style.left = 3150 + 'px';

//           setTimeout(() => { part.style.opacity = 1 }, 1000)
//         }
//         else {
//           part.style.left = part.offsetLeft - parteWidth + 'px'
//         }
//       });

//       if (currentIndex == 5) {
//         currentIndex = 0;
//       }


//       setTimeout(() => { flagSlid = true }, 1000)
//     }
//   }, 3000);
// }

// function stopTimer() {
//   clearInterval(intervalId);

//   sliderGoBar.forEach(goBar => {
//     goBar.classList.remove('go')
//   });
// }

// window.addEventListener('focus', startTimer);
// window.addEventListener('blur', stopTimer);

// // Запускаем при загрузке, если окно в фокусе
// if (document.hasFocus()) {
//   startTimer();
// }




console.log(window.innerWidth)


//x1.25
const body = document.querySelector('body')
const main = document.querySelector('main')
// const onPage = document.querySelector('#onPage');
const goOnTop = document.querySelector('.goOnTop');
// const opacityGoOnTop = window.getComputedStyle(goOnTop).opacity;


function pageHidden() {
  body.style.overflow = 'hidden';
  pageFirst.style.visibility = 'hidden';
  pageMain.style.visibility = 'hidden';
  pageFirst.style.opacity = '0';
  pageMain.style.opacity = '0';
  goOnTop.style.visibility = 'hidden';
}

function pageVisibility() {
  body.style.overflowY = 'auto';
  pageFirst.style.visibility = 'visible';
  pageMain.style.visibility = 'visible';
  pageFirst.style.opacity = '1';
  pageMain.style.opacity = '1';
  goOnTop.style.visibility = 'visible';

  // goOnTop.style.opacity = opacityGoOnTop;
}



// setTimeout(() => {
//       body.classList.remove('notShow');
// }, 1500)

// onPage.style.display = 'block'
// body.style.opacity = '0';
// setTimeout(() => {
// onPage.style.display = 'none'
// }, 3000)

const pageFirst = document.querySelector('#pageFerst')
const pageMain = document.querySelector('#pageMain')

const preloader = document.querySelector('.preLoader');
const splineBox = document.querySelector('.splineBox');
const splineViewer = document.querySelector('spline-viewer');


pageHidden();
// splineBox.style.visibility = 'hidden';
// splineBox.style.opacity = '0';

// onPage.style.display = 'block';
preloader.style.opacity = '1';
preloader.style.display = 'block';

// onPage.style.display = 'block'
// setTimeout(() => {
//     onPage.style.display = 'none'
// }, 500)
let preloaderHide = false;


document.addEventListener('DOMContentLoaded', () => {

  // 1. Функция скрытия прелоадера
  const hidePreloader = () => {
    if (preloaderHide === false) {
      preloaderHide = true;
      pageVisibility();

      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        }, 1100);
      // }, 1);
    }

  };
  // 2. Проверка загрузки Spline
  const checkSplineLoad = () => {
    return new Promise((resolve) => {
      // Вариант 1: Через событие progress
      const progressHandler = (e) => {
        if (e.detail.progress === 1) {
          splineViewer.removeEventListener('progress', progressHandler);
          resolve();
        }
      };
      splineViewer.addEventListener('progress', progressHandler);

      // Вариант 2: Резервная проверка canvas
      const backupCheck = setInterval(() => {
        const canvas = splineViewer.shadowRoot?.querySelector('canvas');
        if (canvas && canvas.width > 0) {
          clearInterval(backupCheck);
          resolve();
        }
        }, 2300);
      // }, 10);

      // Фолбек
      setTimeout(() => {
        splineViewer.removeEventListener('progress', progressHandler);
        clearInterval(backupCheck);
        resolve();
      }, 3000);
    });
  };

  // 3. Проверка загрузки всех ресурсов сайта
  const checkPageLoad = () => {
    return new Promise((resolve) => {
      // Проверяем загруженные изображения
      const images = Array.from(document.images);
      const loadedImages = images.filter(img => img.complete);

      if (loadedImages.length === images.length) {
        resolve();
      } else {
        let loadedCount = loadedImages.length;
        images.forEach(img => {
          img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === images.length) resolve();
          });
        });
      }

      // Дополнительная проверка через window.onload
      window.addEventListener('load', resolve);

      // Фолбек
      setTimeout(resolve, 2000);
    });
  };

  // 4. Запускаем проверки
  customElements.whenDefined('spline-viewer').then(async () => {
    await Promise.all([
      checkSplineLoad(),
      checkPageLoad(),
      checkFonts()
    ]);
    hidePreloader();
  });

  // Абсолютный фолбек на 5 секунд
  setTimeout(hidePreloader, 5000);
});


const checkFonts = () => {
  return document.fonts?.ready || Promise.resolve();
};









// document.addEventListener('DOMContentLoaded', () => {

//   // 1. Функция для скрытия прелоадера
//   const hidePreloader = () => {
//     preloader.style.opacity = '0';
//     setTimeout(() => {
//       preloader.style.display = 'none';
//     }, 1000);
//   };

//   // 2. Основная проверка загрузки Spline
//   const checkSplineLoad = () => {
//     // Вариант 1: Проверка через событие 'progress' (самый надежный)
//     splineViewer.addEventListener('progress', (e) => {
//       if (e.detail.progress === 1) { // 100% загрузка
//         hidePreloader();
//       }
//     });

//     // Вариант 2: Резервная проверка canvas (на случай если событие не сработает)
//     const backupCheck = setInterval(() => {
//       const canvas = splineViewer.shadowRoot?.querySelector('canvas');
//       if (canvas && canvas.width > 0) {
//         clearInterval(backupCheck);
//         hidePreloader();
//       }
//     }, 100);

//     setTimeout(() => {
//       clearInterval(backupCheck);
//       hidePreloader();
//     }, 3000);
//   };

//   // 3. Запускаем проверку после инициализации компонента
//   customElements.whenDefined('spline-viewer').then(checkSplineLoad);

//   // 4. На всякий случай, если компонент не загрузится
//   setTimeout(hidePreloader, 3000);
// });










// const loader = document.querySelector('.loader');
// const preLoaderFast = document.querySelector('.preLoaderFast');
// // const preLoaderNormal = document.querySelector('.preLoaderNormal');
// // const preLoaderLong = document.querySelector('.preLoaderLong');

// const preLoaderNormal = document.querySelector('.preLoaderFast');


// pageFerst.style.visibility = 'hidden';
// pageMain.style.visibility = 'hidden';
// pageFerst.style.opacity = '0';
// pageMain.style.opacity = '0';
// preLoaderNormal.style.opacity = '1';
// preLoaderNormal.style.display = 'block';

// // window.scrollTo({
// //   top: 0,
// //   behavior: 'smooth'
// // })
// body.style.overflow = 'hidden';


// // 1. Проверяем наличие класса Spline каждые 100ms
// function checkSplineLoaded() {
//   return new Promise((resolve) => {
//     const checkInterval = setInterval(() => {
//       // Ищем любой элемент с классом Spline (подставьте реальный класс)
//       if (document.querySelector('.spline-element') ||
//         document.querySelector('.spline-wrapper')) {
//         clearInterval(checkInterval);
//         resolve();
//       }
//     }, 100);

//     // На всякий случай таймаут 5 секунд
//     setTimeout(() => {
//       clearInterval(checkInterval);
//       resolve();
//     }, 7000);
//   });
// }

// // 2. Запускаем проверку
// async function init() {

//   // Ждем либо загрузку Spline, либо полную загрузку страницы
//   await Promise.race([
//     checkSplineLoaded(),
//     new Promise(resolve => window.addEventListener('load', resolve))
//   ]);

//   // Плавно скрываем прелоадер
//   setTimeout(() => {
//     preLoaderNormal.style.opacity = '0';
//     pageFerst.style.visibility = 'visible';
//     pageMain.style.visibility = 'visible';
//     pageFerst.style.opacity = '1';
//     pageMain.style.opacity = '1';
//     body.style.overflow = 'auto'

//     setTimeout(() => {
//       preLoaderNormal.style.display = 'none';
//     }, 1000);
//     // }, 2300)
//   }, 1)
// }

// init();








const labelSpans = document.querySelectorAll('.label span');
let indexLabel = 0;

labelSpans.forEach(span => {
  indexLabel += 1;
  span.style.animation = `labelAnimation 2s ease-in-out infinite ${indexLabel * 0.15}s`;
})



const scrolldown = document.querySelector('#pageFerst .scrolldown')
scrolldown.addEventListener('click', function () {
  window.scrollTo({
    top: 500,
    behavior: 'smooth'
  })
})





const kubeBlock = document.querySelector('.kubeBlock');
const kubeVideo = document.querySelector('.kubeBlock video');

kubeBlock.addEventListener('mousemove', (e) => {
  // Получаем размеры контейнера
  const rect = kubeBlock.getBoundingClientRect();

  // Координаты центра контейнера
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Позиция курсора относительно центра
  const mouseX = e.clientX - rect.left - centerX;
  const mouseY = e.clientY - rect.top - centerY;

  // Нормализуем значения (от -1 до 1)
  const normX = mouseX / centerX;
  const normY = mouseY / centerY;

  // Максимальное смещение (в пикселях)
  const maxOffset = 20;

  // Рассчитываем смещение (чем ближе к центру, тем меньше смещение)
  const offsetX = maxOffset * normX;
  const offsetY = maxOffset * normY;

  // Применяем смещение к картинке
  kubeVideo.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
});

// Возвращаем картинку на место, когда курсор уходит
kubeBlock.addEventListener('mouseleave', () => {
  kubeVideo.style.transform = 'translate(0, 0)';
});





const cloudBoardSpan = document.querySelector('.cloudBoard .text span')

cloudBoardSpan.addEventListener('mouseenter', function () {
  cloudBoardSpan.innerHTML = 'члены';
})

cloudBoardSpan.addEventListener('mouseleave', function () {
  cloudBoardSpan.innerHTML = 'отчеты';
})




const slider = document.querySelector('.slider')
const sliderPart = document.querySelectorAll('.slider .part')

const slidLeft = document.querySelector('.sliderBox .slidLeft')
const slidRight = document.querySelector('.sliderBox .slidRight')

const progressBars = document.querySelectorAll('.progressbar .bar')



let currentIndex = 0;
const parteWidth = sliderPart[0].offsetWidth + 30; // Ширина слайда + gap

let barIndex = 0;
let barIndexPred;

let flagSlid = true



const sliderBox = document.querySelector('.sliderBox');
let intervalId = null;
// let flagSlidInterval = true;

// Функция для запуска/остановки интервала
const toggleInterval = (isActive) => {
  if (isActive) {
    if (!intervalId) {
      intervalId = setInterval(() => {
        // console.log('Интервал работает!');
        setTimeout(() => {
          if (flagSlid) {
            setTimeout(() => {
              if (flagSlid) {

                slidRightFunc();
              }
            }, 50);
          }
        }, 50);

      }, 4500);
    }
  } else {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      // console.log('Интервал остановлен!');
    }
  }
};

// Intersection Observer для видимости в DOM
const observer = new IntersectionObserver((entries) => {
  toggleInterval(entries[0].isIntersecting);
}, { threshold: 0.1 });

observer.observe(sliderBox);

// Остановка интервала при сворачивании вкладки
document.addEventListener('visibilitychange', () => {
  toggleInterval(!document.hidden && sliderBox.checkVisibility());
});

// На случай, если вкладка закрывается
window.addEventListener('pagehide', () => {
  toggleInterval(false);
});

// let wd = 0

slidLeft.addEventListener('click', () => {

  if (flagSlid) {

    // slidLeft.classList.add('tap');
    // setTimeout(() => {
    //   slidLeft.classList.remove('tap');
    // }, 200)
    slidLeft.classList.add('click');
    setTimeout(() => {
      slidLeft.classList.remove('click');
    }, 200);

    currentIndex -= 1;

    flagSlid = false;
    barIndex -= 1;
    barIndexPred = barIndex + 1;


    if (barIndex == -1) {
      barIndex = 7;
    }
    if (barIndexPred == -1) {
      barIndexPred = 7;
    }
    progressBars[barIndexPred].classList.remove('open')
    progressBars[barIndex].classList.add('open')

    if (currentIndex === -1) {
      currentIndex = 7
    }
    const lastSlide = sliderPart[currentIndex]
    lastSlide.remove()
    slider.prepend(lastSlide)


    // slider.style.transition = 'opacity 0.1s'
    slider.style.transition = 'none'
    slider.style.transform = 'translateX(-50%) translateX(-450px)'

    setTimeout(() => {
      slider.style.transition = 'all 0.75s ease'
      slider.style.transform = 'translateX(-50%) translateX(0)'
    }, 10);

    setTimeout(() => { flagSlid = true }, 700)
  }

});



// slidLeft.addEventListener('click', () => {
//   if (flagSlid) {

//     // slidLeft.classList.add('tap');
//     // setTimeout(() => {
//     //   slidLeft.classList.remove('tap');
//     // }, 200)
//     slidLeft.classList.add('click');
//     setTimeout(() => {
//       slidLeft.classList.remove('click');
//     }, 200);


//     flagSlid = false;
//     currentIndex -= 1;

//     barIndex -= 1;
//     barIndexPred = barIndex + 1;


//     if (barIndex == -1) {
//       barIndex = 7;
//     }
//     if (barIndexPred == -1) {
//       barIndexPred = 7;
//     }
//     progressBars[barIndexPred].classList.remove('open')
//     progressBars[barIndex].classList.add('open')



//     sliderPart.forEach(part => {
//       if (part.offsetLeft >= 3149) {
//         part.style.opacity = 0;
//         part.style.left = 0 + 'px';

//         setTimeout(() => { part.style.opacity = 1 }, 810)
//       }
//       else {
//         part.style.left = part.offsetLeft + parteWidth + 'px'
//       }
//     });


//     if (currentIndex == 0) {
//       currentIndex = 5;
//     }

//     setTimeout(() => { flagSlid = true }, 810)

//   }


// });

slidRight.addEventListener('click', () => {

  if (flagSlid) {

    slidRight.classList.add('click');
    setTimeout(() => {
      slidRight.classList.remove('click');
    }, 200);

    // slidRight.classList.add('tap');
    // setTimeout(() => {
    //   slidRight.classList.remove('tap');
    // }, 200)

    flagSlid = false;

    barIndex += 1;
    barIndexPred = barIndex - 1;


    if (barIndex == 8) {
      barIndex = 0;
    }
    if (barIndexPred == 8) {
      barIndexPred = 0;
    }
    progressBars[barIndexPred].classList.remove('open')
    progressBars[barIndex].classList.add('open')


    if (currentIndex === 8) {
      currentIndex = 0
    }
    const firstSlide = sliderPart[currentIndex]
    firstSlide.remove()
    slider.append(firstSlide)


    // slider.style.transition = 'opacity 0.1s'
    slider.style.transition = 'none'
    slider.style.transform = 'translateX(-50%) translateX(450px)'

    setTimeout(() => {
      slider.style.transition = 'all 0.75s ease'
      slider.style.transform = 'translateX(-50%) translateX(0px)'
    }, 10);
    currentIndex += 1;


    setTimeout(() => { flagSlid = true }, 700)
  }
});




function slidRightFunc() {
  if (flagSlid) {

    flagSlid = false;

    barIndex += 1;
    barIndexPred = barIndex - 1;


    if (barIndex == 8) {
      barIndex = 0;
    }
    if (barIndexPred == 8) {
      barIndexPred = 0;
    }
    progressBars[barIndexPred].classList.remove('open')
    progressBars[barIndex].classList.add('open')


    if (currentIndex === 8) {
      currentIndex = 0
    }
    const firstSlide = sliderPart[currentIndex]
    firstSlide.remove()
    slider.append(firstSlide)


    // slider.style.transition = 'opacity 0.1s'
    slider.style.transition = 'none'
    slider.style.transform = 'translateX(-50%) translateX(450px)'

    setTimeout(() => {
      slider.style.transition = 'all 0.75s ease'
      slider.style.transform = 'translateX(-50%) translateX(0px)'
    }, 10);
    currentIndex += 1;


    setTimeout(() => { flagSlid = true }, 1000)
  }

}







const allBox = document.querySelector('.flyScrollBlock .allBox')
const allBoxDef = document.querySelector('.flyScrollBlock .allBoxDef')
const allBoxParts = document.querySelectorAll('.flyScrollBlock .allBox .part')

// const startScroll = 1700;
// const endScroll = 2700;

allBoxParts.forEach(part => {
  part.addEventListener('click', () => {
    part.style.scale = 1.2;

    setTimeout(() => {
      part.style.scale = 1;
    }, 2000)

    if (!part.classList.contains('fly2500')) {
      part.classList.add('fly2500c')
      setTimeout(() => {
        part.classList.remove('fly2500c')
      }, 2000)
    }
  })
});

const startScroll = 1200;
const endScroll = 2200;
let currentStep = null;

// Оптимизированный обработчик скролла
function handleScroll() {

  const scrollY = window.scrollY;

  if (scrollY >= endScroll - 100) {
    allBoxDef.classList.add('down');
    allBox.classList.add('down');
  }
  else {
    allBoxDef.classList.remove('down');
    allBox.classList.remove('down');
  }

  // Проверяем диапазон
  if (scrollY < startScroll || scrollY > endScroll) {
    if (currentStep !== null) {

      allBoxParts.forEach(part => {
        part.classList.remove(`fly${startScroll + currentStep + 500}`);

      });
      currentStep = null;
    }
    return;
  }

  // Вычисляем текущий шаг (0-10)
  const newStep = Math.floor((scrollY - startScroll) / 100);

  // Если шаг изменился
  if (newStep !== currentStep) {
    // Удаляем предыдущий класс
    if (currentStep !== null) {

      allBoxParts.forEach(part => {
        part.classList.remove(`fly${startScroll + currentStep * 100 + 500}`);
      });
    }

    // Добавляем новый класс


    allBoxParts.forEach(part => {
      part.classList.add(`fly${startScroll + newStep * 100 + 500}`);
    });
    currentStep = newStep;
  }
}



// Оптимизация вызовов
let isTicking = false;
window.addEventListener('scroll', () => {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      isTicking = false;
    });
    isTicking = true;
  }
});

// Инициализация
handleScroll();














const gameContainerBox = document.querySelector('.gameContainerBox');
// const gameContainerA = document.querySelector('.gameContainerA');
// const gameContainerB = document.querySelector('.gameContainerB');
// const gameContainerC = document.querySelector('.gameContainerC');
const gameContainers = document.querySelectorAll('.gameContainer');

// const blockingPlay = document.querySelector('#blockingGame');
const exitPlay = document.querySelector('.gameContainerBox .exit');
const exitMaxPlay = document.querySelector('.exitMax');

let containerGameOpen = false;

let gameOpenFun = false;
let gameAgood = false;
let gameBgood = false;
let gameCgood = false;

let goReplay = false;
let scrollEnabled = false; // флаг для управления


gameContainerBox.addEventListener('click', () => {
  if (!containerGameOpen) {
    gameOpenFun = true;
    setTimeout(() => {
      containerGameOpen = true
      goOnTop.classList.add('notShow');
    }, 500);

    window.scrollTo({
      top: gameContainerBox.getBoundingClientRect().top + window.pageYOffset - window.screen.height * 0.42,
      behavior: 'smooth'
    })

    body.style.overflow = 'hidden';

    // blockingPlay.style.display = 'block';
    exitPlay.style.display = 'flex';
    exitMaxPlay.style.display = 'block';
    gameContainerBox.classList.add('max');
    gameContainers.forEach(contain => {
      contain.classList.add('max');
    });
    // gameContainerA.classList.add('max');
    // gameContainerB.classList.add('max');
    // gameContainerC.classList.add('max');

    disableArrowScroll()

    // Запуск игры
    // if (!gameOpenFun) {
    // gameOpenFun = true;
    if (!gameAgood) {
      gameA();
    }
    else if (gameAgood && !gameBgood) {
      gameB();
    }
    else if (gameBgood && !gameCgood) {
      gameC();
    }

    // }
  }

})

exitPlay.addEventListener('click', () => {
  gameOpenFun = false;
  if (containerGameOpen) {
    setTimeout(() => {
      containerGameOpen = false;
      goOnTop.classList.remove('notShow');

    }, 100);
    body.style.overflowY = 'auto';

    exitPlay.style.display = 'none';
    exitMaxPlay.style.display = 'none';
    gameContainerBox.classList.remove('max');
    gameContainers.forEach(contain => {
      contain.classList.remove('max');
    });
    // gameContainerA.classList.remove('max');
    // gameContainerB.classList.remove('max');
    // gameContainerC.classList.remove('max');

    enableArrowScroll()
  }
})

exitMaxPlay.addEventListener('click', () => {
  gameOpenFun = false;

  if (containerGameOpen) {
    setTimeout(() => {
      containerGameOpen = false;
    }, 100);
    body.style.overflowY = 'auto';
    exitPlay.style.display = 'none';
    exitMaxPlay.style.display = 'none';
    gameContainerBox.classList.remove('max');
    gameContainers.forEach(contain => {
      contain.classList.remove('max');
    });
    // gameContainerA.classList.remove('max');
    // gameContainerB.classList.remove('max');
    // gameContainerC.classList.remove('max');

    enableArrowScroll()
  }
})

document.addEventListener('keydown', function (e) {
  if (!scrollEnabled &&
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault();
  }
});

// Функции для включения/выключения
function enableArrowScroll() {
  scrollEnabled = true;
}

function disableArrowScroll() {
  scrollEnabled = false;
}




let stateA = {
  recordedFrames: [], // Запись позиций игрока
  isReplaying: false,
  replayTrail: [], // Точки траектории реплея
};

// gameA();

function gameA() {
  const gameContainer = document.querySelector('.gameContainerA');
  const player = document.querySelector('.gameContainerA .player');
  const pl1 = document.querySelector('.gameContainerA .player .pl1');
  const pl2 = document.querySelector('.gameContainerA .player .pl2');
  const key = document.querySelector('.gameContainerA .key');
  const key1 = document.querySelector('.gameContainerA .key .key1');
  const key2 = document.querySelector('.gameContainerA .key .key2');
  const door = document.querySelector('.gameContainerA .door');
  const doorDef = document.querySelector('.gameContainerA .door .def');
  const doorClose = document.querySelector('.gameContainerA .door .close');
  const doorOpen = document.querySelector('.gameContainerA .door .open');
  const wall = document.querySelector('.gameContainerA .wall');
  const game = document.querySelector('.gameContainerA .game');
  const timer = document.querySelector('.gameContainerA .timer');
  const timerHand = document.querySelector('.gameContainerA .timerHand');
  // const timerText = document.querySelector('.timerText');
  // let seconds = 0;


  // Настройки игры
  const config = {
    playerSize: 40,
    keySize: 20,
    doorWidth: 42,
    doorHeight: 35,
    wallRadius: 130,
    noStepSize: 80,
    gameWidth: 400,
    gameHeight: 400,
    cornerRadius: 40,
    roundTime: 3 // Время на раунд в секундах
  };

  // Состояние игры
  let state = {
    playerX: 200 - 20,
    playerY: 200 - 20,
    velX: 0,
    velY: 0,
    speed: 0.5,
    friction: 0.92,
    maxSpeed: 6,
    hasKey: false,
    timeLeft: config.roundTime,
    timerInterval: null,
    isGameOver: false,
    restartTimer: null,
    gameSuccess: false, // Флаг1: успешное завершение
    enableRewind: false, // Флаг2: включить перемотку
    // enableRewind: true, // Флаг2: включить перемотку

    // recordedFrames: [], // Запись позиций игрока
    // isReplaying: false,
    // replayTrail: [], // Точки траектории реплея

    isNoStep: false
  };

  // Управление
  const keys = {};
  document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = true;
    }
  });
  document.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = false;
    }
  });



  if (goReplay) {
    startReplay();
    return;
  }

  // Инициализация игры
  function initGame() {
    player.classList.remove('jumping');
    player.style.transform = 'none';

    // Очищаем предыдущие интервалы
    if (state.timerInterval) clearInterval(state.timerInterval);
    if (state.restartTimer) clearTimeout(state.restartTimer);

    // Очищаем реплей
    clearReplay();

    // Сброс состояния
    state = {
      ...state,
      playerX: 200 - 20,
      playerY: 200 - 20,
      velX: 0,
      velY: 0,
      hasKey: false,
      timeLeft: config.roundTime,
      isGameOver: false,
      gameSuccess: false,
      recordedFrames: [],
      isReplaying: false,
      isNoStep: false
    };

    // Сброс элементов
    player.style.left = state.playerX + 'px';
    player.style.top = state.playerY + 'px';
    player.style.display = 'block';
    pl2.style.display = 'none';
    pl1.style.display = 'block';
    key2.style.display = 'none';
    key1.style.display = 'block';

    doorDef.style.display = 'none';
    doorOpen.style.display = 'none';
    doorClose.style.display = 'block';

    player.style.transform = 'none';
    // timerText.textContent = state.timeLeft;
    gameContainer.style.background = '#fff'
    timer.style.display = 'block'


    // Размещение ключа
    placeKey();


    // Сброс управления
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;

    // Запуск таймера
    state.timerInterval = setInterval(updateTimer, 100);
  }

  // Размещение ключа
  function placeKey() {

    key.style.display = 'block';
  }

  // Обновление таймера
  function updateTimer() {

    state.timeLeft = state.timeLeft - 1 / 10;
    // timerText.textContent = state.timeLeft;

    const angle = (-state.timeLeft / config.roundTime) * 360 - 90; // -90 чтобы начинать с вертикального положения
    timerHand.style.transform = `rotate(${angle}deg)`;

    if (state.timeLeft <= 0) {

      setTimeout(() => {
        state.timeLeft = config.roundTime
        // timerText.textContent = state.timeLeft;
        const angle = (-state.timeLeft / config.roundTime) * 360 - 90; // -90 чтобы начинать с вертикального положения
        timerHand.style.transform = `rotate(${angle}deg)`;
      }, 100);

      endGame(false);
    }
  }

  // Запись позиции игрока
  function recordFrame() {
    // if (!state.isGameOver && !state.isReplaying) {
    //   state.recordedFrames.push({
    //     x: state.playerX,
    //     y: state.playerY
    //   });
    // }
    if (!state.isGameOver && !stateA.isReplaying) {
      stateA.recordedFrames.push({
        x: state.playerX,
        y: state.playerY
      });
    }
  }

  // Очистка реплея
  function clearReplay() {
    const replayPlayer = document.getElementById('replay-playerA');
    if (replayPlayer) replayPlayer.remove();

    stateA.replayTrail.forEach(dot => dot.remove());
    stateA.replayTrail = [];
    stateA.isReplaying = false;
    stateA.recordedFrames = [];


    // state.replayTrail.forEach(dot => dot.remove());
    // state.replayTrail = [];
    // state.isReplaying = false;
  }

  // Создание точки траектории
  function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    gameContainer.appendChild(dot);
    return dot;
  }

  // Начать реплей с перемоткой
  function startReplay() {
    // if (state.recordedFrames.length === 0) return;
    if (stateA.recordedFrames.length === 0) return;

    // state.isReplaying = true;
    stateA.isReplaying = true;
    player.style.display = 'none';
    doorDef.style.display = 'none';
    doorOpen.style.display = 'block';
    doorClose.style.display = 'none';

    // Создаем клона для воспроизведения
    const replayPlayer = document.createElement('div');
    // Создаем элемент img
    const imgElement = document.createElement('img');
    imgElement.src = 'style/chel1.png';

    // Добавляем изображение в DOM (например, в body)
    document.body.appendChild(imgElement);
    replayPlayer.id = 'replay-playerA';
    replayPlayer.style.left = state.playerX + 'px';
    replayPlayer.style.top = state.playerY + 'px';
    gameContainer.appendChild(replayPlayer);
    replayPlayer.appendChild(imgElement);

    // Быстрая перемотка назад
    rewindToStart();
  }

  // Перемотка в начало
  function rewindToStart() {
    let rewindIndex = stateA.recordedFrames.length - 1;
    // let rewindIndex = state.recordedFrames.length - 1;
    const rewindInterval = setInterval(() => {
      if (rewindIndex <= 0) {
        clearInterval(rewindInterval);
        playForward(); // Запускаем обычное воспроизведение
        return;
      }

      rewindIndex -= 3; // Скорость перемотки
      if (rewindIndex < 0) rewindIndex = 0;

      // const frame = state.recordedFrames[rewindIndex];
      const frame = stateA.recordedFrames[rewindIndex];
      document.getElementById('replay-playerA').style.left = frame.x + 'px';
      document.getElementById('replay-playerA').style.top = frame.y + 'px';
    }, 16); // ~60fps
  }

  // Воспроизведение вперед
  function playForward() {
    let forwardIndex = 0;
    const replayInterval = setInterval(() => {
      const replayPlayer = document.getElementById('replay-playerA');
      // if (forwardIndex >= state.recordedFrames.length) {
      if (forwardIndex >= stateA.recordedFrames.length) {
        clearInterval(replayInterval);
        replayPlayer.style.display = 'none';
        doorDef.style.display = 'none';
        doorOpen.style.display = 'none';
        doorClose.style.display = 'block';

        setTimeout(() => gameB(), 1000); // Перезапуск через 1 секунды

        // setTimeout(() => initGame(), 2000); // Перезапуск через 2 секунды
        return;
      }

      // const frame = state.recordedFrames[forwardIndex];
      const frame = stateA.recordedFrames[forwardIndex];
      replayPlayer.style.left = frame.x + 'px';
      replayPlayer.style.top = frame.y + 'px';

      // Добавляем точку траектории
      if (forwardIndex % 1 === 0) {
        const dot = createTrailDot(frame.x + 14, frame.y + 14);
        // state.replayTrail.push(dot);
        stateA.replayTrail.push(dot);
      }

      forwardIndex++;
    }, 16); // Оригинальная скорость
  }

  // Проверка столкновений
  function checkCollisions() {
    const playerCenter = {
      x: state.playerX + config.playerSize / 2,
      y: state.playerY + config.playerSize / 2
    };

    const wallCenter1 = {
      x: config.gameWidth,
      y: config.gameHeight / 2
    };

    const wallCenter2 = {
      x: 0,
      y: config.gameHeight / 2
    };

    // 1. Проверка сбора ключа
    if (!state.hasKey && isColliding(player, key)) {
      key.style.display = 'none';
      state.hasKey = true;
      doorDef.style.display = 'none';
      doorOpen.style.display = 'block';
      doorClose.style.display = 'none';
    }

    // 2. Проверка входа в дверь
    if (state.hasKey && isColliding(player, door)) {
      state.gameSuccess = true; // Устанавливаем флаг успеха
      endGame(true);
    }

    // 3. Проверка столкновения с круглой стеной
    checkWallCollision(playerCenter, wallCenter1);
    checkWallCollision(playerCenter, wallCenter2);

    // 4. Проверка границ игрового поля
    checkBoundaryCollision(playerCenter);
  }

  // Проверка столкновения с круглой стеной
  function checkWallCollision(playerCenter, wallCenter) {
    const dx = playerCenter.x - wallCenter.x;
    const dy = playerCenter.y - wallCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = config.wallRadius + config.playerSize / 2;

    if (distance < minDistance) {
      const nx = dx / distance;
      const ny = dy / distance;
      const dotProduct = state.velX * nx + state.velY * ny;
      state.velX -= nx * dotProduct * 0.85;
      state.velY -= ny * dotProduct * 0.85;
      const repel = (minDistance - distance) * 0.1;
      state.velX += nx * repel;
      state.velY += ny * repel;
      state.playerX = wallCenter.x + nx * minDistance - config.playerSize / 2;
      state.playerY = wallCenter.y + ny * minDistance - config.playerSize / 2;
    }
  }

  // Проверка столкновения с границами
  function checkBoundaryCollision(playerCenter) {
    const cornerRadius = config.cornerRadius;
    const width = config.gameWidth;
    const height = config.gameHeight;
    const playerRadius = config.playerSize / 2;
    const effectiveRadius = cornerRadius - playerRadius;

    let inCorner = false;
    let cornerCenter = { x: 0, y: 0 };

    if (playerCenter.x < cornerRadius && playerCenter.y < cornerRadius) {
      inCorner = true;
      cornerCenter = { x: cornerRadius, y: cornerRadius };
    }
    else if (playerCenter.x > width - cornerRadius && playerCenter.y < cornerRadius) {
      inCorner = true;
      cornerCenter = { x: width - cornerRadius, y: cornerRadius };
    }
    else if (playerCenter.x < cornerRadius && playerCenter.y > height - cornerRadius) {
      inCorner = true;
      cornerCenter = { x: cornerRadius, y: height - cornerRadius };
    }
    else if (playerCenter.x > width - cornerRadius && playerCenter.y > height - cornerRadius) {
      inCorner = true;
      cornerCenter = { x: width - cornerRadius, y: height - cornerRadius };
    }

    if (inCorner) {
      const dx = playerCenter.x - cornerCenter.x;
      const dy = playerCenter.y - cornerCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > effectiveRadius) {
        const nx = dx / distance;
        const ny = dy / distance;
        state.playerX = cornerCenter.x + nx * effectiveRadius - playerRadius;
        state.playerY = cornerCenter.y + ny * effectiveRadius - playerRadius;
        const dotProduct = state.velX * nx + state.velY * ny;
        state.velX -= nx * dotProduct * 1.5;
        state.velY -= ny * dotProduct * 1.5;
      }
    } else {
      if (state.playerX < 0) {
        state.playerX = 0;
        state.velX *= -0.5;
      }
      if (state.playerX > width - config.playerSize) {
        state.playerX = width - config.playerSize;
        state.velX *= -0.5;
      }
      if (state.playerY < 0) {
        state.playerY = 0;
        state.velY *= -0.5;
      }
      if (state.playerY > height - config.playerSize) {
        state.playerY = height - config.playerSize;
        state.velY *= -0.5;
      }
    }
  }

  // Проверка столкновения двух элементов
  function isColliding(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  // Завершение игры
  function endGame(success) {
    if (state.isGameOver) return;
    state.isGameOver = true;
    state.gameSuccess = success;

    clearInterval(state.timerInterval);
    gameContainer.style.background = '#333'
    pl1.style.display = 'none';
    pl2.style.display = 'block';
    key1.style.display = 'none';
    key2.style.display = 'block';

    doorDef.style.display = 'block';
    doorOpen.style.display = 'none';
    doorClose.style.display = 'none';

    // Сброс управления
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;

    if (!gameOpenFun) {
      timer.style.display = 'none'
      return
    }

    if (success) {
      // message.textContent = `Успех! Уровень пройден!`;
      // pl1.style.display = 'block';
      // pl2.style.display = 'none';

      gameContainer.style.background = '#fff'
      player.style.display = 'none'
      key1.style.display = 'block';
      key2.style.display = 'none';

      doorDef.style.display = 'none';
      doorOpen.style.display = 'none';
      doorClose.style.display = 'block';
      setTimeout(() => {
        timer.style.display = 'none';
      }, 1000);


      state.enableRewind = true; // Флаг2: включить перемотку
      gameAgood = true;
      // gameBgood = false;
      setTimeout(() => gameB(), 1000); // Перезапуск через 1 секунды
      return;


      // if (state.enableRewind) {
      //   startReplay();
      //   return;
      // }
    } else {
      // message.textContent = `Время вышло!`;
    }

    timer.style.display = 'none'
    state.restartTimer = setTimeout(initGame, 1000);
  }

  // Игровой цикл
  function gameLoop() {
    if (!gameOpenFun) {
      endGame()
    }

    // if (state.isGameOver || state.isReplaying) {
    if (state.isGameOver || stateA.isReplaying) {

      requestAnimationFrame(gameLoop);
      // console.log('уровень пройден')
      return;
    }
    // Управление
    if (keys['ArrowUp']) state.velY -= state.speed;
    if (keys['ArrowDown']) state.velY += state.speed;
    if (keys['ArrowLeft']) state.velX -= state.speed;
    if (keys['ArrowRight']) state.velX += state.speed;

    // Инерция
    state.velX *= state.friction;
    state.velY *= state.friction;

    // Ограничение скорости
    const currentSpeed = Math.sqrt(state.velX * state.velX + state.velY * state.velY);
    if (currentSpeed > state.maxSpeed) {
      state.velX = (state.velX / currentSpeed) * state.maxSpeed;
      state.velY = (state.velY / currentSpeed) * state.maxSpeed;
    }

    // Обновление позиции
    state.playerX += state.velX;
    state.playerY += state.velY;

    // Запись позиции
    recordFrame();

    // Проверка столкновений
    checkCollisions();

    // Обновление позиции игрока
    player.style.left = state.playerX + 'px';
    player.style.top = state.playerY + 'px';

    // Наклон при движении
    // const tiltX = state.velX * 8;
    // const tiltY = state.velY * 8;
    // player.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;

    // В игровом цикле замените блок наклона на этот:
    const isMoving = Math.abs(state.velX) > 0.1 || Math.abs(state.velY) > 0.1;

    if (isMoving) {
      // Добавляем класс с анимацией прыжка
      if (!player.classList.contains('jumping')) {
        player.classList.add('jumping');
      }

      // Сохраняем наклон в сторону движения
      const tiltX = state.velX * 8;
      const tiltY = state.velY * 8;
      player.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
    } else {
      // Убираем анимацию при остановке
      player.classList.remove('jumping');
      player.style.transform = 'none';
    }

    requestAnimationFrame(gameLoop);
  }

  // // Запуск игры
  initGame();
  gameLoop();
}





let stateB = {
  recordedFrames: [], // Запись позиций игрока
  isReplaying: false,
  replayTrail: [], // Точки траектории реплея
};

function gameB() {
  const gameContainer = document.querySelector('.gameContainerB');
  const player = document.querySelector('.gameContainerB .player');
  const pl1 = document.querySelector('.gameContainerB .player .pl1');
  const pl2 = document.querySelector('.gameContainerB .player .pl2');
  const key = document.querySelector('.gameContainerB .key');
  const key1 = document.querySelector('.gameContainerB .key .key1');
  const key2 = document.querySelector('.gameContainerB .key .key2');
  const door = document.querySelector('.gameContainerB .door');
  const doorDef = document.querySelector('.gameContainerB .door .def');
  const doorClose = document.querySelector('.gameContainerB .door .close');
  const doorOpen = document.querySelector('.gameContainerB .door .open');
  const wall = document.querySelector('.gameContainerB .wall');
  const noStepl = document.querySelector('.gameContainerB .noStepl');
  const noStepr = document.querySelector('.gameContainerB .noStepr');
  const game = document.querySelector('.gameContainerB .game');
  const timer = document.querySelector('.gameContainerB .timer');
  const timerHand = document.querySelector('.gameContainerB .timerHand');

  // Настройки игры
  const config = {
    playerSize: 40,
    keySize: 20,
    doorWidth: 42,
    doorHeight: 15,
    wallRadiusCenter: 40,
    wallRadiusTop: 75,
    wallRadiusBot: 200,
    noStepSize: 80,
    gameWidth: 400,
    gameHeight: 400,
    cornerRadius: 40,
    roundTime: 6.5 // Время на раунд в секундах
  };

  // Состояние игры
  let state = {
    playerX: 200 - 20,
    playerY: 320,
    velX: 0,
    velY: 0,
    speed: 0.5,
    friction: 0.92,
    maxSpeed: 6,
    hasKey: false,
    timeLeft: config.roundTime,
    timerInterval: null,
    isGameOver: false,
    restartTimer: null,
    gameSuccess: false, // Флаг1: успешное завершение
    // enableRewind: false, // Флаг2: включить перемотку
    enableRewind: true, // Флаг2: включить перемотку

    // recordedFrames: [], // Запись позиций игрока
    // isReplaying: false,
    // replayTrail: [], // Точки траектории реплея

    isNoStepl: false,
    isNoSteplDop: false,
    isNoStepr: false,
    isNoSteprDop: false
  };

  // Управление
  const keys = {};
  document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = true;
    }
  });
  document.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = false;
    }
  });


  if (goReplay) {
    startReplay();
    return;
  }

  // Инициализация игры
  function initGame() {

    player.classList.remove('jumping');
    player.style.transform = 'none';

    // Очищаем предыдущие интервалы
    if (state.timerInterval) clearInterval(state.timerInterval);
    if (state.restartTimer) clearTimeout(state.restartTimer);

    // Очищаем реплей
    clearReplay();

    // Сброс состояния
    state = {
      ...state,
      playerX: 200 - 20,
      playerY: 320,
      velX: 0,
      velY: 0,
      hasKey: false,
      timeLeft: config.roundTime,
      isGameOver: false,
      gameSuccess: false,
      recordedFrames: [],
      isReplaying: false,
      isNoStepl: false,
      isNoSteplDop: false,
      isNoStepr: false,
      isNoSteprDop: false
    };

    // Сброс элементов
    player.style.left = state.playerX + 'px';
    player.style.top = state.playerY + 'px';
    player.style.display = 'block';
    pl2.style.display = 'none';
    pl1.style.display = 'block';
    key2.style.display = 'none';
    key1.style.display = 'block';

    doorDef.style.display = 'none';
    doorOpen.style.display = 'none';
    doorClose.style.display = 'block';

    noStepl.style.display = 'block'
    noStepr.style.display = 'block'

    player.style.transform = 'none';
    gameContainer.style.background = '#fff'
    timer.style.display = 'block'


    // Размещение ключа
    placeKey();

    // Сброс управления
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;

    // Запуск таймера
    state.timerInterval = setInterval(updateTimer, 100);
  }

  // Размещение ключа
  function placeKey() {

    key.style.display = 'block';
  }

  // Обновление таймера
  function updateTimer() {

    state.timeLeft = state.timeLeft - 1 / 10;

    const angle = (-state.timeLeft / config.roundTime) * 360 - 90; // -90 чтобы начинать с вертикального положения
    timerHand.style.transform = `rotate(${angle}deg)`;

    if (state.timeLeft <= 0) {

      setTimeout(() => {
        state.timeLeft = config.roundTime
        const angle = (-state.timeLeft / config.roundTime) * 360 - 90; // -90 чтобы начинать с вертикального положения
        timerHand.style.transform = `rotate(${angle}deg)`;
      }, 100);

      endGame(false);
    }
  }

  // Запись позиции игрока
  function recordFrame() {
    // if (!state.isGameOver && !state.isReplaying) {
    if (!state.isGameOver && !stateB.isReplaying) {
      stateB.recordedFrames.push({
        x: state.playerX,
        y: state.playerY
      });
    }
  }

  // Очистка реплея
  function clearReplay() {
    const replayPlayer = document.getElementById('replay-playerB');
    if (replayPlayer) replayPlayer.remove();

    stateB.replayTrail.forEach(dot => dot.remove());
    stateB.replayTrail = [];
    stateB.isReplaying = false;
    stateB.recordedFrames = [];
  }

  // Создание точки траектории
  function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    gameContainer.appendChild(dot);
    return dot;
  }

  // Начать реплей с перемоткой
  function startReplay() {
    if (stateB.recordedFrames.length === 0) return;

    stateB.isReplaying = true;
    player.style.display = 'none';
    doorDef.style.display = 'none';
    doorOpen.style.display = 'block';
    doorClose.style.display = 'none';

    // Создаем клона для воспроизведения
    const replayPlayer = document.createElement('div');
    // Создаем элемент img
    const imgElement = document.createElement('img');
    imgElement.src = 'style/chel1.png';

    // Добавляем изображение в DOM (например, в body)
    document.body.appendChild(imgElement);
    replayPlayer.id = 'replay-playerB';
    replayPlayer.style.left = state.playerX + 'px';
    replayPlayer.style.top = state.playerY + 'px';
    gameContainer.appendChild(replayPlayer);
    replayPlayer.appendChild(imgElement);

    // Быстрая перемотка назад
    rewindToStart();
  }

  // Перемотка в начало
  function rewindToStart() {
    let rewindIndex = stateB.recordedFrames.length - 1;
    const rewindInterval = setInterval(() => {
      if (rewindIndex <= 0) {
        clearInterval(rewindInterval);
        playForward(); // Запускаем обычное воспроизведение
        return;
      }

      rewindIndex -= 3; // Скорость перемотки
      if (rewindIndex < 0) rewindIndex = 0;

      const frame = stateB.recordedFrames[rewindIndex];
      document.getElementById('replay-playerB').style.left = frame.x + 'px';
      document.getElementById('replay-playerB').style.top = frame.y + 'px';
    }, 16); // ~60fps
  }

  // Воспроизведение вперед
  function playForward() {
    let forwardIndex = 0;
    const replayInterval = setInterval(() => {
      const replayPlayer = document.getElementById('replay-playerB');

      if (forwardIndex >= stateB.recordedFrames.length) {
        clearInterval(replayInterval);
        replayPlayer.style.display = 'none';
        doorDef.style.display = 'none';
        doorOpen.style.display = 'none';
        doorClose.style.display = 'block';

        setTimeout(() => gameC(), 1000); // Перезапуск через 2 секунды
        // setTimeout(() => initGame(), 2000); // Перезапуск через 2 секунды
        return;
      }

      const frame = stateB.recordedFrames[forwardIndex];
      replayPlayer.style.left = frame.x + 'px';
      replayPlayer.style.top = frame.y + 'px';

      // Добавляем точку траектории
      if (forwardIndex % 1 === 0) {
        const dot = createTrailDot(frame.x + 14, frame.y + 14);
        stateB.replayTrail.push(dot);
      }

      forwardIndex++;
    }, 16); // Оригинальная скорость
  }

  // Проверка столкновений
  function checkCollisions() {
    const playerCenter = {
      x: state.playerX + config.playerSize / 2,
      y: state.playerY + config.playerSize / 2
    };

    const wallCenterCent = {
      x: 160 + 40,
      y: 180 + 40
    };

    const wallCenterTop1 = {
      x: 46 + 75,
      y: 46 + 75
    };

    const wallCenterTop2 = {
      x: config.gameWidth - 46 - 75,
      y: 46 + 75
    };


    const wallCenterBot1 = {
      x: -20,
      y: config.gameHeight + 20
    };

    const wallCenterBot2 = {
      x: config.gameWidth + 20,
      y: config.gameHeight + 20
    };

    // 1. Проверка сбора ключа
    if (!state.hasKey && isColliding(player, key)) {
      key.style.display = 'none';
      state.hasKey = true;
      doorDef.style.display = 'none';
      doorOpen.style.display = 'block';
      doorClose.style.display = 'none';
      // door.style.backgroundColor = '#34A853';
    }

    // 1. Проверка
    if (!state.isNoStepl && isColliding(player, noStepl)) {
      state.isNoStepl = true;
    }

    else if (state.hasKey && !state.isNoStepr && isColliding(player, noStepl)) {
      state.isNoSteplDop = true;
      if (state.timerInterval) clearInterval(state.timerInterval);
      noStepl.style.display = 'none'
      state.timerInterval = setInterval(updateTimer, 25);
    }

    if (!state.isNoStepr && isColliding(player, noStepr)) {
      state.isNoStepr = true;
    }

    else if (state.hasKey && !state.isNoStepl && isColliding(player, noStepr)) {
      state.isNoSteprDop = true;
      if (state.timerInterval) clearInterval(state.timerInterval);
      noStepr.style.display = 'none'
      state.timerInterval = setInterval(updateTimer, 25);
    }

    // 2. Проверка входа в дверь
    if (state.hasKey && isColliding(player, door)) {
      state.gameSuccess = true; // Устанавливаем флаг успеха
      endGame(true);
    }

    // 3. Проверка столкновения с круглой стеной
    checkWallCollisionCenter(playerCenter, wallCenterCent);
    checkWallCollisionTop(playerCenter, wallCenterTop1);
    checkWallCollisionTop(playerCenter, wallCenterTop2);
    checkWallCollisionBot(playerCenter, wallCenterBot1);
    checkWallCollisionBot(playerCenter, wallCenterBot2);

    // 4. Проверка границ игрового поля
    checkBoundaryCollision(playerCenter);
  }

  // Проверка столкновения с круглой стеной
  function checkWallCollisionCenter(playerCenter, wallCenter) {
    const dx = playerCenter.x - wallCenter.x;
    const dy = playerCenter.y - wallCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistanceTop = config.wallRadiusCenter + config.playerSize / 2;

    if (distance < minDistanceTop) {
      const nx = dx / distance;
      const ny = dy / distance;
      const dotProduct = state.velX * nx + state.velY * ny;
      state.velX -= nx * dotProduct * 0.85;
      state.velY -= ny * dotProduct * 0.85;
      const repel = (minDistanceTop - distance) * 0.1;
      state.velX += nx * repel;
      state.velY += ny * repel;
      state.playerX = wallCenter.x + nx * minDistanceTop - config.playerSize / 2;
      state.playerY = wallCenter.y + ny * minDistanceTop - config.playerSize / 2;
    }
  }

  // Проверка столкновения с круглой стеной
  function checkWallCollisionTop(playerCenter, wallCenter) {
    const dx = playerCenter.x - wallCenter.x;
    const dy = playerCenter.y - wallCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistanceTop = config.wallRadiusTop + config.playerSize / 2;

    if (distance < minDistanceTop) {
      const nx = dx / distance;
      const ny = dy / distance;
      const dotProduct = state.velX * nx + state.velY * ny;
      state.velX -= nx * dotProduct * 0.85;
      state.velY -= ny * dotProduct * 0.85;
      const repel = (minDistanceTop - distance) * 0.1;
      state.velX += nx * repel;
      state.velY += ny * repel;
      state.playerX = wallCenter.x + nx * minDistanceTop - config.playerSize / 2;
      state.playerY = wallCenter.y + ny * minDistanceTop - config.playerSize / 2;
    }
  }

  // Проверка столкновения с круглой стеной
  function checkWallCollisionBot(playerCenter, wallCenter) {
    const dx = playerCenter.x - wallCenter.x;
    const dy = playerCenter.y - wallCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistanceBot = config.wallRadiusBot + config.playerSize / 2;

    if (distance < minDistanceBot) {
      const nx = dx / distance;
      const ny = dy / distance;
      const dotProduct = state.velX * nx + state.velY * ny;
      state.velX -= nx * dotProduct * 0.85;
      state.velY -= ny * dotProduct * 0.85;
      const repel = (minDistanceBot - distance) * 0.1;
      state.velX += nx * repel;
      state.velY += ny * repel;
      state.playerX = wallCenter.x + nx * minDistanceBot - config.playerSize / 2;
      state.playerY = wallCenter.y + ny * minDistanceBot - config.playerSize / 2;
    }
  }

  // Проверка столкновения с границами
  function checkBoundaryCollision(playerCenter) {
    const cornerRadius = config.cornerRadius;
    const width = config.gameWidth;
    const height = config.gameHeight;
    const playerRadius = config.playerSize / 2;
    const effectiveRadius = cornerRadius - playerRadius;

    let inCorner = false;
    let cornerCenter = { x: 0, y: 0 };

    if (playerCenter.x < cornerRadius && playerCenter.y < cornerRadius) {
      inCorner = true;
      cornerCenter = { x: cornerRadius, y: cornerRadius };
    }
    else if (playerCenter.x > width - cornerRadius && playerCenter.y < cornerRadius) {
      inCorner = true;
      cornerCenter = { x: width - cornerRadius, y: cornerRadius };
    }
    else if (playerCenter.x < cornerRadius && playerCenter.y > height - cornerRadius) {
      inCorner = true;
      cornerCenter = { x: cornerRadius, y: height - cornerRadius };
    }
    else if (playerCenter.x > width - cornerRadius && playerCenter.y > height - cornerRadius) {
      inCorner = true;
      cornerCenter = { x: width - cornerRadius, y: height - cornerRadius };
    }

    if (inCorner) {
      const dx = playerCenter.x - cornerCenter.x;
      const dy = playerCenter.y - cornerCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > effectiveRadius) {
        const nx = dx / distance;
        const ny = dy / distance;
        state.playerX = cornerCenter.x + nx * effectiveRadius - playerRadius;
        state.playerY = cornerCenter.y + ny * effectiveRadius - playerRadius;
        const dotProduct = state.velX * nx + state.velY * ny;
        state.velX -= nx * dotProduct * 1.5;
        state.velY -= ny * dotProduct * 1.5;
      }
    } else {
      if (state.playerX < 0) {
        state.playerX = 0;
        state.velX *= -0.5;
      }
      if (state.playerX > width - config.playerSize) {
        state.playerX = width - config.playerSize;
        state.velX *= -0.5;
      }
      if (state.playerY < 0) {
        state.playerY = 0;
        state.velY *= -0.5;
      }
      if (state.playerY > height - config.playerSize) {
        state.playerY = height - config.playerSize;
        state.velY *= -0.5;
      }
    }
  }

  // Проверка столкновения двух элементов
  function isColliding(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  // Завершение игры
  function endGame(success) {
    if (state.isGameOver) return;
    state.isGameOver = true;
    state.gameSuccess = success;

    clearInterval(state.timerInterval);
    // player.style.display = 'none';
    gameContainer.style.background = '#333'
    pl1.style.display = 'none';
    pl2.style.display = 'block';
    key1.style.display = 'none';
    key2.style.display = 'block';

    doorDef.style.display = 'block';
    doorOpen.style.display = 'none';
    doorClose.style.display = 'none';

    // Сброс управления
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;

    if (!gameOpenFun) {
      timer.style.display = 'none'

      return
    }

    if (success) {
      // message.textContent = `Успех! Уровень пройден!`;
      // goReplay = true;
      gameContainer.style.background = '#fff'
      player.style.display = 'none'
      key1.style.display = 'block';
      key2.style.display = 'none';

      doorDef.style.display = 'none';
      doorOpen.style.display = 'none';
      doorClose.style.display = 'block';

      setTimeout(() => {
        timer.style.display = 'none';

      }, 1000);

      // gameAgood = false;
      gameBgood = true;
      setTimeout(() => gameC(), 1000); // Перезапуск через 2 секунды
      return

      if (state.enableRewind) {
        startReplay();
        return;
      }
    } else {
      // message.textContent = `Время вышло!`;
    }

    timer.style.display = 'none'
    state.restartTimer = setTimeout(initGame, 1000);
  }

  // Игровой цикл
  function gameLoop() {
    if (!gameOpenFun) {
      endGame()
    }
    if (state.isGameOver || stateB.isReplaying) {

      requestAnimationFrame(gameLoop);
      // console.log('уровень пройден')
      return;
    }
    // Управление
    if (keys['ArrowUp']) state.velY -= state.speed;
    if (keys['ArrowDown']) state.velY += state.speed;
    if (keys['ArrowLeft']) state.velX -= state.speed;
    if (keys['ArrowRight']) state.velX += state.speed;

    // Инерция
    state.velX *= state.friction;
    state.velY *= state.friction;

    // Ограничение скорости
    const currentSpeed = Math.sqrt(state.velX * state.velX + state.velY * state.velY);
    if (currentSpeed > state.maxSpeed) {
      state.velX = (state.velX / currentSpeed) * state.maxSpeed;
      state.velY = (state.velY / currentSpeed) * state.maxSpeed;
    }

    // Обновление позиции
    state.playerX += state.velX;
    state.playerY += state.velY;

    // Запись позиции
    recordFrame();

    // Проверка столкновений
    checkCollisions();

    // Обновление позиции игрока
    player.style.left = state.playerX + 'px';
    player.style.top = state.playerY + 'px';

    // Наклон при движении
    // const tiltX = state.velX * 8;
    // const tiltY = state.velY * 8;
    // player.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;

    // В игровом цикле замените блок наклона на этот:
    const isMoving = Math.abs(state.velX) > 0.1 || Math.abs(state.velY) > 0.1;

    if (isMoving) {
      // Добавляем класс с анимацией прыжка
      if (!player.classList.contains('jumping')) {
        player.classList.add('jumping');
      }

      // Сохраняем наклон в сторону движения
      // const tiltX = state.velX * 8;
      // const tiltY = state.velY * 8;
      // player.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
    } else {
      // Убираем анимацию при остановке
      player.classList.remove('jumping');
      player.style.transform = 'none';
    }

    requestAnimationFrame(gameLoop);
  }

  // Запуск игры
  initGame();
  gameLoop();
}



let stateC = {
  recordedFrames: [], // Запись позиций игрока
  isReplaying: false,
  replayTrail: [], // Точки траектории реплея
}

function gameC() {
  const gameContainer = document.querySelector('.gameContainerC ');
  const player = document.querySelector('.gameContainerC .player');
  const pl1 = document.querySelector('.gameContainerC .player .pl1');
  const pl2 = document.querySelector('.gameContainerC .player .pl2');
  const key = document.querySelector('.gameContainerC .key');
  const key1 = document.querySelector('.gameContainerC .key .key1');
  const key2 = document.querySelector('.gameContainerC .key .key2');
  const door = document.querySelector('.gameContainerC .door');
  const doorDef = document.querySelector('.gameContainerC .door .def');
  const doorClose = document.querySelector('.gameContainerC .door .close');
  const doorOpen = document.querySelector('.gameContainerC .door .open');
  const wall = document.querySelector('.gameContainerC .wall');
  const noStep = document.querySelector('.gameContainerC .noStep');
  const game = document.querySelector('.gameContainerC .game');
  const timer = document.querySelector('.gameContainerC .timer');
  const timerHand = document.querySelector('.gameContainerC .timerHand');

  // Настройки игры
  const config = {
    playerSize: 40,
    keySize: 20,
    doorWidth: 42,
    doorHeight: 35,
    wallRadius: 130,
    noStepSize: 80,
    // gameWidth: 600,
    // gameHeight: 600,
    gameWidth: 400,
    gameHeight: 400,
    cornerRadius: 40,
    roundTime: 4.5 // Время на раунд в секундах
  };

  // Состояние игры
  let state = {
    playerX: 30,
    playerY: 50,
    velX: 0,
    velY: 0,
    // speed: 0.15,
    speed: 0.5,
    friction: 0.92,
    maxSpeed: 6,
    hasKey: false,
    timeLeft: config.roundTime,
    timerInterval: null,
    isGameOver: false,
    restartTimer: null,
    gameSuccess: false, // Флаг1: успешное завершение
    // enableRewind: false, // Флаг2: включить перемотку
    enableRewind: true, // Флаг2: включить перемотку

    // recordedFrames: [], // Запись позиций игрока
    // isReplaying: false,
    // replayTrail: [], // Точки траектории реплея

    isNoStep: false
  };

  // Управление
  const keys = {};
  document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = true;
    }
  });
  document.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = false;
    }
  });

  if (goReplay) {
    startReplay();
    return;
  }

  // Инициализация игры
  function initGame() {

    player.classList.remove('jumping');
    player.style.transform = 'none';

    // Очищаем предыдущие интервалы
    if (state.timerInterval) clearInterval(state.timerInterval);
    if (state.restartTimer) clearTimeout(state.restartTimer);

    // Очищаем реплей
    clearReplay();

    // Сброс состояния
    state = {
      ...state,
      playerX: 30,
      playerY: 50,
      velX: 0,
      velY: 0,
      hasKey: false,
      timeLeft: config.roundTime,
      isGameOver: false,
      gameSuccess: false,
      recordedFrames: [],
      isReplaying: false,
      isNoStep: false
    };

    // Сброс элементов
    player.style.left = state.playerX + 'px';
    player.style.top = state.playerY + 'px';
    player.style.display = 'block';
    pl2.style.display = 'none';
    pl1.style.display = 'block';
    key2.style.display = 'none';
    key1.style.display = 'block';

    doorDef.style.display = 'none';
    doorOpen.style.display = 'none';
    doorClose.style.display = 'block';

    player.style.transform = 'none';
    gameContainer.style.background = '#fff'
    timer.style.display = 'block'


    // Размещение ключа
    placeKey();

    // Сброс управления
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;

    // Запуск таймера
    state.timerInterval = setInterval(updateTimer, 100);
  }

  // Размещение ключа
  function placeKey() {

    key.style.display = 'block';
  }

  // Обновление таймера
  function updateTimer() {


    // state.timeLeft--;
    state.timeLeft = state.timeLeft - 1 / 10;

    const angle = (-state.timeLeft / config.roundTime) * 360 - 90; // -90 чтобы начинать с вертикального положения
    timerHand.style.transform = `rotate(${angle}deg)`;

    if (state.timeLeft <= 0) {

      setTimeout(() => {
        state.timeLeft = config.roundTime
        const angle = (-state.timeLeft / config.roundTime) * 360 - 90; // -90 чтобы начинать с вертикального положения
        timerHand.style.transform = `rotate(${angle}deg)`;
      }, 100);

      endGame(false);
    }
  }

  // Запись позиции игрока
  function recordFrame() {
    if (!state.isGameOver && !stateC.isReplaying) {
      stateC.recordedFrames.push({
        x: state.playerX,
        y: state.playerY
      });
    }
  }

  // Очистка реплея
  function clearReplay() {
    const replayPlayer = document.getElementById('replay-playerC');
    if (replayPlayer) replayPlayer.remove();

    stateC.replayTrail.forEach(dot => dot.remove());
    stateC.replayTrail = [];
    stateC.isReplaying = false;
    stateC.recordedFrames = []; // Точки траектории реплея
  }

  // Создание точки траектории
  function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    gameContainer.appendChild(dot);
    return dot;
  }

  // Начать реплей с перемоткой
  function startReplay() {
    if (stateC.recordedFrames.length === 0) return;

    stateC.isReplaying = true;
    player.style.display = 'none';
    doorDef.style.display = 'none';
    doorOpen.style.display = 'block';
    doorClose.style.display = 'none';

    // Создаем клона для воспроизведения
    const replayPlayer = document.createElement('div');
    // Создаем элемент img
    const imgElement = document.createElement('img');
    imgElement.src = 'style/chel1.png';

    // Добавляем изображение в DOM (например, в body)
    document.body.appendChild(imgElement);
    replayPlayer.id = 'replay-playerC';
    replayPlayer.style.left = state.playerX + 'px';
    replayPlayer.style.top = state.playerY + 'px';
    gameContainer.appendChild(replayPlayer);
    replayPlayer.appendChild(imgElement);

    // Быстрая перемотка назад
    rewindToStart();
  }

  // Перемотка в начало
  function rewindToStart() {
    let rewindIndex = stateC.recordedFrames.length - 1;
    const rewindInterval = setInterval(() => {
      if (rewindIndex <= 0) {
        clearInterval(rewindInterval);
        playForward(); // Запускаем обычное воспроизведение
        return;
      }

      rewindIndex -= 3; // Скорость перемотки
      if (rewindIndex < 0) rewindIndex = 0;

      const frame = stateC.recordedFrames[rewindIndex];
      document.getElementById('replay-playerC').style.left = frame.x + 'px';
      document.getElementById('replay-playerC').style.top = frame.y + 'px';
    }, 16); // ~60fps
  }

  // Воспроизведение вперед
  function playForward() {
    let forwardIndex = 0;
    const replayInterval = setInterval(() => {
      const replayPlayer = document.getElementById('replay-playerC');

      if (forwardIndex >= stateC.recordedFrames.length) {
        replayPlayer.style.display = 'none';
        doorDef.style.display = 'none';
        doorOpen.style.display = 'none';
        doorClose.style.display = 'block';
        clearInterval(replayInterval);
        // gameAgood = false;
        // gameBgood = false;
        // setTimeout(() => initGame(), 2000); // Перезапуск через 2 секунды
        return;
      }

      const frame = stateC.recordedFrames[forwardIndex];
      replayPlayer.style.left = frame.x + 'px';
      replayPlayer.style.top = frame.y + 'px';

      // Добавляем точку траектории
      if (forwardIndex % 1 === 0) {
        const dot = createTrailDot(frame.x + 14, frame.y + 14);
        stateC.replayTrail.push(dot);
      }

      forwardIndex++;
    }, 16); // Оригинальная скорость
  }

  // Проверка столкновений
  function checkCollisions() {
    const playerCenter = {
      x: state.playerX + config.playerSize / 2,
      y: state.playerY + config.playerSize / 2
    };

    const wallCenter = {
      x: config.gameWidth / 2,
      y: config.gameHeight / 2
    };

    // 1. Проверка сбора ключа
    if (!state.hasKey && isColliding(player, key)) {
      key.style.display = 'none';
      state.hasKey = true;
      doorDef.style.display = 'none';
      doorOpen.style.display = 'block';
      doorClose.style.display = 'none';
    }

    // 1. Проверка
    if (!state.isNoStep && isColliding(player, noStep)) {
      state.isNoStep = true;
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.timerInterval = setInterval(updateTimer, 60);
    }

    // 2. Проверка входа в дверь
    if (state.hasKey && isColliding(player, door)) {
      state.gameSuccess = true; // Устанавливаем флаг успеха
      endGame(true);
    }

    // 3. Проверка столкновения с круглой стеной
    checkWallCollision(playerCenter, wallCenter);

    // 4. Проверка границ игрового поля
    checkBoundaryCollision(playerCenter);
  }

  // Проверка столкновения с круглой стеной
  function checkWallCollision(playerCenter, wallCenter) {
    const dx = playerCenter.x - wallCenter.x;
    const dy = playerCenter.y - wallCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = config.wallRadius + config.playerSize / 2;

    if (distance < minDistance) {
      const nx = dx / distance;
      const ny = dy / distance;
      const dotProduct = state.velX * nx + state.velY * ny;
      state.velX -= nx * dotProduct * 0.85;
      state.velY -= ny * dotProduct * 0.85;
      const repel = (minDistance - distance) * 0.1;
      state.velX += nx * repel;
      state.velY += ny * repel;
      state.playerX = wallCenter.x + nx * minDistance - config.playerSize / 2;
      state.playerY = wallCenter.y + ny * minDistance - config.playerSize / 2;
    }
  }

  // Проверка столкновения с границами
  function checkBoundaryCollision(playerCenter) {
    const cornerRadius = config.cornerRadius;
    const width = config.gameWidth;
    const height = config.gameHeight;
    const playerRadius = config.playerSize / 2;
    const effectiveRadius = cornerRadius - playerRadius;

    let inCorner = false;
    let cornerCenter = { x: 0, y: 0 };

    if (playerCenter.x < cornerRadius && playerCenter.y < cornerRadius) {
      inCorner = true;
      cornerCenter = { x: cornerRadius, y: cornerRadius };
    }
    else if (playerCenter.x > width - cornerRadius && playerCenter.y < cornerRadius) {
      inCorner = true;
      cornerCenter = { x: width - cornerRadius, y: cornerRadius };
    }
    else if (playerCenter.x < cornerRadius && playerCenter.y > height - cornerRadius) {
      inCorner = true;
      cornerCenter = { x: cornerRadius, y: height - cornerRadius };
    }
    else if (playerCenter.x > width - cornerRadius && playerCenter.y > height - cornerRadius) {
      inCorner = true;
      cornerCenter = { x: width - cornerRadius, y: height - cornerRadius };
    }

    if (inCorner) {
      const dx = playerCenter.x - cornerCenter.x;
      const dy = playerCenter.y - cornerCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > effectiveRadius) {
        const nx = dx / distance;
        const ny = dy / distance;
        state.playerX = cornerCenter.x + nx * effectiveRadius - playerRadius;
        state.playerY = cornerCenter.y + ny * effectiveRadius - playerRadius;
        const dotProduct = state.velX * nx + state.velY * ny;
        state.velX -= nx * dotProduct * 1.5;
        state.velY -= ny * dotProduct * 1.5;
      }
    } else {
      if (state.playerX < 0) {
        state.playerX = 0;
        state.velX *= -0.5;
      }
      if (state.playerX > width - config.playerSize) {
        state.playerX = width - config.playerSize;
        state.velX *= -0.5;
      }
      if (state.playerY < 0) {
        state.playerY = 0;
        state.velY *= -0.5;
      }
      if (state.playerY > height - config.playerSize) {
        state.playerY = height - config.playerSize;
        state.velY *= -0.5;
      }
    }
  }

  // Проверка столкновения двух элементов
  function isColliding(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  // Завершение игры
  function endGame(success) {
    if (state.isGameOver) return;
    state.isGameOver = true;
    state.gameSuccess = success;

    clearInterval(state.timerInterval);
    pl1.style.display = 'none';
    pl2.style.display = 'block';
    key1.style.display = 'none';
    key2.style.display = 'block';

    doorDef.style.display = 'block';
    doorOpen.style.display = 'none';
    doorClose.style.display = 'none';
    gameContainer.style.background = '#333'


    // Сброс управления
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;
    if (!gameOpenFun) {
      timer.style.display = 'none'

      return
    }

    if (success) {
      // message.textContent = `Успех! Уровень пройден!`;
      gameContainer.style.background = '#fff'
      player.style.display = 'none'
      key1.style.display = 'block';
      key2.style.display = 'none';

      doorDef.style.display = 'none';
      doorOpen.style.display = 'none';
      doorClose.style.display = 'block';
      setTimeout(() => {
        timer.style.display = 'none';
      }, 1000);

      gameCgood = true
      goReplay = true;
      setTimeout(() => gameA(), 1000); // Перезапуск через 2 секунды
      return

      if (state.enableRewind) {
        startReplay();
        return;
      }
    } else {
      // message.textContent = `Время вышло!`;
    }

    timer.style.display = 'none'

    state.restartTimer = setTimeout(initGame, 1000);
  }

  // Игровой цикл
  function gameLoop() {
    if (!gameOpenFun) {
      endGame()
    }
    if (state.isGameOver || stateC.isReplaying) {

      requestAnimationFrame(gameLoop);
      // console.log('уровень пройден')
      return;
    }
    // Управление
    if (keys['ArrowUp']) state.velY -= state.speed;
    if (keys['ArrowDown']) state.velY += state.speed;
    if (keys['ArrowLeft']) state.velX -= state.speed;
    if (keys['ArrowRight']) state.velX += state.speed;

    // Инерция
    state.velX *= state.friction;
    state.velY *= state.friction;

    // Ограничение скорости
    const currentSpeed = Math.sqrt(state.velX * state.velX + state.velY * state.velY);
    if (currentSpeed > state.maxSpeed) {
      state.velX = (state.velX / currentSpeed) * state.maxSpeed;
      state.velY = (state.velY / currentSpeed) * state.maxSpeed;
    }

    // Обновление позиции
    state.playerX += state.velX;
    state.playerY += state.velY;

    // Запись позиции
    recordFrame();

    // Проверка столкновений
    checkCollisions();

    // Обновление позиции игрока
    player.style.left = state.playerX + 'px';
    player.style.top = state.playerY + 'px';

    // В игровом цикле замените блок наклона на этот:
    const isMoving = Math.abs(state.velX) > 0.1 || Math.abs(state.velY) > 0.1;

    if (isMoving) {
      // Добавляем класс с анимацией прыжка
      if (!player.classList.contains('jumping')) {
        player.classList.add('jumping');
      }

      // Сохраняем наклон в сторону движения
      const tiltX = state.velX * 8;
      const tiltY = state.velY * 8;
      player.style.transform = `rotateX(${tiltY}deg) rotateY(${-tiltX}deg)`;
    } else {
      // Убираем анимацию при остановке
      player.classList.remove('jumping');
      player.style.transform = 'none';
    }

    requestAnimationFrame(gameLoop);
  }

  // Запуск игры
  initGame();
  gameLoop();
}






// // Для каждого блока храним его исходный translate
// const blockTranslates = new Map();

// allBoxParts.forEach(block => {
//   // Извлекаем translate из текущего transform
//   const style = window.getComputedStyle(block);
//   const transform = style.transform || style.webkitTransform;

//   let translate = 'translate(0, 0)';
//   if (transform !== 'none') {
//     const translateMatch = transform.match(/translate(3d)?\((.+?)\)/);
//     if (translateMatch) {
//       translate = translate(`${translateMatch[2]}`);
//     }
//   }

//   // Сохраняем translate для блока
//   blockTranslates.set(block, translate);
// });

// // Анимация качания (±10°)
// function animateBlock(block, delay) {
//   const translate = blockTranslates.get(block);
//   let currentRotate = getCurrentRotation(block);
//   const swayRange = 10;

//   const applyAnimation = () => {
//     // 1. Качаем вправо (+10°)
//     currentRotate += swayRange;
//     block.style.transform = `${translate} rotate(${currentRotate}deg)`;

//     // 2. Качаем влево (-10°)
//     setTimeout(() => {
//       currentRotate -= swayRange * 2;
//       block.style.transform = `${translate} rotate(${currentRotate}deg)`;
//     }, 1000);

//     // 3. Возвращаемся к исходному углу
//     setTimeout(() => {
//       currentRotate += swayRange;
//       block.style.transform = `${translate} rotate(${currentRotate}deg)`;
//     }, 2000);

//     // Зацикливаем
//     setTimeout(applyAnimation, 3000);
//   };

//   // Старт с задержкой
//   setTimeout(applyAnimation, delay);
// }

// // Запускаем анимацию для всех блоков
// allBoxParts.forEach((block, index) => {
//   animateBlock(block, index * 300);
// });

// // Функция для получения текущего rotate
// function getCurrentRotation(element) {
//   const style = window.getComputedStyle(element);
//   const transform = style.transform || style.webkitTransform;

//   if (transform === 'none') return 0;

//   const rotateMatch = transform.match(/rotate\((.+?)deg\)/);
//   return rotateMatch ? parseFloat(rotateMatch[1]) : 0;
// }




















//парящий эффект
// let goFunkcFly = false
// function createProgflake() {

//   const progflake = document.createElement('div');
//   progflake.className = 'flyDownElements';
//   // прекращаем работу функции
//   if (!goFunkcFly) {
//     clearInterval();
//     return;
//   }
//   progflake.style.color = '#4f4f4f';
//   // progflake.style.zIndex = 55;


//   progflake.textContent = 'l'

//   // let iconockkaP = Math.floor(Math.random() * (7 - 1) + 1); // округление до целого Рандомный iconochka
//   // switch (iconockkaP) {
//   //   case 1: {
//   //     progflake.textContent = 'C++';
//   //     break;
//   //   }
//   //   case 2: {
//   //     progflake.textContent = 'C#';
//   //     break;
//   //   }
//   //   case 3: {
//   //     progflake.textContent = 'Python';
//   //     break;
//   //   }
//   //   case 4: {
//   //     progflake.textContent = 'Css';
//   //     break;
//   //   }
//   //   case 5: {
//   //     progflake.textContent = 'HTML';
//   //     break;
//   //   }
//   //   case 6: {
//   //     progflake.textContent = 'JS';
//   //     break;
//   //   }
//   //   default:
//   //     break;
//   // }

//   progflake.style.left = Math.random() * window.innerWidth + 'px';//рандомное пололжение относительно окна
//   progflake.style.fontSize = Math.random() * (40 - 20) + 20 + 'px'; // Рандомный размер
//   progflake.style.animationDuration = Math.random() * (0.3 - 0.2) + 0.2 + 's'; // Рандомная скорость взлета
//   document.body.append(progflake);

//   setTimeout(() => {
//     progflake.remove();
//   }, parseFloat(progflake.style.animationDuration) * 1000);//продолжительность полета
// }
// //вызов функции с определенной частотой появления слов 
// setInterval(createProgflake, 10);





















const sponsors = document.querySelector('.sponsors');
const sponsorsPart = document.querySelectorAll('.sponsors .part');

const infoCube = document.querySelector('.infoCube');
const sponsLeftBox = document.querySelector('.sponsors .leftBox');

const infoCubeTitle = document.querySelector('.infoCube .title');
const infoCubeText = document.querySelector('.infoCube .text');


function blockButtonClicks(e) {
  e.preventDefault();
  e.stopPropagation();
}

sponsorsPart.forEach(btn => {
  btn.addEventListener('click', blockButtonClicks, { capture: true });
});



// !!!!!!!!!!!!!!!!!

// sponsorsPart.forEach(cube => {
//   let infoCubeClone;

//   cube.addEventListener('mouseenter', function () {
//     if (preloaderHide) {
//       setTimeout(() => {
//         sponsorsPart.forEach(btn => {
//           btn.removeEventListener('click', blockButtonClicks, { capture: true });
//         });
//       }, 1110);
//     }


//     let text = cube.textContent;
//     const arr = text.split(/\s+/)

//     infoCubeTitle.innerHTML = arr[1];
//     infoCubeText.innerHTML = text.replace(arr[1], '', 1);

//     infoCubeClone = infoCube.cloneNode(true);
//     sponsLeftBox.appendChild(infoCubeClone);

//     infoCubeClone.style.animation = 'openInfoCube 1s ease ';
//     infoCubeClone.classList.add('infoCubeOpen');

//   })

//   cube.addEventListener('mouseleave', function () {


//     infoCubeClone.classList.remove('infoCubeOpen');
//     infoCubeClone.classList.add('infoCubeClose');
//     uwu(infoCubeClone);
//   })

//   function uwu(infoCubeClone) {
//     setTimeout(() => { infoCubeClone.remove() }, 1000)
//   }
// })







//проверка на ошибки при перенаправлении на внешний ресурс
// const nextPageGood = document.querySelector('#nextPageGood');
const nextPage404 = document.querySelector('#nextPage404');

const blocking = document.querySelector('#blocking');

const fallbackUrl = 'error.html'; // Ваша страница 404

sponsorsPart.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    link.classList.add('selected');
    // blocking.style.display = 'block';
    // body.style.overflow = 'hidden';
    pageHidden();

    const url = this.dataset.url;
    preloader.style.display = 'block';
    preloader.style.opacity = '1';

    // Создаём скрытый iframe для проверки
    const testFrame = document.createElement('iframe');
    testFrame.style.display = 'none';
    testFrame.src = url;
    document.body.appendChild(testFrame);


    let isWorking = false; // Флаг "рабочий ли сайт"
    const timeout = 4500; // 4 секунды на проверку

    // Если iframe загрузился успешно
    testFrame.onload = () => {
      // setTimeout(() => {
      // nextPageGood.style.display = 'block';
      // }, 1800)



      setTimeout(() => {
        isWorking = true;
        cleanup();

        // nextPageGood.style.display = 'none';
        setTimeout(() => {

          pageVisibility();
          preloader.style.display = 'none';
          preloader.style.opacity = '0';
          link.classList.remove('selected');
        }, 50)

        window.open(url, '_blank'); // Открываем сайт
      }, 2300) // для более красивой загрузки сайта
    };

    // Если iframe не загрузился (ошибка или блокировка)
    testFrame.onerror = () => {
      cleanup();
      // Проверяем, был ли iframe заблокирован (например, Сбербанк)
      setTimeout(() => {
        try {
          // Пытаемся получить доступ к iframe (если заблокирован — будет ошибка)
          // const frameDoc = testFrame.contentDocument || testFrame.contentWindow.document;
          // Если дошли сюда — iframe загружен, но контент невидим (например, 404 внутри iframe)
          if (!isWorking) {
            setTimeout(() => {

              pageVisibility();
              preloader.style.display = 'none';
              preloader.style.opacity = '0';

              link.classList.remove('selected');

            }, 50)

            // preloader.style.display = 'none';
            // link.classList.remove('selected');
            // blocking.style.display = 'none';

            window.location.href = fallbackUrl;
            // window.open(fallbackUrl, '_blank'); // Открываем сайт

          }
        } catch (e) {
          // preloader.style.display = 'none';
          // link.classList.remove('selected');
          // blocking.style.display = 'none';

          setTimeout(() => {

            pageVisibility();
            preloader.style.display = 'none';
            preloader.style.opacity = '0';

            link.classList.remove('selected');

          }, 50)


          // Если iframe заблокирован (Сбербанк и т.д.) — считаем, что сайт рабочий
          window.open(url, '_blank');
        }
      }, 100);
    };

    // Таймер на случай, если iframe вообще не ответил

    setTimeout(() => {

      if (!isWorking) {
        // nextPageGood.style.display = 'block';

        setTimeout(() => {
          cleanup();
          // preloader.style.display = 'none';
          // link.classList.remove('selected');
          // blocking.style.display = 'none';
          // nextPageGood.style.display = 'none';
          setTimeout(() => {

            pageVisibility();
            preloader.style.display = 'none';
            preloader.style.opacity = '0';

            link.classList.remove('selected');


            // blocking.style.display = 'none';
            // body.style.overflow = 'auto';

          }, 50)

          window.location.href = fallbackUrl;
          // window.open(fallbackUrl, '_blank'); // Открываем сайт

        }, 500)
      }
    }, 4000);

    // Удаляем iframe после проверки
    function cleanup() {
      document.body.removeChild(testFrame);
    }
  });
});




















// const sponsors = document.querySelector('.sponsors');
// const cubesActive = document.querySelectorAll('.cubeActive');

// const infoCube = document.querySelector('.infoCube');
// const sponsLeftBox = document.querySelector('.sponsors .leftBox');

// const infoCubeTitle = document.querySelector('.infoCube .title');
// const infoCubeText = document.querySelector('.infoCube .text');


// function blockButtonClicks(e) {
//   e.preventDefault();
//   e.stopPropagation();
// }

// cubesActive.forEach(btn => {
//   btn.addEventListener('click', blockButtonClicks, { capture: true });
// });




// cubesActive.forEach(cube => {
//   let infoCubeClone;

//   cube.addEventListener('mouseenter', function () {
//     if (preloaderHide) {
//       setTimeout(() => {
//         cubesActive.forEach(btn => {
//           btn.removeEventListener('click', blockButtonClicks, { capture: true });
//         });
//       }, 1110);
//     }

//     // добавить  курицу с тапом по активацию по ентеру и управлением стрелочкаим

//     let text = cube.textContent;
//     const arr = text.split(/\s+/)

//     infoCubeTitle.innerHTML = arr[1];
//     infoCubeText.innerHTML = text.replace(arr[1], '', 1);

//     infoCubeClone = infoCube.cloneNode(true);
//     sponsLeftBox.appendChild(infoCubeClone);
//     // sponsors.appendChild(infoCubeClone);


//     infoCubeClone.style.animation = 'openInfoCube 1s ease ';
//     infoCubeClone.classList.add('infoCubeOpen');


//     // if (cube.classList.contains('cubeInRight')) {
//     //   infoCubeClone.style.animation = 'openInfoCubeRight 1s ease ';
//     //   infoCubeClone.classList.add('infoCubeOpenRight');
//     // }
//     // if (cube.classList.contains('cubeInLeft')) {
//     //   infoCubeClone.style.animation = 'openInfoCubeLeft 1s ease ';
//     //   infoCubeClone.classList.add('infoCubeOpenLeft');
//     // }
//   })

//   cube.addEventListener('mouseleave', function () {


//     infoCubeClone.classList.remove('infoCubeOpen');
//     infoCubeClone.classList.add('infoCubeClose');
//     uwu(infoCubeClone);


//     // if (cube.classList.contains('cubeInRight')) {
//     //   infoCubeClone.classList.remove('infoCubeOpenRight');
//     //   infoCubeClone.classList.add('infoCubeCloseRight');
//     //   uwu(infoCubeClone);
//     // }
//     // if (cube.classList.contains('cubeInLeft')) {
//     //   infoCubeClone.classList.remove('infoCubeOpenLeft');
//     //   infoCubeClone.classList.add('infoCubeCloseLeft');
//     //   uwu(infoCubeClone);
//     // }
//   })

//   function uwu(infoCubeClone) {
//     setTimeout(() => { infoCubeClone.remove() }, 1000)
//   }

// })







// //проверка на ошибки при перенаправлении на внешний ресурс
// // const nextPageGood = document.querySelector('#nextPageGood');
// const nextPage404 = document.querySelector('#nextPage404');

// const blocking = document.querySelector('#blocking');

// const fallbackUrl = 'error.html'; // Ваша страница 404

// cubesActive.forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     link.classList.add('selected');
//     // blocking.style.display = 'block';
//     // body.style.overflow = 'hidden';
//     pageHidden();

//     const url = this.dataset.url;
//     preloader.style.display = 'block';
//     preloader.style.opacity = '1';

//     // Создаём скрытый iframe для проверки
//     const testFrame = document.createElement('iframe');
//     testFrame.style.display = 'none';
//     testFrame.src = url;
//     document.body.appendChild(testFrame);


//     let isWorking = false; // Флаг "рабочий ли сайт"
//     const timeout = 4500; // 4 секунды на проверку

//     // Если iframe загрузился успешно
//     testFrame.onload = () => {
//       // setTimeout(() => {
//       // nextPageGood.style.display = 'block';
//       // }, 1800)



//       setTimeout(() => {
//         isWorking = true;
//         cleanup();

//         // nextPageGood.style.display = 'none';
//         setTimeout(() => {

//           pageVisibility();
//           preloader.style.display = 'none';
//           link.classList.remove('selected');
//         }, 50)

//         window.open(url, '_blank'); // Открываем сайт
//       }, 2300) // для более красивой загрузки сайта
//     };

//     // Если iframe не загрузился (ошибка или блокировка)
//     testFrame.onerror = () => {
//       cleanup();
//       // Проверяем, был ли iframe заблокирован (например, Сбербанк)
//       setTimeout(() => {
//         try {
//           // Пытаемся получить доступ к iframe (если заблокирован — будет ошибка)
//           // const frameDoc = testFrame.contentDocument || testFrame.contentWindow.document;
//           // Если дошли сюда — iframe загружен, но контент невидим (например, 404 внутри iframe)
//           if (!isWorking) {
//             setTimeout(() => {

//               pageVisibility();
//               preloader.style.display = 'none';
//               link.classList.remove('selected');

//             }, 50)

//             // preloader.style.display = 'none';
//             // link.classList.remove('selected');
//             // blocking.style.display = 'none';

//             window.location.href = fallbackUrl;
//             // window.open(fallbackUrl, '_blank'); // Открываем сайт

//           }
//         } catch (e) {
//           // preloader.style.display = 'none';
//           // link.classList.remove('selected');
//           // blocking.style.display = 'none';

//           setTimeout(() => {

//             pageVisibility();
//             preloader.style.display = 'none';
//             link.classList.remove('selected');

//           }, 50)


//           // Если iframe заблокирован (Сбербанк и т.д.) — считаем, что сайт рабочий
//           window.open(url, '_blank');
//         }
//       }, 100);
//     };

//     // Таймер на случай, если iframe вообще не ответил

//     setTimeout(() => {

//       if (!isWorking) {
//         // nextPageGood.style.display = 'block';

//         setTimeout(() => {
//           cleanup();
//           // preloader.style.display = 'none';
//           // link.classList.remove('selected');
//           // blocking.style.display = 'none';
//           // nextPageGood.style.display = 'none';
//           setTimeout(() => {

//             pageVisibility();
//             preloader.style.display = 'none';
//             link.classList.remove('selected');


//             // blocking.style.display = 'none';
//             // body.style.overflow = 'auto';

//           }, 50)

//           window.location.href = fallbackUrl;
//           // window.open(fallbackUrl, '_blank'); // Открываем сайт

//         }, 500)
//       }
//     }, 4000);

//     // Удаляем iframe после проверки
//     function cleanup() {
//       document.body.removeChild(testFrame);
//     }
//   });
// });










// document.addEventListener('DOMContentLoaded', function () {

//   const fallbackUrl = 'error.html'; // Ваша страница 404

//   cubesActive.forEach(link => {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();
//       link.classList.add('selected');
//       blocking.style.display = 'block';
//       body.style.overflow = 'hidden';


//       const url = this.dataset.url;
//       preloader.style.display = 'block';
//       preloader.style.opacity = '1';

//       // Создаём скрытый iframe для проверки
//       const testFrame = document.createElement('iframe');
//       testFrame.style.display = 'none';
//       testFrame.src = url;
//       document.body.appendChild(testFrame);

//       let isWorking = false; // Флаг "рабочий ли сайт"
//       const timeout = 4500; // 4 секунды на проверку

//       // Если iframe загрузился успешно
//       testFrame.onload = () => {
//         setTimeout(() => {
//           nextPageGood.style.display = 'block';
//         }, 1800)



//         setTimeout(() => {
//           isWorking = true;
//           cleanup();
//           preloader.style.display = 'none';
//           // preLoader.style.display = 'none';
//           link.classList.remove('selected');
//           blocking.style.display = 'none';
//           body.style.overflow = 'auto';
//           nextPageGood.style.display = 'none';

//           window.open(url, '_blank'); // Открываем сайт
//         }, 2300) // для более красивой загрузки сайта
//       };

//       // Если iframe не загрузился (ошибка или блокировка)
//       testFrame.onerror = () => {
//         cleanup();
//         // Проверяем, был ли iframe заблокирован (например, Сбербанк)
//         setTimeout(() => {
//           try {
//             // Пытаемся получить доступ к iframe (если заблокирован — будет ошибка)
//             const frameDoc = testFrame.contentDocument || testFrame.contentWindow.document;
//             // Если дошли сюда — iframe загружен, но контент невидим (например, 404 внутри iframe)
//             if (!isWorking) {
//               preloader.style.display = 'none';
//               link.classList.remove('selected');
//               blocking.style.display = 'none';

//               window.location.href = fallbackUrl;
//             }
//           } catch (e) {
//             preloader.style.display = 'none';
//             link.classList.remove('selected');
//             blocking.style.display = 'none';

//             // Если iframe заблокирован (Сбербанк и т.д.) — считаем, что сайт рабочий
//             window.open(url, '_blank');
//           }
//         }, 100);
//       };

//       // Таймер на случай, если iframe вообще не ответил

//       setTimeout(() => {

//         if (!isWorking) {
//           nextPageGood.style.display = 'block';

//           setTimeout(() => {
//             cleanup();
//             preloader.style.display = 'none';
//             link.classList.remove('selected');
//             blocking.style.display = 'none';
//             nextPageGood.style.display = 'none';

//             window.location.href = fallbackUrl;
//           }, 500)
//         }
//       }, 4000);

//       // Удаляем iframe после проверки
//       function cleanup() {
//         document.body.removeChild(testFrame);
//       }
//     });
//   });
// });












// function fNextPageOn() {
//   setTimeout(() => {
//     nextPageOn.style.display = 'none';
//   }, 500)
// }

// fNextPageOn();
// Инициализация







const butRegistration = document.querySelector('.splineBox .butRegistration');

butRegistration.addEventListener('click', (e) => {
  e.preventDefault();
  pageHidden();

  setTimeout(() => {

    window.location.href = butRegistration.dataset.href;
    setTimeout(() => {
      pageVisibility();
    }, 1000)

  }, 1100)
})








// const observerVis = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('visibleOne');

//       // Добавляем задержку для последовательного появления
//       const index = Array.from(items).indexOf(entry.target);
//       entry.target.style.transitionDelay = `${index * 0.1} s`;
//     }
//   });
// }, {
//   threshold: 0.1,
//   rootMargin: '0px 0px -50px 0px'
// });

// const items = document.querySelectorAll('#pageMain .grid > div');

// items.forEach((item) => {
//   item.classList.add('viss');
// })

// items.forEach((item, index) => {
//   //   progflake.className = 'flyDownElements';

//   item.style.transitionDelay = `${index * 0.1} s`;
//   observerVis.observe(item);
// });



// document.querySelectorAll('#pageMain .grid > div').forEach(item => {
//   // 1. Получаем текущий transform
//   const computedStyle = window.getComputedStyle(item);
//   const originalTransform = computedStyle.transform;

//   // 2. Проверяем, есть ли реальный transform (не матрица по умолчанию)
//   const hasCustomTransform = 
//     originalTransform !== 'none' && 
//     originalTransform !== 'matrix(1, 0, 0, 1, 0, 0)';

//   // 3. Добавляем анимацию появления
//   item.style.transform = 
//     `${hasCustomTransform ? originalTransform + ' ' : ''}translateY(30px);`
//   item.style.opacity = '0';
//   item.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

//   // 4. Наблюдаем за появлением
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.style.transform = hasCustomTransform ? originalTransform : 'none';
//         entry.target.style.opacity = '1';
//       }
//     });
//   }, { threshold: 0.1 });

//   observer.observe(item);
// });











// const goOnTop = document.querySelector('.goOnTop');
// const fillGo = document.querySelector('.goOnTop .fillGo');
const topPersent = document.querySelector('.goOnTop .percent');
const goOnTopSvg = document.querySelector('.goOnTop .svgIcon');

window.addEventListener('scroll', function () {
  const scrollHeight = document.documentElement.scrollHeight;
  // console.log(window.scrollY)
  const clientHeight = document.documentElement.clientHeight;
  const scrollableHeight = scrollHeight - clientHeight;
  const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;

  if (Math.round(scrolledPercentage) >= 30) {
    goOnTop.classList.remove('notShow');
  }
  else {
    goOnTop.classList.add('notShow');
  }
  // console.log(`Проскроллено ${Math.round(scrolledPercentage)}% страницы`);
  // fillGo.style.height = 58 / 100 * Math.round(scrolledPercentage) + 'px';
  topPersent.textContent = Math.round(scrolledPercentage);

  if (Math.round(scrolledPercentage) == 100) {
    topPersent.classList.add('none')
    goOnTopSvg.classList.add('up')
    goOnTop.classList.add('up')
  }
  else {
    topPersent.classList.remove('none')
    goOnTopSvg.classList.remove('up')
    goOnTop.classList.remove('up')
  }
});

let flagScrollTop = true
goOnTop.addEventListener('click', function () {
  if (flagScrollTop) {
    flagScrollTop = false
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    goOnTopSvg.classList.add('go')

    setTimeout(() => {
      flagScrollTop = true
      goOnTopSvg.classList.remove('go')
    }, 1100)
  }
})













document.querySelectorAll('#pageMain .grid > div').forEach(item => {
  // if (item.classList.contains('gameContainerBox')) return;

  // Сохраняем оригинальные значения в data-атрибутах
  item.dataset.originalOpacity = window.getComputedStyle(item).opacity;
  item.dataset.originalTransform = window.getComputedStyle(item).transform;

  // Устанавливаем начальное состояние для анимации
  item.style.opacity = '0';
  item.style.transform = item.dataset.originalTransform === 'none'
    ? 'translateY(30px)'
    : `${item.dataset.originalTransform} translateY(30px)`;
  item.style.transition = 'transform 0.7s ease, opacity 0.7s ease';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Возвращаем оригинальные значения
        entry.target.style.opacity = entry.target.dataset.originalOpacity;
        entry.target.style.transform = entry.target.dataset.originalTransform;

        setTimeout(() => {
          // Полностью очищаем inline-стили и data-атрибуты
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
          entry.target.style.transition = '';
          delete entry.target.dataset.originalOpacity;
          delete entry.target.dataset.originalTransform;
        }, 700);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(item);
});

