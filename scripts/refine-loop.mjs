import { execSync } from 'node:child_process';

const iterationsArg = process.argv.find((arg) => arg.startsWith('--iterations='));
const iterations = iterationsArg ? Number(iterationsArg.split('=')[1]) : 3;

for (let i = 1; i <= iterations; i += 1) {
  console.log(`\\n== Refinement Loop ${i}/${iterations} ==`);
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch {
    console.error('build failed; stop loop');
    process.exit(1);
  }

  try {
    execSync('node scripts/design-audit.mjs --fix', { stdio: 'inherit' });
  } catch {
    // audit can return non-zero for CHECK; continue after reporting
  }
}

console.log('\\nLoop finished. See reports/design-audit.md');
