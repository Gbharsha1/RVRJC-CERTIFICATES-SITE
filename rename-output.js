import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const srcFile = path.join(distDir, 'main.html');
const destFile = path.join(distDir, 'index.html');

if (fs.existsSync(srcFile)) {
    fs.renameSync(srcFile, destFile);
    console.log('Successfully renamed dist/main.html to dist/index.html');
} else {
    console.error('Error: dist/main.html not found!');
    process.exit(1);
}
