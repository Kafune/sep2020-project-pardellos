const baseurl = `http://localhost:4000`
const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`;
let ws;
let theSocket;

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