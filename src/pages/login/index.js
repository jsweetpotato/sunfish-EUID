import { getNode } from '../../lib/dom/getNode';

const loginButton = getNode('#login');
const startButton = getNode('#join');

const storage = window.localStorage;

const handleStart = (e) => {
  e.preventDefault();
  storage.setItem('type', 'join');
  window.location.href = '/src/pages/login/category/';
};

const handleLogin = (e) => {
  e.preventDefault();
  storage.setItem('type', 'login');
  window.location.href = '/src/pages/login/signin/';
};

loginButton.onclick = handleLogin;
startButton.onclick = handleStart;

// function Login() {
//   this.init = () => {
//     this.route();
//   };

//   this.route = () => {
//     const { pathname } = window.location;

//     if (pathname === '/join/category') {
//       new CategoryPage(loginPage).init();
//       return;
//     }

//     if (pathname === '/join/email') {
//       new CategoryPage(loginPage).init();
//       return;
//     }

//     if (pathname === '/signin') {
//       console.log('signin');
//     }
//   };

//   this.route();
//   window.addEventListener('locationChange', this.route);
// }

// const login = new Login();
// login.init();
