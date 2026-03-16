export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email } = req.body || {};
  const resp = await fetch("https://metahomestaging.chat/api/learn/billadd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await resp.json();
  res.status(resp.status).json(data);
}
