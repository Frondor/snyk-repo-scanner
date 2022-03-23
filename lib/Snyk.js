import shell from 'shelljs';
import { execSync } from 'child_process';
import commands from './utils/commands.js';

export default class Snyk {
  auth() {
    return execSync(`npx snyk auth`, { stdio: 'inherit' });
  }

  analyze(repoPath) {
    console.log('Analysing dependencies at', repoPath);
    this.analyzeDependencies(repoPath);

    console.log('Analysing code at', repoPath);
    this.analyzeCode(repoPath);
  }

  analyzeDependencies(repoPath) {
    shell.cd(repoPath).exec(commands.snyk.deps('medium', 'dep-vuln.json'));
  }

  analyzeCode(repoPath) {
    shell.cd(repoPath).exec(commands.snyk.code('low', 'code-vuln.json'));
  }
}
