export default async function handler(req, res) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
  }

  try {
      const paths = req.query.paths ? req.query.paths.split(',') : ['/'];

      for (const path of paths) {
          // Thêm tham số noCache vào đường dẫn
          const pathWithNoCache = `${path}?noCache=1`;
          await res.revalidate(pathWithNoCache);
      }

      return res.json({ revalidated: true });
  } catch (err) {
      return res.status(500).json({ message: 'Error revalidating', error: err });
  }
}
