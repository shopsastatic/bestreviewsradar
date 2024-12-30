export default async function handler(req, res) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const paths = req.query.paths ? req.query.paths.split(',') : ['/'];

    // Revalidate Next.js
    for (const path of paths) {
      await res.revalidate(path);
      
      const url = `https://bestreviewsradar.com${path}`;
      await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'X-Revalidate-Request': '1'
        }
      });
    }

    return res.json({ 
      revalidated: true,
      cached: true 
    });
  } catch (err) {
    return res.status(500).json({ 
      message: 'Error revalidating and caching',
      error: err 
    });
  }
}