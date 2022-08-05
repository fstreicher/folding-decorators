import {
  Event,
  FoldingRange,
  FoldingRangeKind,
  FoldingRangeProvider,
  ProviderResult,
  Range,
  TextDocument
} from 'vscode';



export class DecoratorFoldingRangeProvider implements FoldingRangeProvider {

  public onDidChangeFoldingRanges?: Event<void> | undefined;

  public provideFoldingRanges(document: TextDocument): ProviderResult<Array<FoldingRange>> {
    const ranges: Array<FoldingRange> = [];

    const text = document.getText();
    const decoratorRegex = /(?<![_$[:alnum:]])(?:(?<=\.\.\.)|(?<!\.))\@\w+/g;

    const matches: Array<RegExpMatchArray> = Array.from(text.matchAll(decoratorRegex));

    for (const match of matches) {
      const position = document.positionAt(match.index);
      const range: Range = document.getWordRangeAtPosition(position);
      const foldingRange: FoldingRange = {
        start: 174,
        end: 245
      };

      // if (range) {
      //   ranges.push(foldingRange);
      // }

    }

    const foldingRange: FoldingRange = {
      start: 173,
      end: 245,
      kind: FoldingRangeKind.Region
    };

    ranges.push(foldingRange);

    return ranges;
  }

}