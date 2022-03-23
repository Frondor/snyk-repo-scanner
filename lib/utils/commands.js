export default {
  fury: {
    get: (repoName) => `fury get ${repoName}`,
  },
  snyk: {
    deps: (severity = 'medium', fileName = 'dep-vuln.json') =>
      `npx snyk test --json-file-output=${fileName} --severity-threshold=${severity} --show-vulnerable-paths=false`,
    code: (severity = 'low', fileName = 'code-vuln.json') =>
      `npx snyk code test . --severity-threshold=${severity} > ${fileName}`,
  },
  git: {
    getBranch: () => 'git branch --show-current',
    getCommit: () => 'git rev-parse HEAD',
  },
};
