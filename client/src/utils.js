export async function post(url, data) {
  let body = JSON.stringify(data)
  let r = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  })
  return await r.json();
}

