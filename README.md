# branch-name

A GitHub action to retrieve and sanitize branch names.

## Usage

```yaml
name: Deploy

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1

      - uses: common-fate/branch-name
        name: Get branch name
        id: branch
        with:
          branch: my-branch-name # optional, defaults to the branch the action is running in
          max-length: 32 # optional
          remove-trailing-dash: true # optional, defaults to true

      - name: Print branch name
        # use the branch name as follows
        run: ${{ steps.branch.outputs.name }}
```
