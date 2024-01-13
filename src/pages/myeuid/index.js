import { createModal2Btn } from '../../components/Modal/Modal';
import { getNode, pb } from '../../lib';

const logoutButton = getNode('#logoutButton');
const withdrawButton = getNode('#withdrawButton');
const storage = window.localStorage;

/* -------------------------------------------------------------------------- */
/*                                   Logout                                   */
/* -------------------------------------------------------------------------- */

const [logoutModal, logoutCancelButton, logoutSubmitButton] = createModal2Btn({
  title: '❗️ 로그아웃할까요?',
  desc: '언제든지 다시 <br/> 로그인하실 수 있어요.',
  cancelText: '취소',
  submitText: '확인',
});

const logoutCancel = () => {
  logoutModal.closing();
};

const logoutSubmit = () => {
  storage.clear();
  window.location.href = '/src/pages/login/';
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
    title: '❗️ 탈퇴할까요?',
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
  window.location.href = '/src/pages/login/';
};

withdrawCancelButton.onclick = withdrawCancel;
withdrawSubmitButton.onclick = withdrawSubmit;
withdrawButton.onclick = () => withdrawModal.showing();

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

profile.insertAdjacentHTML(
  'afterbegin' /* html */,
  `<img
    src="${getPbImageURL(userProfile, 'avatar')}"
    alt="내 프로필 사진"
    class="w-[68px] rounded-full shadow-[0_4px_4px_0_rgba(0,0,0,0.1)]"
    />
  `
);

profile.insertAdjacentHTML(
  'afterend' /* html */,
  `
  <span aria-label="내 별명" class="text-center text-label-lg">${name}</span>
  `
);
