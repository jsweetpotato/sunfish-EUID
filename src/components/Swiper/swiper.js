// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const swiper = new Swiper(".swiper", {  
    modules: [Navigation, Pagination],
    speed: 400,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
  });