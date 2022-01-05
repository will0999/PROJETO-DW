import api from "./services/api.js";
import Auth from "./services/auth.js";

const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();

  const user = Object.fromEntries(new FormData(form));
  console.log(user)

  const { auth, token } = await api.create("signin", user, false);

  if (auth) {
    Auth.signin(token);
  }
};

