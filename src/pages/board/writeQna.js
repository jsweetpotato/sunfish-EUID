import gsap from 'gsap';

(function init() {
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => e.preventDefault());
})();

const formObj = {
  category: 'frontend',
  title: '',
  question: '',
  files: [],
};

const $openModalButton = document.querySelector('#category-select');
const $closeModalButton = document.querySelector('#closeModal');
const $modalDimmed = document.querySelector('#modalDimmed');

function showModal() {
  const tl = gsap.timeline();
  tl.to('#modalDimmed', {
    opacity: 1,
    display: 'block',
    duration: 0.3,
  }).to(
    '#modal',
    {
      bottom: 0,
      duration: 0.3,
      onComplete() {
        this.targets()[0].focus();
      },
    },
    '<'
  );
}
function closeModal(e) {
  if (this === e.target) {
    gsap.to('#modalDimmed', {
      opacity: 0,
      duration: 0.3,
      onComplete() {
        gsap.set('#modalDimmed', { clearProps: 'all' });
        gsap.set('#modal', { clearProps: 'all' });
      },
    });
  }
}
$openModalButton.addEventListener('click', showModal);
$closeModalButton.addEventListener('click', closeModal);
$modalDimmed.addEventListener('click', closeModal);

const selectButtons = document.querySelectorAll('.select');
selectButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const { name } = e.target.dataset;
    $openModalButton.textContent = name;
    formObj.category = name;
    gsap.to('#modalDimmed', {
      opacity: 0,
      duration: 0.1,
      onComplete() {
        gsap.set('#modalDimmed', { clearProps: 'all' });
        gsap.set('#modal', { clearProps: 'all' });
      },
    });
  });
});

const validState = {
  title: false,
  question: false,
};

const inputs = document.querySelectorAll('.input');
function handleInput({ target }) {
  const submit = document.querySelector('#complete');
  validState[target.id] = target.value.length > 0;
  formObj[target.id] = target.value;
  if (Object.values(validState).every((value) => value)) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', '');
  }
}
inputs.forEach((input) => {
  input.addEventListener('input', handleInput);
});

const fileField = document.querySelector('#file');
function handleFileChange({ target }) {
  if (target.value === '') return;
  const { files } = target;
  const imageWrapper = document.querySelector('#image-wrapper');
  imageWrapper.innerHTML = '';
  imageWrapper.parentElement.classList.remove('hidden');
  gsap.from(imageWrapper.parentElement, {
    y: 70,
  });
  [...files].forEach((file) => {
    formObj.files.push(file);

    const imgUrl = URL.createObjectURL(file);
    imageWrapper.insertAdjacentHTML(
      'beforeend',
      `<img class="w-16 h-16" src="${imgUrl}" alt="" />`
    );
  });
}
fileField.addEventListener('change', handleFileChange);

const fileClearButton = document.querySelector('#file-clear');
function handleClear({ target }) {
  const imageWrapper = document.querySelector('#image-wrapper');
  fileField.value = '';
  formObj.files = [];
  imageWrapper.innerHTML = '';
  imageWrapper.parentElement.classList.add('hidden');
  console.log(formObj.files);
}
fileClearButton.addEventListener('click', handleClear);

const submitButton = document.querySelector('#complete');
function handleSubmit(e) {
  console.log(formObj);
}

submitButton.addEventListener('click', handleSubmit);
