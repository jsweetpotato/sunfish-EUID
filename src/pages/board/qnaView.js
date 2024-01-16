/* eslint-disable no-alert, no-shadow, import/no-unresolved, import/extensions, import/no-absolute-path, no-use-before-define */

import gsap from 'gsap';
import {
  pb,
  getNode,
  insertLast,
  clearContents,
  convertTime,
  checkAuth,
} from '/src/lib/';
import { createAlertModal } from '/src/components/Modal/Modal.js';
import { createModal1Btn } from '../../components/Modal/Modal';

let firstVisit = true;

function getImageUrl(recordId, array, options = {}) {
  const urlArray = [];
  array.forEach((image) => {
    const url = pb.files.getUrl(recordId, image, options);
    urlArray.push(url);
  });
  return urlArray;
}

function createTemplate(item) {
  const { category, comments, title, description, imgField, views, created } =
    item;
  const { avatar, name, id: ownerId } = item.expand.user;
  const imageUrlArray = getImageUrl(item, imgField);
  const imageTemplates = imageUrlArray
    .map(
      (url) => /* html */ `
        <span class="inline-flex justify-center">
        <a class="rounded-lg overflow-hidden hover:shadow-[3px_3px_8px_0px_rgba(0,0,0,0.3),0px_0px_4px_0px_rgba(0,0,0,0.05)] transition-all duration-300" href="${url}" title="새창으로 사진 보기" target="_blank" rel="noopener noreferrer">
          <span >
            <img src="${url}" alt="" />
          </span>
          </a>
        </span> `
    )
    .join('');

  const ownerAvatarUrl = pb.files.getUrl(item.expand.user, avatar, {
    thumb: '0x50',
  });
  const articleTemplate = /* html */ `
  <div id="article">
  <article class="px-3 py-6 flex flex-col items-start gap-2">
    <span
      class="inline-block p-1 leading-none bg-bluegray-500 text-label-sm text-white rounded"
      >${category}</span
    >

    <div class="h-[40px] flex items-center gap-2">
      <div
        class="w-[30px] h-[30px] rounded-full ${
          ownerAvatarUrl ? '' : 'bg-contents-content-secondary'
        } overflow-hidden"
      >${
        ownerAvatarUrl
          ? `<img class="h-full object-cover" src="${ownerAvatarUrl}" alt="프로필 이미지">`
          : ''
      }</div>
      <div
        class="h-full text-paragraph-sm font-normal flex flex-col justify-center"
      >
        <p class="h-1/2 flex items-center">${name}</p>
        <span class="h-1/2 flex items-center text-gray-600"
          >연남동 인증 4회 · ${convertTime(created)} · 조회수 ${views}</span
        >
      </div>
    </div>

    <h2 class="text-label-lg font-medium">
      <span class="text-secondary">Q.</span> ${title}
    </h2>

    <p class="text-paragraph-md font-normal leading-[160%]">${description}</p>
  </article>

  <figure class="w-full p-3 flex flex-col gap-5">
    ${imageTemplates}
  </figure>
</div>
</section>
  `;
  const commentsTemplate = comments
    .map(
      ({ id, name, comment, avatar, created }) => /* html */ `
    <div class="p-2 flex flex-col gap-1 ">
    <div
      class="px-1 pt-1 flex items-center gap-2 rounded-lg "
    >
    <div
    class="w-[30px] h-[30px] rounded-full ${
      avatar ? '' : 'bg-contents-content-secondary'
    } overflow-hidden"
  >${
    avatar
      ? `<img class="h-full object-cover" src="${avatar}" alt="프로필 이미지">`
      : ''
  }</div>
      <div
        class="w-24 h-full text-paragraph-sm font-normal flex flex-col justify-center"
      >
        <p class="h-1/2 flex items-center ${
          ownerId === id ? 'text-secondary font-bold' : ''
        }">
          ${name}
          <span
            class="h-1/2 ml-2 flex items-center text-gray-600"
          ></span>
        </p>
        <span class="h-1/2 flex items-center text-gray-600"
          >연남동 · ${convertTime(created)}</span
        >
      </div>
      </div>
      <div class="flex-1">
        <p class="px-[40px] text-paragraph-md">
          ${comment}
        </p>
      </div>
  </div>
    `
    )
    .join('');

  return { article: articleTemplate, comments: commentsTemplate };
}

function render(template) {
  clearContents('#article');
  clearContents('#comments');
  const { article, comments } = template;
  insertLast('#article', article);
  insertLast('#comments', comments);
  const tl = gsap.timeline();
  tl.from('main>*', {
    y: 50,
    opacity: 0,
    stagger: 0.1,
  }).to(
    '#comments-container',
    {
      opacity: 1,
    },
    '-=0.2'
  );
}

async function getData() {
  if (!checkAuth()) return;
  const idParam = new URL(window.location.href).searchParams.get('id');
  if (idParam === null) {
    alert('잘못된 접근입니다.');
    window.location.href = '/src/pages/board/qna.html';
  }
  const response = await pb.collection('qAndA').getOne(idParam, {
    expand: 'user',
  });
  document.title = `엔터 이듬 - 질의응답::${response.title}`;
  if (firstVisit) {
    setTimeout(async () => {
      await pb.collection('qAndA').update(idParam, {
        views: response.views + 1,
      });
      firstVisit = false;
    }, 2000);
  }
  render(createTemplate(response));
  commentButton.addEventListener('click', throttle(handleSendComment));
}
getData();

const input = getNode('#commentInput');
input.addEventListener('input', (e) => {
  const button = e.target.nextElementSibling;
  if (e.target.value.replace(/\s/g, '') === '') {
    button.classList.replace('bg-send_full-icon', 'bg-send-icon');
  } else {
    button.classList.replace('bg-send-icon', 'bg-send_full-icon');
  }
});
const commentButton = getNode('#send');
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
    const commentsField = await pb.collection('qAndA').getOne(idParam, {
      fields: 'comments',
    });
    const commentObj = {
      id,
      created: new Date().getTime(),
      name,
      comment: input.value,
      avatar: url,
    };
    await pb.collection('qAndA').update(idParam, {
      comments: [commentObj, ...commentsField.comments],
    });
    input.value = '';
    await getData();
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

const shareButton = getNode('#share');
function handleClipBoard() {
  const [successMoodal] = createAlertModal('📃 주소가 복사되었습니다.', 1000);
  const [failedMoodal] = createAlertModal(
    '📃 복사 도중 오류가 발생했습니다.',
    1000
  );
  return async (e) => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      successMoodal.showing();
    } catch (error) {
      failedMoodal.showing();
    }
  };
}

shareButton.addEventListener('click', handleClipBoard());
// 모달
const [$modal, $modalButton] = createModal1Btn({
  title: '😭서비스 준비중입니다.',
  desc: '열심히 준비중이예요💦<br> 조금만 기다려주세요',
  buttonText: '알겠어요',
});

shareButton.addEventListener('click', handleClipBoard());

getNode('#more').addEventListener('click', $modal.showing);
$modalButton.onclick = $modal.closing;
