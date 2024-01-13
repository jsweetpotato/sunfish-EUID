/* eslint-disable no-param-reassign */
import { getNode, getNodes } from '/src/lib';
import list from './exchangeData';
import { createModal1Btn } from '../../components/Modal/Modal';

const modals = getNodes('.modal');
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

function showingModal(e) {
  e.preventDefault();
}

list();

modals.forEach((item) => {
  item.addEventListener('click', showingModal);
  const [modal, button] = createModal1Btn({
    title: '서비스 준비중입니다',
    desc: '빠른시일 내에 업데이트 할게요~이용에 불편을 드려 죄송합니다!',
    buttonText: '확인',
  });
  item.addEventListener('click', modal.showing)
  button.addEventListener('click', modal.closing);
})
plusButton.addEventListener('click', show);
plusButton.addEventListener('click', toggle);


