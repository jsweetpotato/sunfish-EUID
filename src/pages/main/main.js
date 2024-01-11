import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { getNode } from '/src/lib/';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay, Keyboard],
  slidesPerView: 1,
  slidesPerGroup: 1,
  direction: 'horizontal',

  pagination: {
    type: 'bullets',
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  keyboard: {
    enabled: true,
  },
});

const main = getNode('#main');

// const handleWheel = (() => {
//   let beforeWheelDelta = 0;
//   let currentWheelDelta = 0;
//   return (e) => {
//     currentWheelDelta = e.wheelDelta;
//     if (currentWheelDelta === beforeWheelDelta) return;

//     if (currentWheelDelta > 0) {
//       console.log('휠올림');
//       getNode('#swiper-container').classList.replace(
//         'aspect-[1/0.2]',
//         'aspect-[1.5/1]'
//       );
//     } else {
//       console.log('휠내림');
//       getNode('#swiper-container').classList.replace(
//         'aspect-[1.5/1]',
//         'aspect-[1/0.2]'
//       );
//     }
//     beforeWheelDelta = currentWheelDelta;
//   };
// })();
// main.addEventListener('wheel', handleWheel);

// const handleScroll = (() => {
//   const beforeScroll = {
//     mount: 0,
//     direction: 'up',
//   };
//   const CurrrentScroll = {
//     mount: 0,
//     direction: 'down',
//   };
//   return (e) => {
//     const gap = e.target.scrollTop - beforeScroll.mount;
//     CurrrentScroll.direction = gap > 0 ? 'down' : 'up';
//     if (beforeScroll.direction === CurrrentScroll.direction) return;
//     if (gap < 0) {
//       console.log('휠올림');
//       getNode('#swiper-container').classList.replace(
//         'aspect-[1/0.2]',
//         'aspect-[1.5/1]'
//       );
//     }
//     if (gap > 0) {
//       console.log('휠내림');
//       getNode('#swiper-container').classList.replace(
//         'aspect-[1.5/1]',
//         'aspect-[1/0.2]'
//       );
//     }
//     beforeScroll.mount = CurrrentScroll.mount;
//     beforeScroll.direction = CurrrentScroll.direction;
//   };
// })();
// main.addEventListener('scroll', handleScroll);
