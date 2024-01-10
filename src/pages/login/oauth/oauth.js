import {
  createPrimaryBtn,
  createSecondaryBtn,
  toggleValid,
} from '../../../components/main_button';

const $form = document.querySelector('#oauth-form');
const $input = document.querySelector('#phone');
const $formButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '인증문자 받기',
  // eslint-disable-next-line no-use-before-define
  onClick: handelButton,
});

const template = /* html */ `

`;

const INVALID_CLASS = 'invalid';
const SEND_CLASS = 'send';

$form.insertAdjacentElement('beforeend', $formButton);

const setTimer = () => {};

const date = new Date();
const time = new Date(date.getTime() + 5000 * 60);

console.log('date: ', date);
console.log('time: ', time);

function handelButton(e) {
  const phonePattern = /^[010]+[0-9]{8}$/g;

  e.preventDefault();
  if ($input.value.match(phonePattern)) {
    $form.classList.remove(INVALID_CLASS);
    $form.classList.add(SEND_CLASS);
    $input.disabled = true;
  } else $form.classList.add(INVALID_CLASS);
}

const checkNumber = (e) => {
  if (e.key >= 0 && e.key <= 9) return true;
  return false;
};

let isValid = false;

const handleInput = ({ currentTarget }) => {
  if (currentTarget.value.length === 11) {
    isValid = true;
    toggleValid($formButton, isValid);
  } else {
    if (!isValid) return;
    isValid = false;
    toggleValid($formButton, isValid);
  }
};

$input.onkeypress = checkNumber;
$input.oninput = handleInput;
