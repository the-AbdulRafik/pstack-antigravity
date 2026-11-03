#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const syncStatePath = resolve(__dirname, '..', '.upstream-sync.json');

const defaultState = {
  lastChecked: new Date().toISOString(),
  cursorPluginsCommit: 'ae5650febf4320793844c12c4adaa937f417f8da',
  pstackClaudeCommit: 'aa4e6fe7279f7b611b867c1f7388577bf6d640e6',
};

let state = defaultState;
if (existsSync(syncStatePath)) {
  try {
    state = JSON.parse(readFileSync(syncStatePath, 'utf8'));
  } catch {
    state = defaultState;
  }
}

async function fetchLatest(url) {
  const headers = { 'User-Agent': 'pstack-antigravity-sync-agent' };
  if (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
  }
  return await res.json();
}

async function run() {
  console.log('🔍 Checking upstream repositories for updates and drift...');

  let driftDetected = false;
  const updates = [];

  try {
    const claudeData = await fetchLatest('https://api.github.com/repos/michael-denyer/pstack-claude/commits?per_page=1');
    const latestClaudeSha = claudeData[0]?.sha;
    const latestClaudeMsg = claudeData[0]?.commit?.message?.split('\n')[0];

    if (latestClaudeSha && latestClaudeSha !== state.pstackClaudeCommit) {
      driftDetected = true;
      updates.push(`• **pstack-claude**: New commit \`${latestClaudeSha.slice(0, 7)}\` — *${latestClaudeMsg}*`);
      state.pstackClaudeCommit = latestClaudeSha;
    }
  } catch (err) {
    console.warn(`⚠ Could not check pstack-claude:`, err.message);
  }

  try {
    const cursorData = await fetchLatest('https://api.github.com/repos/cursor/plugins/commits?per_page=1');
    const latestCursorSha = cursorData[0]?.sha;
    const latestCursorMsg = cursorData[0]?.commit?.message?.split('\n')[0];

    if (latestCursorSha && latestCursorSha !== state.cursorPluginsCommit) {
      driftDetected = true;
      updates.push(`• **cursor/plugins**: New commit \`${latestCursorSha.slice(0, 7)}\` — *${latestCursorMsg}*`);
      state.cursorPluginsCommit = latestCursorSha;
    }
  } catch (err) {
    console.warn(`⚠ Could not check cursor/plugins:`, err.message);
  }

  state.lastChecked = new Date().toISOString();
  writeFileSync(syncStatePath, JSON.stringify(state, null, 2) + '\n', 'utf8');

  if (driftDetected) {
    console.log('\n🚨 Upstream drift detected!');
    updates.forEach(u => console.log(u));

    if (process.env.GITHUB_ACTIONS === 'true') {
      const title = '🚨 Upstream Update: New changes detected in upstream pstack';
      const body = `Automated notification from GitHub Actions:\n\nNew updates were detected in upstream repositories:\n\n${updates.join('\n')}\n\nReview the upstream changes and determine if skills or playbooks require porting.`;
      
      try {
        console.log('Dispatching GitHub Issue notification...');
        execSync(`gh issue create --title "${title}" --body "${body}" --label "upstream-sync"`, { stdio: 'inherit' });
        console.log('✔ Successfully opened GitHub issue and notified maintainer.');
      } catch (err) {
        console.error('Failed to open GitHub issue:', err.message);
      }
    }
  } else {
    console.log('✔ All upstream repositories are synchronized. No drift detected.');
  }
}

run();
