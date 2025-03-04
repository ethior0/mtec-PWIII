const url = "http://localhost:3001/";

export async function fetchCalculadora(data) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify(data)
  });

  const resultado = await resp.json();

  return resultado;
}