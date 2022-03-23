## Scan for vulnerable dependencies and code

This tool aims to automate the scan and report of security vulnerabilities by running a pipeline of commands over a set of given repositories you are allowed to read and clone.

Snyk tries to infer its technology by guessing the package manager to work with.

### Requirements

1. `git`, `node v14` & `fury`
2. Snyk account with access to your github account and [Snyk Code setting](https://app.snyk.io/org/frondor/manage/snyk-code#sast-settings) enabled.

### Usage

1. Open a terminal and point the `cwd` to this same dir
2. Install the script dependencies with `npm install` (this needs node 14 at least, you can use `nvm use` to match the required version)
3. Run `node . --repos=product-modificator,product-creator`

> Notice we are passing a coma-separated list of repository names, just like they show in github, to the `--repos` argument

A new browser tab shall popup and ask you to authenticate with Snyk tools, after that just wait until everything runs and the reports are created.

### Reports

Depending on the technologies of each repository, you may see to reports generated in this directory's root:

#### `code-vun.md`

Read more about this @ https://snyk.io/learn/open-source-static-code-analysis/

#### `dep-vuln.csv`

A `csv` file with each vulnerable dependency the project has, its severity, a description and a possible remediation.


### Execution example

```console
node . --repos=fury_product-modificator
npx: instaló 1 en 1.306s

Now redirecting you to our auth page, go ahead and log in,
and once the auth is complete, return to this prompt and you'll
be ready to start using snyk.

If you can't wait use this url:
https://snyk.io/login?token=******&utm_medium=cli&utm_source=cli&utm_campaign=cli&os=darwin&docker=false


Your account has been authenticated. Snyk is now ready to be used.

Analysing dependencies at /Users/****/Documents/catalog-backoffice-snyk/.tmp/product-modificator
npx: instaló 1 en 1.322s

Testing /Users/****/Documents/catalog-backoffice-snyk/.tmp/product-modificator...

Tested 1315 dependencies for known issues, found 22 issues, 68 vulnerable paths.


Patchable issues:

  Patch available for lodash@4.15.0
  ✗ Prototype Pollution [Medium Severity][https://snyk.io/vuln/SNYK-JS-LODASH-567746] in lodash@4.15.0

  Patch available for lodash@4.15.0
  ✗ Prototype Pollution [Medium Severity][https://snyk.io/vuln/npm:lodash:20180130] in lodash@4.15.0


Issues with no direct upgrade or patch:
  ✗ Regular Expression Denial of Service (ReDoS) [Medium Severity][https://snyk.io/vuln/SNYK-JS-CSSWHAT-1298035] in css-what@3.4.2
  This issue was fixed in versions: 5.0.1
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-DEFAULTSDEEP-173661] in defaults-deep@0.2.4
  No upgrade or patch available
  ✗ Information Exposure [Medium Severity][https://snyk.io/vuln/SNYK-JS-FOLLOWREDIRECTS-2332181] in follow-redirects@1.5.10
  This issue was fixed in versions: 1.14.7
  ✗ Regular Expression Denial of Service (ReDoS) [Medium Severity][https://snyk.io/vuln/SNYK-JS-GLOBPARENT-1016905] in glob-parent@2.0.0
  This issue was fixed in versions: 5.1.2
  ✗ Regular Expression Denial of Service (ReDoS) [Medium Severity][https://snyk.io/vuln/SNYK-JS-JSBEAUTIFY-2311652] in js-beautify@1.14.0
  No upgrade or patch available
  ✗ Regular Expression Denial of Service (ReDoS) [Medium Severity][https://snyk.io/vuln/SNYK-JS-LODASH-1018905] in lodash@3.10.1
  This issue was fixed in versions: 4.17.21
  ✗ Command Injection [High Severity][https://snyk.io/vuln/SNYK-JS-LODASH-1040724] in lodash@3.10.1
  This issue was fixed in versions: 4.17.21
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-LODASH-450202] in lodash@3.10.1
  This issue was fixed in versions: 4.17.12
  ✗ Prototype Pollution [Critical Severity][https://snyk.io/vuln/SNYK-JS-LODASH-590103] in lodash@3.10.1
  This issue was fixed in versions: 4.17.20
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-LODASH-608086] in lodash@3.10.1
  This issue was fixed in versions: 4.17.17
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-LODASH-73638] in lodash@3.10.1
  This issue was fixed in versions: 4.17.11
  ✗ Regular Expression Denial of Service (ReDoS) [Medium Severity][https://snyk.io/vuln/SNYK-JS-LODASH-73639] in lodash@3.10.1
  This issue was fixed in versions: 4.17.11
  ✗ Prototype Pollution [Medium Severity][https://snyk.io/vuln/SNYK-JS-MINIMIST-559764] in minimist@1.2.0
  This issue was fixed in versions: 0.2.1, 1.2.3
  ✗ Regular Expression Denial of Service (ReDoS) [High Severity][https://snyk.io/vuln/SNYK-JS-NTHCHECK-1586032] in nth-check@1.0.2
  This issue was fixed in versions: 2.0.1
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-PROPERTIESREADER-1048968] in properties-reader@1.0.0
  This issue was fixed in versions: 2.2.0
  ✗ Prototype Pollution [Medium Severity][https://snyk.io/vuln/SNYK-JS-SETGETTER-1303099] in set-getter@0.1.1
  No upgrade or patch available
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-SETVALUE-1540541] in set-value@3.0.2
  This issue was fixed in versions: 4.0.1, 2.0.1
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-SETVALUE-450213] in set-value@0.2.0
  This issue was fixed in versions: 2.0.1, 3.0.1
  ✗ Prototype Pollution [High Severity][https://snyk.io/vuln/SNYK-JS-UNSETVALUE-2400660] in unset-value@0.1.2
  This issue was fixed in versions: 2.0.1
  ✗ Regular Expression Denial of Service (ReDoS) [High Severity][https://snyk.io/vuln/SNYK-JS-XSS-1584355] in xss@1.0.9
  This issue was fixed in versions: 1.0.10



Organization:      [username]
Package manager:   npm
Target file:       package-lock.json
Project name:      product-modificator
Open source:       no
Project path:      /Users/****/Documents/catalog-backoffice-snyk/.tmp/product-modificator
Licenses:          enabled


Analysing code at /Users/****/Documents/catalog-backoffice-snyk/.tmp/product-modificator
npx: instaló 1 en 1.278s

Generating vulnerabilities report
Generating code report
```