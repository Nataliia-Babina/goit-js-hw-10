
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

console.log(form);

form.addEventListener('submit', submitFormProcess);

function submitFormProcess(event) {
  event.preventDefault();  
  const formData = new FormData(form);
  const delay = formData.get('delay');
  const state = formData.get('state');
   createPromise(delay, state)
    .then(() =>
      iziToast.success({    
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(() =>
      iziToast.error({       
        message: `❌ Rejected promise in ${delay}ms`,        
      })
    );
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state == 'fulfilled') {
        console.log('resolve');
        resolve('delay');
      } else {
        console.log('reject');
        reject(delay);
      }
    }, delay);
  });
 }