import {
  Event,
  FoldingRange,
  FoldingRangeKind,
  FoldingRangeProvider,
  ProviderResult, 
  TextDocument
} from 'vscode';



export class DecoratorFoldingRangeProvider implements FoldingRangeProvider {

  public onDidChangeFoldingRanges?: Event<void> | undefined;

  public provideFoldingRanges(document: TextDocument): ProviderResult<Array<FoldingRange>> {
    const ranges: Array<FoldingRange> = [];
    const filteredRanges: Array<FoldingRange> = [];

    const text = document.getText();
    const decoratorRegex = /(?:^[ \t]*)(?:(?<=\.\.\.)|(?<!\.))@\w+.*/gm;
    const customRegex = /^[ \t]*(?:(?<=\.\.\.)|(?<!\.))\@Api\w+/g;
    const decoratedRegex = /(export)|(public)|(protected)|(private)/g;
    const inlineDecoratorRegex = /(?:^[ \t]*)(?:(?<=\.\.\.)|(?<!\.))@\w+\(.*\).+,$/;

    const decoratorMatches: Array<RegExpMatchArray> = Array.from(text.matchAll(decoratorRegex));
    const customMatches: Array<RegExpMatchArray> = Array.from(text.matchAll(customRegex));
    const decoratedMatches: Array<RegExpMatchArray> = Array.from(text.matchAll(decoratedRegex));

    for (const match of decoratorMatches) {

      if (inlineDecoratorRegex.test(match[0])) {
        console.log('Inline Decorator', match[0]);
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

}