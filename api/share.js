export default function handler(req, res) {
  const { img } = req.query;

  if (!img) {
    return res.redirect('https://sadlibs.vercel.app');
  }

  // Decode the image URL (was encoded with encodeURIComponent before being passed in)
  const imageUrl = decodeURIComponent(img);
  const appUrl = 'https://sadlibs.vercel.app';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>An Epstein Leak - SadLibs</title>

  <!-- Twitter Card (summary_large_image shows the full image inline in the tweet) -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sadlibs" />
  <meta name="twitter:title" content="The government redacted the Epstein files. Someone filled in the blanks." />
  <meta name="twitter:description" content="900 pages. Redacted. Until now. I filled in who the DOJ didn't want you to know about. Then made Trump read it back. Play it." />
  <meta name="twitter:image" content="${imageUrl}" />

  <!-- Open Graph (Facebook / general) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${appUrl}" />
  <meta property="og:title" content="The government redacted the Epstein files. Someone filled in the blanks." />
  <meta property="og:description" content="900 pages. Redacted. Until now. I filled in who the DOJ didn't want you to know about. Then made Trump read it back. Play it." />
  <meta property="og:image" content="${imageUrl}" />

  <!-- Redirect humans to the app immediately -->
  <meta http-equiv="refresh" content="0; url=${appUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${appUrl}">SadLibs</a>...</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  // Cache for 1 hour so Twitter's crawler doesn't hammer it, but it's not permanent
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(html);
}
