import hello from './hello.js';

const appElem = document.getElementById('app');

if (appElem) {
  appElem.innerHTML = 'test 1234: ' + hello();
  console.log(hello());
}
