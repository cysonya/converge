// Inject fetch polyfill if fetch is unsuported
if (!window.fetch) {
  const fetch = require("whatwg-fetch")
}

const api = {
  getHtml(url) {
    return fetch(url, { credentials: "include", redirect: "error" })
      .then(statusHelper)
      .then(response => response.text())
      .catch(error => error)
      .then(data => {
        return data
      })
  },
  get(url) {
    return fetch(url, { credentials: "include", redirect: "error" })
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error)
      .then(data => {
        console.log("GET RESPONSE: ", data) // The data does log!
        return data
      })
  },
  getNoCache(url) {
    return fetch(url, { credentials: "include", cache: "no-store" })
      .then(statusHelper)
      .then(response => response.json())
      .catch(error => error)
      .then(data => {
        console.log(data)
        return data
      })
  },
  postNoParse(url, body, contentType = undefined) {
    return postBare(url, body, contentType).then(statusHelper)
  },
  post(url, body, contentType = undefined) {
    return postBare(url, body, contentType)
      .then(statusHelper)
      .then(response => response.json())
      .then(data => {
        console.log("POST RESPONSE", data)
        return data
      })
  },
  put(url, body, contentType = undefined) {
    return putBare(url, body, contentType)
      .then(statusHelper)
      .then(response => response.json())
      .then(data => {
        console.log("PUT RESPONSE", data)
        return data
      })
  },
  patch(url, body, contentType = undefined) {
    return patchBare(url, body, contentType)
      .then(statusHelper)
      .then(response => response.json())
      .then(data => {
        console.log("PATCH RESPONSE", data)
        return data
      })
  }
}

function postBare(url, body, contentType = undefined, bearerToken = undefined) {
  if (typeof contentType == "undefined") {
    if (typeof body == "object") {
      contentType = "application/json; charset=utf-8"
      body = JSON.stringify(body)
    } else {
      contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  var headers = {
    "X-CSRF-Token": document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content")
  }

  if (contentType) {
    headers["Content-Type"] = contentType
  }

  if (bearerToken) {
    headers["Authorization"] = "Bearer " + bearerToken
  }

  return fetch(url, {
    body,
    credentials: "include",
    cache: "no-store",
    headers,
    method: "POST"
  })
}

function putBare(url, body, contentType = undefined) {
  if (typeof contentType == "undefined") {
    if (typeof body == "object") {
      contentType = "application/json; charset=utf-8"
      body = JSON.stringify(body)
    } else {
      contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  var headers = {
    "X-CSRF-Token": document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content")
  }
  if (contentType) {
    headers["Content-Type"] = contentType
  }

  return fetch(url, {
    body,
    credentials: "include",
    cache: "no-store",
    headers,
    method: "PUT"
  })
}
function patchBare(url, body, contentType = undefined) {
  if (typeof contentType == "undefined") {
    if (typeof body == "object") {
      contentType = "application/json; charset=utf-8"
      body = JSON.stringify(body)
    } else {
      contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  var headers = {
    "X-CSRF-Token": document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content")
  }
  if (contentType) {
    headers["Content-Type"] = contentType
  }

  return fetch(url, {
    body,
    credentials: "include",
    cache: "no-store",
    headers,
    method: "PATCH"
  })
}

function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

export default api