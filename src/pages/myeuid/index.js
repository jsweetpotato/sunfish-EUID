import { createModal2Btn } from '../../components/Modal/Modal';
import { getNode, pb } from '../../lib';

const logoutButton = getNode('#logoutButton'); // 로그아웃하기 버튼
const withdrawButton = getNode('#withdrawButton'); // 회원 탈퇴하기 버튼
const storage = window.localStorage;

// 로그아웃 모달
const [logoutModal, logoutCancelButton, logoutSubmitButton] = createModal2Btn({
  title: '❗️ 로그아웃할까요?',
  desc: '언제든지 다시 <br/> 로그인하실 수 있어요.',
  cancelText: '취소',
  submitText: '확인',
});

// 로그아웃 취소
const logoutCancel = () => {
  logoutModal.closing();
};

// 로그아웃 확인
const logoutSubmit = () => {
  storage.clear();
  window.location.href = '/src/pages/login/';
};

logoutCancelButton.onclick = logoutCancel;
logoutSubmitButton.onclick = logoutSubmit;
logoutButton.onclick = () => logoutModal.showing();

// 회원탈퇴 모달
const [withdrawModal, withdrawCancelButton, withdrawSubmitButton] =
  createModal2Btn({
    title: '❗️ 탈퇴할까요?',
    desc: '계정은 삭제되며, <br/> 복구되지 않습니다.',
    cancelText: '취소',
    submitText: '확인',
  });

// 회원탈퇴 취소
const withdrawCancel = () => {
  withdrawModal.closing();
};

// 회원탈퇴 확인
const withdrawSubmit = () => {
  localStorage.clear();
  window.location.href = '/src/pages/login/';
};

withdrawCancelButton.onclick = withdrawCancel;
withdrawSubmitButton.onclick = withdrawSubmit;
withdrawButton.onclick = () => withdrawModal.showing();
