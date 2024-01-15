import gsap from 'gsap';
import { getNode, getNodes, insertFirst } from '../../lib';
import list from './exchangeData';
import { createModal1Btn } from '../../components/Modal/Modal';

const alarm = getNode('#alarm');
const modalTargetList = getNodes('.modal');
const writeButton = getNode('#write');

const subMenuObj = {
  'exchange/exchangeMake': '🎧 기기거래',
  '': '⌨️ 프로젝트 구인',
  '#': '💻 과외/클래스',
};

const [modal, button] = createModal1Btn({
  title: '서비스 준비중입니다',
  desc: '빠른시일 내에 업데이트 할게요~이용에 불편을 드려 죄송합니다!',
  buttonText: '확인',
});

function showingModal(e) {
  e.preventDefault();
  modal.showing();
}

const subMenu = Object.entries(subMenuObj)
  .map(([key, value]) => {
    if (key === '' || key === '#') {
      return /* html */ `
        <a
        class="submenu-item block px-4 py-2.5 text-label-md rounded-full bg-white hover:bg-secondary hover:text-white"
        onclick="event.preventDefault();"
        >${value}</a
      >
        `;
    }
    return /* html */ `
        <a
        href="/src/pages/${key}.html"
        class="submenu-item block px-4 py-2.5 text-label-md rounded-full bg-white hover:bg-secondary hover:text-white"
        >${value}</a
      >
        `;
  })
  .join('');

const writeMenuTemplate = /* html */ ` <nav id="write-menu" class="w-full flex flex-col gap-2">${subMenu}</nav>`;

function toggleSubMenu(isClicked) {
  if (!isClicked) {
    const tl = gsap.timeline();
    insertFirst('#write-container', writeMenuTemplate);
    tl.to('#dimmed', {
      display: 'block',
      opacity: 1,
      duration: 0.05,
    }).from(
      '#write-menu > *',
      {
        opacity: 0,
        y: 50,
        stagger: 0.04,
        reversed: true,
      },
      '<'
    );
  } else {
    getNode('#write-menu').remove();
    gsap.to('#dimmed', {
      display: 'none',
      opacity: 0,
      duration: 0.5,
    });
  }
}

function toggle(node) {
  node.classList.toggle('bg-plus-icon');
  node.classList.toggle('bg-exchange-close-icon');
  node.classList.toggle('bg-white');
  node.classList.toggle('bg-secondary');
}

function handleClickWriteButton() {
  let isClicked = false;
  return (e) => {
    toggle(e.target);

    toggleSubMenu(isClicked);

    isClicked = !isClicked;
  };
}

writeButton.addEventListener('click', handleClickWriteButton());

getNode('#dimmed').addEventListener('click', () => {
  gsap.to('#dimmed', {
    display: 'none',
    opacity: 0,
    duration: 0.5,
  });
  writeButton.click();
});

// 모달 제어
modalTargetList.forEach((item) => {
  item.addEventListener('click', showingModal);
});
alarm.addEventListener('click', showingModal);

button.addEventListener('click', modal.closing);

list();
