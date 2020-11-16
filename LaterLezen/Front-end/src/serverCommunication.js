const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`

export async function getArticle(url) {
  const body = {
    url: url
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

  return fetch(serverFetchBase + `/articles/new`, fetchOptions)
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

  return fetch(serverFetchBase + `/articles/`, fetchOptions)
}


