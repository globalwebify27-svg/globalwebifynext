import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

console.log('🚀 Building Next.js application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed!');
  process.exit(1);
}

console.log('\n📦 Preparing single folder for Hostinger...');
const standalonePath = path.join(process.cwd(), '.next', 'standalone');
const publicPath = path.join(process.cwd(), 'public');
const staticPath = path.join(process.cwd(), '.next', 'static');
const destPublic = path.join(standalonePath, 'public');
const destStatic = path.join(standalonePath, '.next', 'static');

if (fs.existsSync(standalonePath)) {
  console.log('➡️ Copying public folder...');
  copyRecursiveSync(publicPath, destPublic);
  
  console.log('➡️ Copying .next/static folder...');
  copyRecursiveSync(staticPath, destStatic);
  
  console.log('\n✅ DONE! Aapka Hostinger deployment folder ready hai.');
  console.log('👉 Ab aap sirf ".next/standalone" folder ke andar ka saara data Hostinger pe upload kar do!');
} else {
  console.error('❌ standalone folder not found! Make sure output: "standalone" is in next.config.mjs');
}
