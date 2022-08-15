# Folding Decorators

This extension allows you to collapse decorators on your classes/functions. This should probably work for other languages as well, but is currently scoped to Typescript only.

## Extension Settings

* `folding-decorators.autoFold`:\
  Enable auto-folding on file open
* `folding-decorators.decorators`:\
  Choose to toggle all decorators, or just the ones defined by `folding-decorators.customRegex`
* `folding-decorators.customRegex`:\
  Define a RegEx-like selector to only collapse certain decorators.
* `folding-decorators.activationDelay`:\
  Set a delay for setting the folding ranges.

## Known Issues

Since the VSCode API only offers `Import`, `Comment` and `Region` as [FoldingRangeKind](https://code.visualstudio.com/api/references/vscode-api#FoldingRangeKind) and does not allow to define custom ones, this extension uses `Region`. So if you use `// #region` markers in your code, those will be folded as well.

## Release Notes

see [changelog](./CHANGELOG.md)
