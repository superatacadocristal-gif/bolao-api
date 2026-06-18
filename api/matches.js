export default async function handler(req, res) {
  // Headers CORS completos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde preflight do CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { competition = 'BSA', status, matchday } = req.query;

    // Monta URL de forma limpa com URLSearchParams
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (matchday) params.append('matchday', matchday);

    const url = `https://api.football-data.org/v4/competitions/${competition}/matches?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': process.env.API_TOKEN
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro na API externa',
        status: response.status,
        message: response.statusText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: 'Erro interno no servidor',
      message: error.message
    });
  }
}
