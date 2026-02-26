import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const appPath = path.join(root, 'src', 'App.tsx');
const cssPath = path.join(root, 'src', 'App.css');
const reportPath = path.join(root, 'reports', 'design-audit.md');

let app = fs.readFileSync(appPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const shouldFix = process.argv.includes('--fix');

const requiredSections = ['概要', 'システム', '導入', 'BANSOUについて'];
const forbiddenPhrases = [
  '革新的',
  '次世代',
  'AIが変える',
  '未来を再定義',
  '革命的',
  'イノベーション',
  'ゲームチェンジャー',
];

const findings = [];
const fixes = [];

for (const section of requiredSections) {
  if (!app.includes(section)) {
    findings.push(`必須セクション見出しが不足: ${section}`);
  }
}

for (const phrase of forbiddenPhrases) {
  if (app.includes(phrase)) {
    findings.push(`禁止表現を検出: ${phrase}`);
    if (shouldFix) {
      app = app.replaceAll(phrase, '');
      fixes.push(`禁止表現を削除: ${phrase}`);
    }
  }
}

const hexColors = new Set((css.match(/#[0-9a-fA-F]{6}/g) || []).map((c) => c.toLowerCase()));
const allowed = new Set(['#f0e7d6', '#1a1a1a', '#111111', '#ea3e00']);
for (const color of hexColors) {
  if (!allowed.has(color)) {
    findings.push(`パレット外の色を検出: ${color}`);
  }
}

if (/gradient/i.test(css)) {
  findings.push('禁止方針: gradient が含まれています');
}
if (/glass|backdrop-filter/i.test(css)) {
  findings.push('禁止方針: ガラスモーフィズム系スタイルが含まれています');
}
if (/box-shadow\s*:\s*(?!none)/i.test(css)) {
  findings.push('禁止方針: 影表現 (box-shadow) が含まれています');
}

if (shouldFix && fixes.length > 0) {
  fs.writeFileSync(appPath, app);
}

const status = findings.length === 0 ? 'PASS' : 'CHECK';
const lines = [];
lines.push('# Design Audit Report');
lines.push('');
lines.push(`- Status: ${status}`);
lines.push(`- Time: ${new Date().toISOString()}`);
lines.push('');
lines.push('## Findings');
if (findings.length === 0) {
  lines.push('- なし');
} else {
  for (const item of findings) lines.push(`- ${item}`);
}
lines.push('');
lines.push('## Auto Fixes');
if (fixes.length === 0) {
  lines.push('- なし');
} else {
  for (const item of fixes) lines.push(`- ${item}`);
}

fs.writeFileSync(reportPath, `${lines.join('\n')}\n`);
console.log(lines.join('\n'));
if (findings.length > 0) process.exitCode = 2;
