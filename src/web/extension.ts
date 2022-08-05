import { commands, ExtensionContext, languages, window } from 'vscode';
import { DecoratorFoldingRangeProvider } from './foldingProvider';

export function activate(context: ExtensionContext) {

  context.subscriptions.push(
    commands.registerCommand('folding-decorators.foldAll', () => {
      window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }),
    commands.registerCommand('folding-decorators.unfoldAll', () => {
      window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }),
    commands.registerCommand('folding-decorators.foldCustom', () => {
      window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }),
    commands.registerCommand('folding-decorators.unfoldCustom', () => {
      window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    })
  );

  const decoratorFoldingRangeProvider = new DecoratorFoldingRangeProvider();

  languages.registerFoldingRangeProvider('typescript', decoratorFoldingRangeProvider);

}

export function deactivate() { }
