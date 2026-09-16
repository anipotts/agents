import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.wasm', 'application/wasm'],
]);

export default function starlightDevSearch() {
  const pagefindDirectory = path.resolve('dist/pagefind');
  const searchComponentPath = fileURLToPath(import.meta.resolve('@astrojs/starlight/components/Search.astro'));

  return {
    name: 'starlight-dev-search',
    apply: 'serve',
    enforce: 'pre',
    transform(source, id) {
      if (id.split('?')[0] !== searchComponentPath) return;
      return source.replaceAll('import.meta.env.DEV', 'false');
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
        if (!pathname.startsWith('/pagefind/')) return next();

        let filePath;
        try {
          const relativePath = decodeURIComponent(pathname.slice('/pagefind/'.length));
          filePath = path.resolve(pagefindDirectory, relativePath);
          if (!filePath.startsWith(`${pagefindDirectory}${path.sep}`) || !statSync(filePath).isFile()) return next();
        } catch {
          return next();
        }

        response.setHeader('Content-Type', contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream');
        response.setHeader('Cache-Control', 'no-store');
        createReadStream(filePath).pipe(response);
      });
    },
  };
}
