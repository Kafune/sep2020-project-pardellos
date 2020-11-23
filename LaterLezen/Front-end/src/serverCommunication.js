const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`

export async function getArticle(url, tags, id) {
  const body = {
    url: url,
    user_id: id,
    tags: tags
  };

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(body)
  }

  return fetch(serverFetchBase + `/articles/article`, fetchOptions)
}

export async function getAllArticles() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
  }

  return fetch(serverFetchBase + `/user/articles`, fetchOptions)
}

export async function getArticleByUser(id) {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
  }
  return fetch(serverFetchBase + `/articles/user/${id}`, fetchOptions)
}

export async function loginUser(email, password) {
  const body = {
    username: email,
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
  return fetch(serverFetchBase + `/user/login`, fetchOptions)
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

export async function registerUser(email, password, firstname, lastname) {
  const body = {
    username: email,
    password: password,
    firstname: firstname,
    lastname: lastname
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
  return fetch(serverFetchBase + `/user/register`, fetchOptions)
}
