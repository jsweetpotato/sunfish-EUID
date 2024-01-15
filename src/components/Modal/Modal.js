/**
 * 원버튼 모달 생성하기
 * @param {Object} obj
 * @param {String} obj.title 모달 제목
 * @param {String} obj.desc 모달 설명
 * @param {String} obj.buttonText 버튼 텍스트
 * @returns {HTMLDialogElement & HTMLButtonElement & HTMLButtonElement}
 */
export const createModal1Btn = ({ title, desc, buttonText = '확인' }) => {
  const array = new Uint8Array(1);
  const id = `modal${crypto.getRandomValues(array).join('')}`;
  const template = /* html */ `
  <dialog id=${id} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${title}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aria-label="모달 본문"
        >${desc}</span>
      <button class="w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
        ${buttonText}
      </button>
    </div>
  </dialog>
  `;

  document.querySelector('body').insertAdjacentHTML('beforeend', template);
  const modal = document.querySelector(`#${id}`);
  const button = document.querySelector(`#${id} button`);

  modal.showing = () => {
    modal.showModal();
  };

  modal.closing = () => {
    modal.setAttribute('closing', '');
    modal.addEventListener(
      'animationend',
      () => {
        modal.removeAttribute('closing', '');
        modal.close();
      },
      { once: true }
    );
  };

  return [modal, button];
};
/**
 * 투 버튼 모달 생성하기
 * @param {Object} obj
 * @param {String} obj.title 모달 제목
 * @param {String} obj.desc 모달 설명
 * @param {String} obj.cancelText 취소 버튼 텍스트
 * @param {String} obj.submitText 승인 버튼 텍스트
 * @returns {HTMLDialogElement & HTMLButtonElement}
 */
export const createModal2Btn = ({
  title,
  desc,
  cancelText = '취소',
  submitText = '확인',
}) => {
  const array = new Uint8Array(1);
  const id = `modal${crypto.getRandomValues(array).join('')}`;
  const template = /* html */ `
  <dialog id=${id} class="bg-white shadow-lg backdrop:bg-black backdrop:bg-opacity-40 rounded-2xl">
    <div class="w-[233px] p-[18px] flex flex-col items-center gap-5">
      <p class="text-label-md" aria-label="모달 제목">${title}</p>
      <span
        class="text-paragraph-md text-center text-gray-600"
        aria-label="모달 본문"
        >${desc}</span>      
      <div class="flex gap-2 w-full">
        <button class="grow w-full  h-9 bg-gray-100 text-contents-content-primary text-label-md rounded hover:brightness-90">
          ${cancelText}
        </button>
        <button class="grow w-full h-9 bg-secondary text-white text-label-md rounded hover:brightness-90">
          ${submitText}
        </button>
      </div>
    </div>
  </dialog>
  `;

  document.querySelector('body').insertAdjacentHTML('beforeend', template);
  const modal = document.querySelector(`#${id}`);
  const cancelButton = document.querySelector(`#${id} button`);
  const submitButton = document.querySelector(`#${id} button:last-child`);

  modal.showing = () => {
    modal.showModal();
  };

  modal.closing = () => {
    modal.setAttribute('closing', '');
    modal.addEventListener(
      'animationend',
      () => {
        modal.removeAttribute('closing', '');
        modal.close();
      },
      { once: true }
    );
  };

  return [modal, cancelButton, submitButton];
};
