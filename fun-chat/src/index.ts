import './scss/styles.scss';
import './index.html';

import App from './app/app';

const app = new App();
app.createLayout();

const socket = new WebSocket('ws://127.0.0.1:4000');
const form = document.querySelector('.form');

function sendMessage(e: Event) {
  e.preventDefault();
  const input = document.querySelector('.name-input') as HTMLInputElement;
  const request = {
    id: null,
    type: 'USER_LOGIN',
    payload: {
      user: {
        login: 'lalala',
        password: 'bebebe',
      },
    },
  };
  if (input.value) {
    socket.send(JSON.stringify(request));
    input.value = '';
  }
  input.focus();
}
if (form) {
  form.addEventListener('submit', sendMessage);
}

// Listen for messages
socket.addEventListener('message', ({ data }) => {
  console.log(data);
});
