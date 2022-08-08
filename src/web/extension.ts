import { commands, ExtensionContext, languages, TextDocument, window, workspace } from 'vscode';
import { DecoratorFoldingRangeProvider } from './foldingProvider';

const sbiFold = window.createStatusBarItem(1);
const sbiUnfold = window.createStatusBarItem(1);



export function activate(context: ExtensionContext) {
  const ACTIVATION_DELAY = workspace.getConfiguration('')?.get<number>('activation-delay') ?? 2000;
  setTimeout(() => setup(context), ACTIVATION_DELAY);
}



export function deactivate(): Promise<void> {
  return Promise.resolve(null);
}



function setup(context: ExtensionContext) {
  console.log('Registering DecoratorFoldingRangeProvider');

  const decoratorFoldingRangeProvider = new DecoratorFoldingRangeProvider();
  languages.registerFoldingRangeProvider('typescript', decoratorFoldingRangeProvider);

  setupAutoFold(context);
  foldDocument();

  sbiFold.text = '$(fold) Fold';
  sbiFold.command = 'editor.foldAllMarkerRegions';
  sbiFold.tooltip = 'Fold All Decorators';
  sbiFold.show();

  sbiUnfold.text = '$(unfold) Unfold';
  sbiUnfold.command = 'editor.unfoldAllMarkerRegions';
  sbiUnfold.tooltip = 'Unfold All Decorators';
  sbiUnfold.show();
}



function setupAutoFold(context: ExtensionContext) {
  let documents: readonly TextDocument[] = [];

  const disposable = window.onDidChangeVisibleTextEditors((editors) => {
    const activeEditor = window.activeTextEditor;

    if (editors.length > 0 && activeEditor) {
      const activeDocument = activeEditor.document;

      if (!documents.includes(activeDocument)) {
        foldDocument();
      }

      documents = workspace.textDocuments;
    }
  });

  context.subscriptions.push(disposable);
}



function foldDocument() {
  const config = workspace.getConfiguration('folding-decorators');
  const autoFold = config.get<boolean>('autoFold') ?? false;

  if (autoFold) {
    void commands.executeCommand('editor.foldAllRegions');
  }
} 
