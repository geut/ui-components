# Contributing to ui-components

## Issue Contributions

When opening new issues or commenting on existing issues on this repository
please make sure discussions are related to concrete technical issues.

Try to be *friendly* (we are not animals :monkey: or bad people :rage4:) and explain correctly how we can reproduce your issue.

## Code Contributions

This document will guide you through the contribution process.

### Step 1: Fork

Fork the project [on GitHub](https://github.com/geut/ui-components) and check out your copy locally.

```bash
$ git clone git@github.com:username/ui-components.git
$ cd ui-components
$ npm install
$ git remote add upstream git://github.com/geut/ui-components.git
```

#### Which branch?

For developing new features and bug fixes, the `master` branch should be pulled
and built upon.

### Step 2: Branch

Create a feature branch and start hacking:

```bash
$ git checkout -b my-feature-branch -t origin/master
```

### Step 3: Test

Bug fixes and features **should come with tests**.

```bash
$ npm test
```

Make sure the linter is happy and that all tests pass. Please, do not submit
patches that fail either check.

### Step 4: Commit

Make sure git knows your name and email address:

```bash
$ git config --global user.name "J. Random User"
$ git config --global user.email "j.random.user@example.com"
```

Writing good commit logs is important. A commit log should describe what
changed and why.

### Step 5: Push

```bash
$ git push origin my-feature-branch
```

### Step 6: Make a pull request ;)