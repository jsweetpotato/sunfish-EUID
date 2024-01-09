// import Category from './category';

const loginPage = document.querySelector('main');

function Login() {
  this.init = () => {
    this.route();
  };

  const route = () => {
    const { pathname } = window.location;

    if (pathname === '/category') {
      new Category(loginPage).init();
      return;
    }

    if (pathname === '/signin') {
      console.log('signin');
    }
  };
}

const login = new Login();
login.init();
