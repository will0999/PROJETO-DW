import Auth from './auth.js';

const domain = '';

async function create(resource, data, auth = true) {
  console.log(data);
  const url = `${domain}${resource}`;

  const config = {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(config)

  const token = Auth.getToken();

  if (auth && token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (auth && !token) {
    Auth.redirectToSignin();
  }

  const response = await fetch(url, config);

  if (auth & response.status === 401) {
    Auth.redirectToSignin();
  }

  if (!response.ok || response.status === 201) {
    throw new Error('Create error.');
  }

  const content = await response.json();

  return content;
}

async function read(resource, auth = true) {
  const url = `${domain}${resource}`;

  const config = {};

  const token = Auth.getToken();

  if (auth && token) {
    config.headers = { Authorization: `Bearer ${token}`};
  } else if (auth && !token) {
    Auth.redirectToSignin();
  }

  const response = await fetch(url, config);

  if (response.status === 401) {
    Auth.redirectToSignin();
  }

  if (!response.ok) {
    throw new Error('Read error.');
  }

  const content = await response.json();

  return content;
}

async function update(resource, data) {}

async function destroy(resource, auth = true) {
  const url = `${domain}${resource}`;

  const config = { method: "delete" };

  const token = Auth.getToken();

  if (auth && token) {
    config.headers = { Authorization: `Bearer ${token}`};
  } else if (auth && !token) {
    Auth.redirectToSignin();
  }

  const response = await fetch(url, config);

  if (response.status === 204) {
    return true;
  } else if (response.status === 401) {
    Auth.redirectToSignin();
  } else {
    throw new Error('Destroy error.');
  }
}

export default { create, read, update, destroy };