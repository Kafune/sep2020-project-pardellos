const baseurl = `http://localhost:4000`

export async function loginUser(email, password) {

  const body = {
    email: email,
    password: password
  }

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(body)
  }
  return fetch(baseurl + `/user/login`, fetchOptions)
}

export async function checkAuthenticated() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(baseurl + `/user/authenticated`, fetchOptions)
}

export async function logoutUser() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(baseurl + `/user/logout`, fetchOptions)
}
export async function saveArticle(url, title, email, tags) {
  const body = {
    url: url,
    title: title,
    email: email,
    tags: tags
  };
  console.log(email);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(body)
  }

  return fetch(baseurl + `/user/article`, fetchOptions)
}