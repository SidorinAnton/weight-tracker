export const BASE_URL = "http://localhost:5000";

// https://docs.djangoproject.com/en/4.0/ref/csrf/
function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const baseApi = async (
  url: string,
  method: string = "GET",
  body?: any
) => {
  let csrfToken = getCookie("csrftoken");

  if (csrfToken === null) {
    const csrfResp = await fetch(BASE_URL + "/csrf-token/");
    const csrfRespJson = await csrfResp.json();
    csrfToken = csrfRespJson["csrf-token"];
  }

  if (!csrfToken) {
    throw Error("No CSRF token");
  }

  if (method === "GET") {
    try {
      return await fetch(BASE_URL + url, { credentials: "include" });
    } catch (e) {
      console.error(e);
    }
  }

  try {
    return await fetch(BASE_URL + url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error(e);
  }
};
