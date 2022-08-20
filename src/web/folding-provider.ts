import {
  commands,
  Event,
  FoldingRange,
  FoldingRangeKind,
  FoldingRangeProvider,
  ProviderResult,
  TextDocument,
  window,
  workspace
} from 'vscode';



export class DecoratorFoldingRangeProvider implements FoldingRangeProvider {

  public onDidChangeFoldingRanges?: Event<void> | undefined;

  private readonly inlineDecoratorRegex = /(?:^[ \t]*)(?:(?<=\.\.\.)|(?<!\.))@\w+\(.*\).+,$/;
  private readonly decoratorRegex = /(?:^[ \t]*)(?:(?<=\.\.\.)|(?<!\.))@\w+.*/gm;
  private readonly decoratedRegex = /^\s*(export)|(public)|(protected)|(private)/gm;
  private customRegexFromSettings: string;
  private customRegex: RegExp;
  private customRegexGlobal: RegExp;

  constructor() {
    this.updateCustomRegex();
  }



  public updateCustomRegex(): void {
    this.customRegexFromSettings = workspace.getConfiguration('folding-decorators').get<string>('customRegex');
    this.customRegex = new RegExp(`^[ \\t]*(?:(?<=\\.\\.\\.)|(?<!\\.))${this.customRegexFromSettings}\\w+.+`);
    this.customRegexGlobal = new RegExp(`^[ \\t]*(?:(?<=\\.\\.\\.)|(?<!\\.))${this.customRegexFromSettings}\\w+.+`, 'gm');
  }



  public provideFoldingRanges(document: TextDocument): ProviderResult<Array<FoldingRange>> {
    const decoratorSelection = workspace.getConfiguration('folding-decorators').get<string>('decorators');

    const text = document.getText();

    const decoratorMatches: Array<RegExpMatchArray> = Array.from(text.matchAll(this.decoratorRegex));
    const decoratedMatches: Array<RegExpMatchArray> = Array.from(text.matchAll(this.decoratedRegex));
    const customMatches: Array<RegExpMatchArray> = Array.from(text.matchAll(this.customRegexGlobal));

    const foldingRanges = decoratorSelection === 'custom regex' ?
      this.setupFoldingRangesForCustomDecorators(document, customMatches, decoratorMatches, decoratedMatches) :
      this.setupFoldingRangeForAllDecorators(document, decoratorMatches, decoratedMatches);

    return foldingRanges;
  }



  private setupFoldingRangeForAllDecorators(
    document: TextDocument,
    decoratorMatches: Array<RegExpMatchArray>,
    decoratedMatches: Array<RegExpMatchArray>
  ) {
    const ranges: Array<FoldingRange> = [];
    const filteredRanges: Array<FoldingRange> = [];

    for (const match of decoratorMatches) {

      if (this.inlineDecoratorRegex.test(match[0])) {
        continue;
      }

      const decoratorPosition = document.positionAt(match.index + match[0].indexOf('@'));
      const decoratedMatch = decoratedMatches.find(m => m.index > match.index);
      const decoratedPosition = document.positionAt(
        decoratedMatch?.index ?? 0
      );
      const foldingRange: FoldingRange = {
        start: decoratorPosition.line,
        end: decoratedPosition.line - 1,
        kind: FoldingRangeKind.Region
      };

      if (foldingRange.start !== foldingRange.end) {
        ranges.push(foldingRange);
      }

    }
    ranges.sort(
      (a, b) => {
        if (a.end === b.end) {
          return a.start - b.start;
        }
        return b.end - a.end;
      });

    ranges.forEach(r => {
      if (!filteredRanges.some(fr => fr.end === r.end)) {
        filteredRanges.push(r);
      }
    });

    return filteredRanges;
  }



  private async setupFoldingRangesForCustomDecorators(
    document: TextDocument,
    customMatches: Array<RegExpMatchArray>,
    decoratorMatches: Array<RegExpMatchArray>,
    decoratedMatches: Array<RegExpMatchArray>
  ) {
    const ranges: Array<FoldingRange> = [];
    const filteredRanges: Array<FoldingRange> = [];

    if (!this.customRegexFromSettings) {
      window.showErrorMessage('No custom selector provided!', 'Open settings')
      .then(res => {
        commands.executeCommand('workbench.action.openSettings', '@ext:fstreicher.folding-decorators');
      });
      return [];
    }

    for (const match of customMatches) {

      if (this.inlineDecoratorRegex.test(match[0])) { continue; }

      let hasOtherDecorator = false;

      const customDecoratorPosition = document.positionAt(match.index + match[0].indexOf('@'));
      const nextDecoratorMatch = decoratorMatches.find(m => {
        const text = m[0];
        const doesMatch = this.customRegex.test(text);
        return m.index > match.index && !doesMatch;
      });
      const decoratedMatch = decoratedMatches.find(m => m.index > match.index);

      const minPosition = Math.min(nextDecoratorMatch?.index, decoratedMatch?.index);
      const rangeEndPosition = document.positionAt(
        !isNaN(minPosition) ? minPosition : 0
      );
      const foldingRange: FoldingRange = {
        start: customDecoratorPosition.line,
        end: hasOtherDecorator ? rangeEndPosition.line : rangeEndPosition.line - 1,
        kind: FoldingRangeKind.Region
      };

      if (foldingRange.start !== foldingRange.end) {
        ranges.push(foldingRange);
      }

    }
    ranges.sort(
      (a, b) => {
        if (a.end === b.end) {
          return a.start - b.start;
        }
        return b.end - a.end;
      });

    ranges.forEach(r => {
      if (!filteredRanges.some(fr => fr.end === r.end)) {
        filteredRanges.push(r);
      }
    });

    return filteredRanges;
  }
}