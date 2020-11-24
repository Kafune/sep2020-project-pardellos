const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`

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

export async function logoutUser() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(serverFetchBase + `/user/logout`, fetchOptions)
}
export async function saveArticle(url, tags) {
  const body = {
    url: url,
    tags: tags
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(body)
  }

  return fetch(serverFetchBase + `/user/article`, fetchOptions)
}