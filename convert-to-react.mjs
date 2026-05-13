import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

// Extract body
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Convert HTML to JSX
bodyContent = bodyContent.replace(/class="/g, 'className="');
bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
bodyContent = bodyContent.replace(/<br>/g, '<br />');
bodyContent = bodyContent.replace(/<hr([^>]*)>/g, '<hr$1 />');
bodyContent = bodyContent.replace(/<img([^>]*)>/g, (match) => match.endsWith('/>') ? match : match.replace('>', ' />'));
bodyContent = bodyContent.replace(/<input([^>]*)>/g, (match) => match.endsWith('/>') ? match : match.replace('>', ' />'));
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    // Basic style to object converter, only works for simple styles
    const styleObj = styleString.split(';').filter(Boolean).map(s => {
        const [key, value] = s.split(':').map(str => str.trim());
        const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `${camelKey}: '${value}'`;
    }).join(', ');
    return `style={{ ${styleObj} }}`;
});

// Remove script tags from the body
bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/g, '');

const appTsx = `import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Existing main.js logic needs to be integrated here or imported
    // For now, we will dynamically import main.js to keep existing logic working
    import('../main.js');
  }, []);

  return (
    <>
      ${bodyContent}
    </>
  );
}
`;

fs.writeFileSync('./src/App.tsx', appTsx);
console.log('Successfully generated src/App.tsx');
