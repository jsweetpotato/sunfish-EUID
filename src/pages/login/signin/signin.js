import { createPrimaryBtn } from '../../../components/main_button';
import { getNode } from '../../../lib/dom/getNode';

const $form = getNode('form');

const storage = window.localStorage;

const emailPattern = /^[\w-]+@([a-z]+\.)+[\w]{2,4}/g;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const $submitButton = createPrimaryBtn({
  id: 'formbutton',
  type: 'submit',
  value: '로그인',
});

$form.insertAdjacentElement('beforeend', $submitButton);
