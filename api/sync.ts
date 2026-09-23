export default function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Global in-memory state for Vercel warm instance
  if (!global.turnirGames) {
    global.turnirGames = {};
  }
  if (!global.turnirLeaderboard) {
    global.turnirLeaderboard = [];
  }

  if (req.method === 'GET') {
    const { roomId, type } = req.query;
    
    if (type === 'leaderboard') {
      return res.status(200).json(global.turnirLeaderboard);
    }
    
    if (roomId) {
      return res.status(200).json(global.turnirGames[roomId] || null);
    }
    
    return res.status(400).json({ error: 'Missing parameters' });
  }

  if (req.method === 'POST') {
    const { roomId, state, type, entry } = req.body || {};

    if (type === 'leaderboard' && entry) {
      const exists = global.turnirLeaderboard.find((e: any) => e.name === entry.name);
      if (!exists) {
        global.turnirLeaderboard.push(entry);
        global.turnirLeaderboard.sort((a: any, b: any) => b.score - a.score);
      }
      return res.status(200).json(global.turnirLeaderboard);
    }

    if (roomId && state) {
      global.turnirGames[roomId] = state;
      return res.status(200).json(global.turnirGames[roomId]);
    }
    
    return res.status(400).json({ error: 'Missing parameters' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
