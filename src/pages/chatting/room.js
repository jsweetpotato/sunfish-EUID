/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-use-before-define */

import gsap from 'gsap';
import {
  pb,
  getNode,
  insertLast,
  clearContents,
  endScroll,
  checkAuth,
  comma,
} from '/src/lib/';
import { createModal1Btn } from '/src/components/Modal/Modal';

(async function init() {
  if (!checkAuth()) return;
  const idParam = new URL(window.location.href).searchParams.get('id');
  const response = await pb.collection('chatroom').getOne(idParam, {
    fields: 'members, originType',
  });
  if (!idParam || response.members.indexOf(pb.authStore.model.id) < 0) {
    alert('잘못된 접근입니다.');
    window.location.href = '/src/pages/main/';
  }

  await getData(response.originType);
  endScroll(getNode('main'));
  pb.collection('chatroom').subscribe(idParam, ({ action, record }) => {
    const { members, originType } = record;
    const lastMessageBox = record.messageBox.pop();
    let memberCount;
    if (originType === 'together') {
      memberCount = getNode('#member-count');
      memberCount.textContent = members.length;
    }
    if (lastMessageBox.senderId !== pb.authStore.model.id) {
      const template = createMessageBox([lastMessageBox]);
      insertLast('#message-box', template);
      endScroll(getNode('main'));
    }
  });
})();

function createMessageBox(box) {
  const boxArray = [];
  if (box.length === 0) {
    return `
    <li class="sorry p-2 flex flex-col text-center">
    <p class="text-paragraph-md text-gray-200">이전 채팅 내역이 없습니다.</p>
  </li>
    `;
  }
  box.forEach((msg) => {
    const { created, message, senderAvatar, senderId, senderName } = msg;
    const isMe = senderId === pb.authStore.model.id;
    let template = '';
    if (isMe) {
      template = /* html */ `
      <li class="px-3 w-full">
      <div class="flex gap-1 justify-end">
        <span class="mt-auto text-paragraph-sm align-bottom"
          >${new Date(created).toLocaleString().slice(6, -3)}</span
        >
        <span
          class="px-[14px] py-2 max-w-[248px] text-paragraph-md text-white bg-secondary rounded-[20px]"
          >${message}</span
        >
      </div>
    </li>
      `;
    } else {
      template = /* html */ `
      <li class="px-3 w-full">
      <div class="flex gap-2 justify-start">
        <figure
          title="${senderName}"
          class="mt-1.5 w-[30px] h-[30px] bg-gray-100 shrink-0 rounded-full overflow-hidden"
        >
          <img
            class="w-full"
            src="${senderAvatar}"
            alt="${senderName}"
          />
        </figure>
        <div class="flex flex-col text-label-sm font-normal">
          <span>${senderName}</span>
          <span
            class="px-[14px] py-2 max-w-[248px] text-paragraph-md text-black bg-bluegray-100 rounded-[20px]"
            >${message}</span
          >
        </div>
        <span class="mt-auto text-paragraph-sm align-bottom"
          >${new Date(created).toLocaleString().slice(6, -3)}</span
        >
      </div>
    </li>
      `;
    }
    boxArray.push(template);
  });
  return boxArray.join('');
}

async function createTemplate(item) {
  const { originType, owner, members, messageBox } = item;
  const { members: expandMembers } = item.expand;
  const type =
    originType === 'together' ? 'togetherOriginId' : 'sellingOriginId';
  const ownerName = expandMembers.find((member) => member.id === owner).name;
  const productImageUrl = pb.files.getUrl(
    item.expand[type],
    item.expand[type].productImages,
    { thumb: '0x300' }
  );
  const sellingHeaderTemplate = /* html */ `
  <div class="flex justify-between items-center">
  <div class="flex gap-3 items-center">
    <a
      href="/src/pages/chatting/lobby.html"
      role="button"
      aria-label="돌아가기"
      class="bg-direction-icon block w-10 h-10 bg-no-repeat bg-center rotate-90 hover:bg-gray-100 hover:rounded transition-all duration-300"
    ></a>
    <p class="text-label-md">
      ${ownerName}
      <span
        class="px-1 py-[2px] text-label-sm font-normal align-middle text-secondary bg-blue-100 rounded-full"
        >37.8℃</span
      >
    </p>
  </div>
  <div class="flex items-center">
    <button
      id="more"
      type="button"
      aria-label="더보기"
      class="bg-hamburger-icon w-10 h-10 bg-no-repeat bg-center hover:bg-gray-100 hover:rounded transition-all duration-300"
    ></button>
  </div>
</div>
<a  href="/src/pages/exchange/exchangeDetail.html?id=${
    item.expand[type].id
  }" class="px-3 pt-2 pb-1 flex gap-2 hover:bg-gray-100">
    <figure class="w-[34px] h-[34px] rounded bg-gray-300 overflow-hidden">
      <img
        class="w-full object-cover"
        src="${productImageUrl}"
        alt=""
      />
    </figure>
  <div>
    <p class="text-label-sm">
      판매중 <span class="font-normal">${item.expand[type].title}</span>
    </p>
    <span class="text-label-sm">${comma(+item.expand[type].price)}</span>
  </div>
</a>
<div class="px-3 py-1 border-b border-b-contents-content-tertiary">
  <button
  id="reservation"
    class="pl-[27px] pr-3 py-1.5 text-paragraph-sm bg-calender_black-icon border border-contents-content-secondary rounded-md bg-white bg-no-repeat bg-[7px] bg-[length:14px_14px] hover:brightness-95 transition-all duration-300"
  >
    약속 잡기
  </button>
  <button
    id="pay"
    class="pl-[27px] pr-3 py-1.5 text-paragraph-sm bg-won-icon border border-contents-content-secondary rounded-md bg-white bg-no-repeat bg-[7px] bg-[length:14px_14px] hover:brightness-95 transition-all duration-300"
  >
    송금 하기
  </button>
</div>
  `;
  const togetherHeaderTemplate = /* html */ `
  <div
          class="flex justify-between items-center border-b border-b-contents-content-tertiary"
        >
          <div class="flex gap-3 items-center">
            <a
              href="/src/pages/chatting/lobby.html"
              role="button"
              aria-label="돌아가기"
              class="bg-direction-icon block w-9 h-9 bg-no-repeat bg-center rotate-90 hover:bg-gray-100 hover:rounded transition-all duration-300"
            ></a>
          </div>
          <h1 class="text-label-md max-[340px]:text-label-sm">
          ${item.expand[type].title} 대화방
          <span id="member-count" class="text-contents-content-secondary">${members.length}</span>
        </h1>
          <div class="flex items-center">
            <button
              id="more"
              type="button"
              aria-label="더보기"
              class="bg-hamburger-icon w-9 h-9 bg-no-repeat bg-center hover:bg-gray-100 hover:rounded transition-all duration-300"
            ></button>
          </div>
        </div>
  `;
  const messageBoxTemplate = createMessageBox(messageBox);
  return {
    header:
      originType === 'together'
        ? togetherHeaderTemplate
        : sellingHeaderTemplate,
    messageBox: messageBoxTemplate,
  };
}

function render(template) {
  clearContents('#header-inner');
  clearContents('#message-box');
  const { header, messageBox } = template;
  insertLast('#header-inner', header);
  insertLast('#message-box', messageBox);
  const tl = gsap.timeline();
  tl.from('#header-inner', {
    y: 50,
    opacity: 0,
    duration: 0.2,
  }).from('#message-box>*', {
    y: 50,
    opacity: 0,
    duration: 0.2,
    delay: -0.1,
  });
}

async function getData(type) {
  const originType = type;
  const idParam = new URL(window.location.href).searchParams.get('id');
  const response = await pb.collection('chatroom').getOne(idParam, {
    expand: `members, ${originType}OriginId`,
  });
  render(await createTemplate(response));
  sendButton.addEventListener('click', throttle(handleSendComment));
  const [modal, button] = createModal1Btn({
    title: '😭서비스 준비중입니다.',
    desc: '열심히 준비중이예요💦<br> 조금만 기다려주세요',
    buttonText: '알겠어요',
  });
  button.addEventListener('click', () => modal.closing());
  getNode('#more').addEventListener('click', () => modal.showing());
  getNode('#reservation')?.addEventListener('click', () => modal.showing());
  getNode('#pay')?.addEventListener('click', () => modal.showing());
}

const sendButton = getNode('#send');
async function handleSendComment(e) {
  const input = e.target.previousElementSibling;
  if (input.value.replace(/\s/g, '') === '') {
    input.classList.replace('border-transparent', 'border-red-500');
    setTimeout(
      () => input.classList.replace('border-red-500', 'border-transparent'),
      1000
    );
  } else {
    const idParam = new URL(window.location.href).searchParams.get('id');
    const { id, name, avatar } = pb.authStore.model;
    const url = pb.files.getUrl(pb.authStore.model, avatar, { thumb: '50x0' });
    const messageObj = {
      created: new Date().getTime(),
      senderId: id,
      senderName: name,
      senderAvatar: url,
      message: input.value,
    };
    input.value = '';
    const messageBoxField = await pb.collection('chatroom').getOne(idParam, {
      fields: 'messageBox',
    });

    await pb.collection('chatroom').update(idParam, {
      messageBox: [...messageBoxField.messageBox, messageObj],
    });
    const template = createMessageBox([messageObj]);
    insertLast('#message-box', template);
    endScroll(getNode('main'));
  }
}
function throttle(callback, limit = 1000) {
  let isWaiting = false;
  return (e) => {
    e.preventDefault();
    if (!isWaiting) {
      callback(e);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, limit);
    } else alert('성격이 급하신 것 같아요. 천천히 눌러주세요~');
  };
}
