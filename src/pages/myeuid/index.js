/* eslint-disable no-param-reassign */
import { createModal1Btn, createModal2Btn } from '../../components/Modal/Modal';
import { getNode, getNodes, pb, checkAuth } from '../../lib';

const login = localStorage.getItem('login');
const logoutButton = getNode('#logoutButton');
const withdrawButton = getNode('#withdrawButton');
const storage = window.localStorage;

if (JSON.parse(login)) {
  checkAuth();
}

// 모달
const serviceModal = getNodes('.serviceModal');
const [$modal, $modalButton] = createModal1Btn({
  title: '😭서비스 준비중입니다.',
  desc: '열심히 준비중이예요💦<br> 조금만 기다려주세요',
  buttonText: '알겠어요',
});

serviceModal.forEach((modal) => {
  modal.onclick = () => $modal.showing();
});
$modalButton.onclick = () => $modal.closing();

/* -------------------------------------------------------------------------- */
/*                                   Logout                                   */
/* -------------------------------------------------------------------------- */

const [logoutModal, logoutCancelButton, logoutSubmitButton] = createModal2Btn({
  title: '🏠 로그아웃할까요?',
  desc: '언제든지 다시 <br/> 로그인하실 수 있어요!',
  cancelText: '취소',
  submitText: '확인',
});

const logoutCancel = () => {
  logoutModal.closing();
};

const logoutSubmit = () => {
  storage.clear();
  window.location.href = '/';
};

logoutCancelButton.onclick = logoutCancel;
logoutSubmitButton.onclick = logoutSubmit;
logoutButton.onclick = () => logoutModal.showing();

/* -------------------------------------------------------------------------- */
/*                                  Withdraw                                  */
/* -------------------------------------------------------------------------- */
const pocketAuth = localStorage.getItem('pocketbase_auth');
const pocketData = JSON.parse(pocketAuth);

const [withdrawModal, withdrawCancelButton, withdrawSubmitButton] =
  createModal2Btn({
    title: '🗑️ 탈퇴할까요?',
    desc: '계정은 삭제되며, <br/> 복구되지 않습니다.',
    cancelText: '취소',
    submitText: '확인',
  });

const withdrawCancel = () => {
  withdrawModal.closing();
};

const withdrawSubmit = async () => {
  await pb.collection('users').delete(pocketData.model.id);
  localStorage.clear();
  window.location.href = '/';
};

// withdrawCancelButton.onclick = withdrawCancel;
// withdrawSubmitButton.onclick = withdrawSubmit;
withdrawButton.onclick = $modal.showing;

/* -------------------------------------------------------------------------- */
/*                                  Rendering                                 */
/* -------------------------------------------------------------------------- */

const profile = getNode('#profile');
const userProfile = await pb
  .collection('users')
  .getOne(pocketData.model.id, { fields: 'avatar, name' });
const { name } = userProfile;

function getPbImageURL(item, fileName = 'photo') {
  return `${import.meta.env.VITE_PB_URL}/api/files/users/${
    pocketData.model.id
  }/${item[fileName]}`;
}

if (pocketData.model.avatar === '') {
  profile.insertAdjacentHTML(
    'afterbegin' /* html */,
    `<img
    src="/src/assets/profile-img.svg"
      alt="내 프로필 사진"
      class="size-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
      />
    `
  );
} else {
  profile.insertAdjacentHTML(
    'afterbegin' /* html */,
    `<img
    src="${getPbImageURL(userProfile, 'avatar', { thumb: '300x300' })}"
    alt="내 프로필 사진"
    class="size-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
    `
  );
}

profile.insertAdjacentHTML(
  'afterend' /* html */,
  `
  <span aria-label="내 별명" class="text-center text-label-lg">${name}</span>
  `
);
