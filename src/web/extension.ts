import { ExtensionContext, languages } from 'vscode';
import { DecoratorFoldingRangeProvider } from './foldingProvider';

export function activate(context: ExtensionContext) {

  const decoratorFoldingRangeProvider = new DecoratorFoldingRangeProvider();

  console.log('Activating...');
  setTimeout(() => {
    console.log('Registering Provider');
    languages.registerFoldingRangeProvider('typescript', decoratorFoldingRangeProvider);
  }, 3000);

}

export function deactivate() { }
