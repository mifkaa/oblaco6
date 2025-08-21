const body = document.querySelector('body')
const onPage = document.querySelector('#onPage')
const nextPageGood = document.querySelector('#nextPageGood');

onPage.style.display = 'block'
setTimeout(() => {
  onPage.style.display = 'none'
}, 500)




const header = document.querySelector('header');

const labelSvg = document.querySelector('.label svg');
labelSvg.addEventListener('click', function () {
  location.reload()
})



// function fNextPageOn() {
//   setTimeout(() => {
//     nextPageOn.style.display = 'none';
//   }, 500)
// }

// fNextPageOn();


const menuA = document.querySelectorAll('.menu a');
menuA.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    nextPageGood.style.display = 'block';
    setTimeout(() => {
      window.location.href = link.dataset.href;
      nextPageGood.style.display = 'none';


    }, 500)
  })
})




const onTheMain = document.querySelector('.onTheMain');
onTheMain.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = onTheMain.dataset.href;
})


const psHover = document.querySelector('footer .psHover');
const blockBack = document.querySelector('footer .blockBack');


psHover.addEventListener('mouseenter', function () {

  blockBack.classList.add('open')
})

psHover.addEventListener('mouseleave', function () {

  blockBack.classList.remove('open')
})


