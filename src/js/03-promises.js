import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.forms[0].delay,
  step: document.forms[0].step,
  amount: document.forms[0].amount,
  submit: document.querySelector('button[type=submit]'),
};

// console.log(refs);

refs.submit.addEventListener('click', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const promises = [];
  let delay = refs.delay.value;
  const step = refs.step.value;
  const amount = refs.amount.value;

  refs.delay.value = refs.step.value = refs.amount.value = '';

  delay = +delay;

  for (let i = 0; i < amount; i += 1) {
    let position = i + 1;

    promises.push(
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        })
    );

    delay = delay + parseInt(step);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
