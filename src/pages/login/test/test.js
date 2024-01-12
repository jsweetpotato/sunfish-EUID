import {
  createModal1Btn,
  createModal2Btn,
} from '../../../components/Modal/Modal';

const oneModalButton = document.querySelector('.one-modal');

const [$modal, $modalButton] = createModal1Btn({
  title: '인증 번호가 발송되었어요!',
  desc: '콘솔창에서 인증번호를 확인해주세요!!!!!!!!!!!!!!!!',
});

oneModalButton.onclick = () => {
  // 코드 작성
  $modal.showing(); // 모달 열기
};

$modalButton.onclick = () => {
  // 코드 작성
  $modal.closing(); // 모달 끄기
};

const twoModalButton = document.querySelector('.two-modal');

const [$modal2, $modalCancel, $modalSubmit] = createModal2Btn({
  title: '인증 번호가 발송되었어요!',
  desc: '콘솔창에서 인증번호를 확인해주세요',
  cancelText: '취소하기',
  submitText: '완료하기',
});

twoModalButton.onclick = () => {
  // 코드 작성
  $modal2.showing(); // 모달 열기
};

$modalCancel.onclick = () => {
  // 취소했을 때 코드 작성
  console.log('취소');
  $modal2.closing(); // 모달 끄기
};

$modalSubmit.onclick = () => {
  // 제출 할 때 코드 작성
  console.log('승인');
  $modal2.closing(); // 모달 끄기
};
