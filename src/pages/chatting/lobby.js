/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-param-reassign, no-restricted-syntax */
/* eslint no-use-before-define : warn */

import gsap from 'gsap';
import {
  pb,
  getNode,
  getNodes,
  insertFirst,
  insertLast,
  clearContents,
  convertTime,
  checkAuth,
} from '/src/lib/';

function createTemplate(data) {
  const result = data
    .map((item) => {
      const { messageBox, updated, id, owner } = item;
      const { members, originId } = item.expand;
      const lastMessage = messageBox.pop()?.message;
      const ownerRecord = members.filter((member) => member.id === owner)[0];
      const ownerAvatarImgUrl = pb.files.getUrl(
        ownerRecord,
        ownerRecord.avatar,
        { thumb: '50x0' }
      );
      console.log(ownerAvatarImgUrl);
      return /* html */ `
    <li class="w-full p-3 border-b border-b-gray-100 hover:bg-gray-100">
    <a class="w-full flex items-center gap-3" href=${`/src/pages/chatting/room.html?id=${id}`}>
      <div class="w-[45px] h-full rounded-full overflow-hidden shrink-0 flex items-center">
        <img class="w-full aspect-square object-cover" src="${ownerAvatarImgUrl}" alt="${
          ownerRecord.name
        }" />
      </div>
  
      <div class="flex flex-col">
        <span class="min-w-[100px] text-label-md items-start overflow-hidden text-ellipsis"
          >${originId.title}<span
            class="ml-2 text-contents-content-secondary font-normal"
            >${members.length}</span
          >
          <span class="ml-2 text-label-sm text-contents-content-secondary shrink-0"
            >${convertTime(updated)}</span
          ></span
        >
        <span class="block text-paragraph-md text-contents-content-secondary"
          >${
            lastMessage?.slice(0, 25).concat('...') ||
            '채팅방에 메세지가 없습니다.'
          }</span
        >
      </div>
    </a>
  </li>
    `;
    })
    .join('');
  return result;
}

async function getData() {
  const myId = pb.authStore.model.id;
  const response = await pb.collection('chatroom').getFullList({
    filter: `members ~ "${myId}"`,
    expand: 'members, originId',
  });
  const sortResponse = response.sort(
    (a, b) => new Date(b.updated) - new Date(a.updated)
  );
  const template = createTemplate(sortResponse);
  clearContents('#chatroom-list');
  insertLast('#chatroom-list', template);
}
getData();
