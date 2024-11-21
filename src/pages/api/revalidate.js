// pages/api/revalidate.js
export default async function handler(req, res) {
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    try {
      const paths = req.query.paths ? req.query.paths.split(',') : ['/'];
  
      for (const path of paths) {
        await res.revalidate(path);
      }
  
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).json({ message: 'Error revalidating', error: err });
    }
  }
  