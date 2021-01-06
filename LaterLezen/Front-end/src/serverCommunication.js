const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`;
const serverFetchBase = `${window.location.protocol}//${serverHostname}`;

export async function saveArticle(url, tags, title) {
  const body = {
    url: url,
    tags: tags,
    title: title,
  };
  console.log(tags)
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };

  return fetch(serverFetchBase + `/user/article`, fetchOptions);
}

export async function getAllArticles() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };

  return fetch(serverFetchBase + `/user/articles`, fetchOptions);
}

export async function getArticleByUser() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(serverFetchBase + `/user/articles`, fetchOptions);
}

export async function loginUser(email, password) {
  const body = {
    email: email,
    password: password,
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };
  return fetch(serverFetchBase + `/user/login`, fetchOptions);
}

export async function logoutUser() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(serverFetchBase + `/user/logout`, fetchOptions);
}

export async function registerUser(email, password, firstname, lastname) {
  const body = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  };
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };
  return fetch(serverFetchBase + `/user/register`, fetchOptions);
}

export async function checkAuthenticated() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(serverFetchBase + `/user/authenticated`, fetchOptions);
}

export async function searchArticleByTags(tags) {
  const body = {
    tags: tags,
  };

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };
  return fetch(serverFetchBase + `/user/tags`, fetchOptions);
}

export async function searchArticleByID(id) {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(serverFetchBase + `/articles/article/${id}`, fetchOptions);
}

export async function deleteArticleByID(id) {
  const body = {
    article_id: id,
  };

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };
  return fetch(serverFetchBase + `/user/article/`, fetchOptions);
}

export async function savePreference(theme) {
  const body = {
    theme: theme,
  };
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };
  return fetch(serverFetchBase + `/user/preference/`, fetchOptions);
}

export async function getPreference() {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
  };
  return fetch(serverFetchBase + `/user/preference/`, fetchOptions);
}

export async function confirmArticleChanges(
  article,
  title,
  source,
  description,
  author,
  tags
) {
  const body = {
    article_id: article,
    title: title,
    source: source,
    description: description,
    author: author,
    tags: tags,
  };
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  };
  return fetch(serverFetchBase + `/user/article`, fetchOptions);
}

export async function findAuthor(query) {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(serverFetchBase + `/articles/find/`+ query, fetchOptions)
}

export async function getAuthors() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(serverFetchBase + `/articles/authors`, fetchOptions)
}