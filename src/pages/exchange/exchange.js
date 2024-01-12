/* eslint-disable no-param-reassign */
import { getNode } from '/src/lib';
import list from './exchangeData';


const plusButton = getNode('#plusButton');
const body = getNode('#body');
const section = getNode('.content');
let plusClickCount = 0;
let isClick = false;

let createCategory;

function show(){
  plusClickCount+=1;

  if(plusClickCount % 2 !== 0 ){
    body.style.background = 'rgba(0, 0, 0, 0.30)';
    section.style.filter = 'brightness(50%)';
    plusButton.insertAdjacentHTML('beforebegin', /* html */
    `
    <div id='span-tag' class="flex flex-col absolute left-[-78px] w-full min-w-screen max-w-screen">
      <div class="fixed bottom-36 flex flex-col w-[133px] items-center gap-1">
        <a href="/src/pages/exchange/index.html" class="bg-exchange-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></a>
        <span class="bg-project-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
        <span class="bg-study-icon h-10 px-[20px] py-[10px] self-stretch rounded-[60px]"></span>
      </div>
    </div>
    `);

    createCategory = document.querySelector('#span-tag');
  }else {
    body.style.background='';
    section.style.filter='';
    if(createCategory) {
      createCategory.remove();
    }
  }
}

function toggle(){
  isClick = !isClick
  this.classList.toggle('bg-plus-icon');
  this.classList.toggle('bg-exchange-close-icon');
  this.classList.toggle('bg-white');
  this.classList.toggle('bg-secondary');
}


list();

plusButton.addEventListener('click', show);
plusButton.addEventListener('click', toggle);


