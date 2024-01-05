import {
  createPrimaryBtn,
  createSecondaryBtn,
  toggleValid,
} from './main_button';

const $app = document.querySelector('#app');
const $alram = document.querySelector('#alram');
let isValid = false;

function onClick() {
  isValid = !isValid;
  toggleValid(this, isValid);
  $alram.classList.toggle('bg-direction-icon');
}

$app.insertAdjacentElement(
  'beforeend',
  createPrimaryBtn({
    id: 'hello-button',
    value: '안녕',
    onClick,
    type: 'submit',
  })
);

$app.insertAdjacentElement(
  'beforeend',
  createSecondaryBtn({
    id: 'bye-button',
    value: '잘가',
    onClick: () => console.log('bye'),
  })
);
