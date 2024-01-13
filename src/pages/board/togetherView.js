/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-use-before-define */

import gsap from 'gsap';
import { pb, getNode, getNodes, insertLast, clearContents } from '/src/lib/';

const categoryEmojiObject = {
  프로젝트: '💻',
  스터디: '📝',
  음식: '🍝',
  '취미/여가': '🎧',
  운동: '⚽',
  독서: '📚',
};

function createTemplate(item) {
  const { category, isOpen, title, date, description, members, maxMember } =
    item;
  let { age, gender } = item;
  const { id, avatar, name } = item.expand.user;
  const openState = isOpen ? '모집중' : '모집완료';
  const openStateClass = isOpen
    ? 'text-secondary'
    : 'text-contents-content-secondary';
  gender = gender === '누구나' ? `${gender} 참여가능` : `${gender}만 참여가능`;
  age = age === '모든 연령' ? age : `${age}대`;
  const ownerProfileImgUrl = pb.files.getUrl(item.expand.user, avatar, {
    thumb: '50x0',
  });
  const isMember = members.indexOf(pb.authStore.model.id) > -1;

  const articleTemplate = /* html */ `
    <article class="px-3 py-6 flex flex-col items-start gap-2">
    <span
      class="inline-block pl-[7px] pr-2 py-0.5 bg-bluegray-500 text-label-sm text-white rounded"
      >${categoryEmojiObject[category]} ${category}</span
    >
    <h2 class="text-label-lg font-medium">
      <span class="${openStateClass}">${openState}</span> ${title}
    </h2>
    <div>
      <span
        class="block pl-[22px] text-paragraph-md font-normal bg-people-icon bg-no-repeat bg-left bg-[length:14px_14px]"
        >${age} ${gender}</span
      >
      <span
        class="block pl-[22px] text-paragraph-md font-normal bg-calender_black-icon bg-no-repeat bg-left bg-[length:14px_14px]"
        >${new Date(date).toLocaleDateString()}</span
      >
    </div>
    <p class="text-paragraph-md font-normal leading-[160%]">${description}</p>
  </article>
  <div class="px-3 py-4 mb-[74px] flex flex-col gap-[13px]">
    <span class="text-label-md"
      >참여중인 이웃 <span class="text-secondary">${
        members.length
      }</span>/${maxMember}</span
    >
    <div class=" h-[40px] flex items-center gap-2">
      <div class="w-[30px] h-[30px] rounded-full bg-contents-content-secondary overflow-hidden">
        ${
          ownerProfileImgUrl
            ? `<img
        class="bg-gray-300"
        src="${ownerProfileImgUrl}"
        alt="프로필 이미지"
      />`
            : ''
        }
      </div>
      <div
        class="h-full text-paragraph-sm font-normal flex flex-col justify-center"
      >
        <p class="h-1/2 flex items-center">
          ${name}
          <span
            class="pl-[21px] ml-2 flex items-center h-full text-gray-600 bg-organizer-icon bg-no-repeat bg-left"
            >모임장</span
          >
        </p>
        <span class="h-1/2 flex items-center text-gray-600"
          >연남동 인증 4회</span
        >
      </div>
    </div>
  </div>
  `;
  let buttonText = '모임 가입하기';
  if (isMember) buttonText = '채팅방으로 이동';
  if (!isMember && !isOpen) buttonText = '모집이 마감되었습니다.';
  const buttonTemplate = /* html */ `
    <button
    id="join"
    class="w-full h-[45px] text-label-md text-white bg-secondary rounded disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed hover:brightness-90 transition-all duration-300"
    ${isOpen ? '' : 'disabled'}
  >
    ${buttonText}
  </button>
  `;
  return { article: articleTemplate, button: buttonTemplate };
}

function render(template) {
  clearContents('#article');
  clearContents('footer');
  const { article, button } = template;
  insertLast('#article', article);
  insertLast('footer', button);
  const tl = gsap.timeline();
  tl.from('#article>*', {
    y: 50,
    opacity: 0,
    stagger: 0.1,
  }).from(
    'footer',
    {
      y: 50,
      opacity: 0,
    },
    '-=0.2'
  );
}

const handlerObject = {
  handleJoin(pbData) {
    console.log('handlejoin');
    const { members: prevMembers } = pbData;
    const myId = pb.authStore.model.id;
    // 가입 로직
    return async (e) => {
      try {
        const response = await pb.collection('together').update(pbData.id, {
          members: [...prevMembers, myId],
        });
        alert('가입이 완료되었습니다.');
        console.log(response);
        getData();
      } catch (error) {
        alert(
          '가입 도중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
        console.error(error);
      }
    };
  },
  handleGoChat() {
    // 채팅방 이동 로직
    return (e) => {
      console.log('handlegochat');
    };
  },
};
function attachButtonHandler(handlerObj, pbData) {
  if (!pbData.isOpen) return;
  const button = getNode('footer > button');
  console.log(button);
  const isMember = pbData.members.indexOf(pb.authStore.model.id) > -1;
  const handler = isMember ? handlerObj.handleGoChat : handlerObj.handleJoin;
  button.addEventListener('click', handler(pbData));
}

async function getData() {
  const idParam = new URL(window.location.href).searchParams.get('id');
  const response = await pb.collection('together').getOne(idParam, {
    expand: 'user',
  });
  render(createTemplate(response));
  attachButtonHandler(handlerObject, response);
}
getData();
