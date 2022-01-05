import api from './services/api.js';
import Auth from './services/auth.js';

const form = document.querySelector('form');

form.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const user = Object.fromEntries(new FormData(form));

    await api.create('signup', user, false);

    Auth.redirectToSignin();
  } catch (error) {
    showToast("Signup Error.");
  }
};
