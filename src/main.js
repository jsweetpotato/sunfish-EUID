import {
  createPrimaryBtn,
  createSecondaryBtn,
  toggleValid,
} from './main_button';

const $app = document.querySelector('#app');

let isValid = true;

function onClick() {
  console.log(this);
  isValid = !isValid;
  toggleValid(this, isValid);
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
