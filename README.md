# Folding Decorators

This extension allows you to collapse decorators on your classes/functions.

## Known Issues

Since the VSCode API only allows for exsting [FoldingRangeKinds](https://code.visualstudio.com/api/references/vscode-api#FoldingRangeKind), I chose to use regions, so decorators will be toggled with the same command (`Un-/Fold All Regions`).

## Extension Settings

Future extension, currently not in scope:
* `folding-decorators.toggleDecorators`:\
  Choose to toggle all decorators, or just the ones defined by `folding-decorators.custom-regex`
* `folding-decorators.custom-regex`:\
  Define a Regex to only collapse selected decorators (eg. `/foo/` to only match those starting with `@Api` to match swagger docs)

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

see [changelog](./CHANGELOG.md)
