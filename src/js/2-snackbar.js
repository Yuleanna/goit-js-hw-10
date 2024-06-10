import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const createPromise = (delay, state) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fullfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
