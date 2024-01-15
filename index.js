import { getNode } from './src/lib/dom/getNode';

const loginButton = getNode('#login');
const startButton = getNode('#join');

const storage = window.localStorage;

const handleStart = (e) => {
  e.preventDefault();
  storage.setItem('login', false);
  window.location.href = '/src/pages/login/category/';
};

const handleLogin = (e) => {
  e.preventDefault();
  storage.setItem('login', true);
  window.location.href = '/src/pages/login/signin/';
};

if (storage.getItem('pocketbase_auth'))
  window.location.href = '/src/pages/main/';

loginButton.onclick = handleLogin;
startButton.onclick = handleStart;
