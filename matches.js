export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { competition = 'BSA', status, matchday } = req.query;

  let url = `https://api.football-data.org/v4/competitions/${competition}/matches?`;
  if (status) url += `status=${status}&`;
  if (matchday) url += `matchday=${matchday}&`;

  const response = await fetch(url, {
    headers: { 'X-Auth-Token': process.env.API_TOKEN }
  });

  const data = await response.json();
  res.status(200).json(data);
}
