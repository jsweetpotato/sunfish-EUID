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
    plusButton.insertAdjacentHTML(
      'beforebegin' /* html */,
      `
    <div id='span-tag' class="flex flex-col absolute left-[-82px] w-full min-w-screen max-w-screen">
      <div class="fixed bottom-36 flex flex-col items-center gap-1">
        <a href="/src/pages/exchange/index.html" class="px-[20px] py-[10px] bg-white w-full grow text-label-md self-stretch rounded-[60px]">🎧 기기거래</a>
        <a href="#" class="px-[20px] py-[10px] bg-white text-label-md  w-full grow rounded-[60px]">⌨️ 프로젝트 구인</a>
        <a href="#" class="px-[20px] py-[10px] bg-white text-label-md  w-full grow self-stretch rounded-[60px]">💻 과외/클래스</a>
      </div>
    </div>
    `
    );

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


