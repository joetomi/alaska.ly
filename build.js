import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const appDist = path.resolve('dist/app');

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

try {
  // Clean and create dist directories
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(appDist, { recursive: true });

  // Copy static files
  fs.copyFileSync('index.html', path.join(dist, 'index.html'));
  fs.copyFileSync('app/globals.css', path.join(appDist, 'globals.css'));
  copyDirectory('public', path.join(dist, 'public'));

  console.log('Build completed successfully for static Vercel deployment!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
