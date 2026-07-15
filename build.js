import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const appDist = path.resolve('dist/app');

try {
  // Clean and create dist directories
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(appDist, { recursive: true });

  // Copy static files
  fs.copyFileSync('index.html', path.join(dist, 'index.html'));
  fs.copyFileSync('app/globals.css', path.join(appDist, 'globals.css'));
  fs.cpSync('public', path.join(dist, 'public'), { recursive: true });

  console.log('Build completed successfully for static Vercel deployment!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
