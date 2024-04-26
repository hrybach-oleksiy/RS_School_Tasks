export default class ThemeSwitcher {
  constructor() {
    this.rootElement = document.body;
    this.init();
  }

  init() {
    document.body.setAttribute('data-theme', 'light');
    if (localStorage.getItem('theme')) {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-dark');
    }
  }

  changeTheme(theme) {
    // const togglerBtn = document.querySelector('.toggler');
    // button.addEventListener('click', () => {
    // if (document.documentElement.hasAttribute('theme')) {
    //   document.documentElement.removeAttribute('theme');
    //   localStorage.removeItem('theme');
    // } else {
    //   document.documentElement.setAttribute('theme', 'dark');
    //   localStorage.setItem('theme', 1);
    // }

    this.rootElement.dataset.theme = theme;

    // if (document.documentElement.classList.contains('theme-light')) {
    //   document.documentElement.classList.remove('theme-light');
    //   localStorage.removeItem('theme');
    // } else {
    //   // rootElement.dataset.theme = button.checked ? 'light' : 'dark';
    //   rootElement.dataset.theme = 'dark';
    //   document.documentElement.classList.add('theme-dark');
    //   localStorage.setItem('theme', 1);
    // }
    // });
  }
}
