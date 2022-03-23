import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import Sheet from '../Sheet.js';
import commands from './commands.js';

export const writeReport = (content, fileName) => {
  writeFileSync(path.join(process.cwd(), '../..', fileName), content);
};

const gitInfo = (cmdOptions = {}) => {
  const options = {
    stdio: 'pipe',
    ...cmdOptions,
  };
  const branch = execSync(commands.git.getBranch(), options).toString().trim();
  const commit = execSync(commands.git.getCommit(), options).toString().trim();

  return { branch, commit };
};

export const readDependencyVulnerabilities = (filePaths) => {
  return filePaths.reduce((sheet, filePath) => {
    const { branch, commit } = gitInfo({
      cwd: path.dirname(filePath),
    });
    try {
      const file = JSON.parse(readFileSync(filePath));
      file.vulnerabilities.forEach(
        ({
          id,
          title,
          severity,
          malicious,
          name,
          version,
          isUpgradable,
          isPatchable,
          from = [],
          fixedIn = [],
        }) =>
          sheet.append({
            Project: file.projectName,
            Branch: branch,
            Commit: commit,
            'Vulnerability ID': id,
            Title: title,
            Severity: severity,
            Malicious: malicious,
            Package: name,
            Version: version,
            Dependants: from.join(' | '),
            Patchable: isPatchable,
            Upgradable: isUpgradable,
            'Fixed in': fixedIn[0],
            'Remediation: upgrade': JSON.stringify(file.remediation.upgrade[id] || {}),
            'Remediation: patch': JSON.stringify(file.remediation.patch[id] || {}),
          })
      );
    } catch (error) {
      console.log('Error: failed to read', filePath);
    }

    return sheet;
  }, new Sheet(['Project', 'Branch', 'Commit', 'Vulnerability ID', 'Title', 'Severity', 'Malicious', 'Package', 'Version', 'Dependants', 'Patchable', 'Upgradable', 'Fixed in', 'Remediation: upgrade', 'Remediation: patch']));
};

export const readCodeVulnerabilities = (filePaths) => {
  return filePaths.reduce((doc, filePath) => {
    try {
      let file = readFileSync(filePath).toString();
      const { branch, commit } = gitInfo({
        cwd: path.dirname(filePath),
      });
      const projectName = path.basename(path.dirname(filePath));
      doc += file.replace('\nTesting . ...', `\n# ${projectName} (${branch} @ ${commit})`);
    } catch (error) {
      console.log('Error: failed to read', filePath);
    }
    return doc;
  }, '');
};
