const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`;
const serverFetchBase = `${window.location.protocol}//${serverHostname}`;
let ws;
let theSocket;

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

export async function searchArticleByTags(tagids) {
  const body = {
    tagids: tagids,
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

export async function findArticle(query, searchContent) {
  const body = {
    query: query,
    searchContent: searchContent
  }

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(body)
  }
  return fetch(serverFetchBase + `/articles/search`, fetchOptions)
}

export async function getSources() {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(serverFetchBase + `/articles/sources`, fetchOptions)
}

// Websocket initialization
export function openWebSocket() {
  if (ws){
    ws.onerror = null;
    ws.onopen  = null;
    ws.onclose = null;
    ws.close();
  }
  console.log("Opening socket for", `ws://${serverHostname}`);
  ws = new WebSocket(`ws://${serverHostname}`);
  return ws
}

export function getWebSocket() {
  if( theSocket ) {
    return theSocket;
  }
  else {
    throw new Error("The websocket has not been opened yet.")
  }
}
