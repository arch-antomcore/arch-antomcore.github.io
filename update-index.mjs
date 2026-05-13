import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

// Replace body with React root
const newHtml = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, '<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.tsx"></script>\n</body>');

fs.writeFileSync('./index.html', newHtml);
console.log('Successfully updated index.html for Vite');
