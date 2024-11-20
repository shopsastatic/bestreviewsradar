export default async function handler(req, res) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
  }

  try {
      const paths = req.query.paths ? req.query.paths.split(',') : ['/'];

      // Revalidate các URL frontend
      for (const path of paths) {
          await res.revalidate(path);
      }

      // Gửi một HEAD request đến GraphQL API để bypass cache
      await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql?noCache=1`, {
          method: 'HEAD', // Chỉ gửi request để làm mới cache, không fetch data
      });

      return res.json({ revalidated: true });
  } catch (err) {
      return res.status(500).json({ message: 'Error revalidating', error: err });
  }
}
