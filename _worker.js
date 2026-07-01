export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, '') || '/';

    const authorPlain = pathname.match(/^\/authors\/([a-z0-9-]+)$/);
    if (authorPlain) {
      return env.ASSETS.fetch(rewriteRequest(request, `/authors/${authorPlain[1]}/index.html`));
    }

    const authorHtml = pathname.match(/^\/authors\/([a-z0-9-]+)\.html$/);
    if (authorHtml) {
      return env.ASSETS.fetch(rewriteRequest(request, `/authors/${authorHtml[1]}.html`));
    }

    const bookPlain = pathname.match(/^\/books\/([a-z0-9-]+)$/);
    if (bookPlain) {
      return env.ASSETS.fetch(rewriteRequest(request, `/books/${bookPlain[1]}/index.html`));
    }

    const bookHtml = pathname.match(/^\/books\/([a-z0-9-]+)\.html$/);
    if (bookHtml) {
      return env.ASSETS.fetch(rewriteRequest(request, `/books/${bookHtml[1]}.html`));
    }

    return env.ASSETS.fetch(request);
  },
};

function rewriteRequest(request, assetPath) {
  const url = new URL(request.url);
  url.pathname = assetPath;
  return new Request(url.toString(), request);
}
