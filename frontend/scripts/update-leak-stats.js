const fs = require('fs');
const path = require('path');
const https = require('https');

const HIBP_URL = 'https://haveibeenpwned.com/api/v3/breaches';
const DEST_DIR = path.resolve(__dirname, '..', 'public', 'data');
const DEST_FILE = path.join(DEST_DIR, 'leak-stats.json');

// Ensure directory exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

function fetchBreaches() {
  return new Promise((resolve, reject) => {
    https.get(HIBP_URL, {
      headers: {
        'User-Agent': 'AetherCore-LeakCounter-Script'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const breaches = JSON.parse(data);
          resolve(breaches);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (e) => reject(e));
  });
}

async function updateStats() {
  try {
    console.log('Fetching latest breach data from HIBP...');
    const breaches = await fetchBreaches();
    
    let totalPwnCount = 0;
    for (const breach of breaches) {
      if (typeof breach.PwnCount === 'number') {
        totalPwnCount += breach.PwnCount;
      }
    }

    const payload = {
      totalPwnCount,
      breachCount: breaches.length
    };

    const targetPaths = [
      DEST_FILE,
      path.resolve(__dirname, '..', '..', 'build', 'data', 'leak-stats.json'),
      path.resolve(__dirname, '..', '..', 'docs', 'data', 'leak-stats.json')
    ];

    for (const targetPath of targetPaths) {
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(targetPath, JSON.stringify(payload, null, 2));
      console.log(`Successfully updated leak stats at: ${targetPath}`);
    }

    console.log(`Total PwnCount: ${totalPwnCount}`);
  } catch (error) {
    console.error('Error updating leak stats:', error);
    process.exit(1);
  }
}

updateStats();
