import path from 'path';
import { fileURLToPath } from 'url';
import simpleGit, { CleanOptions } from 'simple-git';
import RepositoryPipeline from './lib/RepositoryPipeline.js';
import Snyk from './lib/Snyk.js';
import {
  writeReport,
  readDependencyVulnerabilities,
  readCodeVulnerabilities,
} from './lib/utils/reports.js';

simpleGit().clean(CleanOptions.FORCE);

// TODO - hacer CLI y aceptar command args
export const DEFAULT_CONFIG = {
  paths: {
    tmp: path.join(fileURLToPath(import.meta.url), '../.tmp'),
  },
  branches: ['develop'],
};

(async (repositories) => {
  if (!repositories.length) {
    console.error(
      'You must provide a coma-separated list of repository names to the --repos argument'
    );
    return;
  }

  const snyk = new Snyk();

  snyk.auth();

  const repos = repositories.map(
    (name) =>
      new RepositoryPipeline({
        repository: name,
      })
  );

  await Promise.all(
    repos.map(async (repo) => {
      await repo.run();
      snyk.analyze(repo.repoPath);
    })
  );

  console.log('Generating vulnerabilities report');
  writeReport(
    readDependencyVulnerabilities(
      repos.map((repo) => path.join(repo.repoPath, 'dep-vuln.json'))
    ).toCSV(),
    'dep-vuln.csv'
  );

  console.log('Generating code report');
  writeReport(
    readCodeVulnerabilities(repos.map((repo) => path.join(repo.repoPath, 'code-vuln.json'))),
    'code-vuln.md'
  );
})(
  process.argv
    .find((arg) => arg.startsWith('--repos='))
    ?.replace('--repos=', '')
    .split(',') || []
);
