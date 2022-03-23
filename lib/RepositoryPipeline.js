import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import { DEFAULT_CONFIG } from '../index.js';
import commands from './utils/commands.js';

export default class RepositoryPipeline {
  constructor(config) {
    this.config = {
      get repository() {
        throw new Error('You must provide a repository name');
      },
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  get repoPath() {
    return path.join(this.config.paths.tmp, this.config.repository.replace(/^fury_/, ''));
  }

  init() {
    if (!existsSync(this.repoPath)) {
      try {
        mkdirSync(this.config.paths.tmp);
      } catch (error) {}
      this.cloneRepoSync();
    }

    const git = simpleGit({
      baseDir: this.repoPath,
      binary: 'git',
      maxConcurrentProcesses: 12,
    });

    return git;
  }

  async run(branch = this.config.branches[0]) {
    const git = this.init();

    await git.checkout(branch).pull();
  }

  cloneRepoSync() {
    const { paths, repository } = this.config;
    execSync(commands.fury.get(repository.replace(/^fury_/, '')), {
      cwd: paths.tmp,
      stdio: 'inherit',
    });
  }
}
