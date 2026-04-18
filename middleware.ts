/* Edge Middleware: rewrites the static index.html on every `/` request
 * to inject a seed-aware og:image URL, so Twitter/X previews match the
 * exact quote for each shared permalink. */

export const config = {
  matcher: '/',
};

export default async function middleware(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // Fetch the static template from the same origin.
  const templateRes = await fetch(new URL('/index.html', url).toString(), {
    headers: { 'x-middleware-passthrough': '1' },
  });
  if (!templateRes.ok) return templateRes;

  let html = await templateRes.text();

  const seed = url.searchParams.get('s');
  const ogUrl = seed
    ? `${url.origin}/api/og?s=${encodeURIComponent(seed)}`
    : `${url.origin}/api/og`;
  const pageUrl = url.toString();

  html = html
    .replaceAll('__OG_IMAGE__', ogUrl)
    .replaceAll('__PAGE_URL__', pageUrl);

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
