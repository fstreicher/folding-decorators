import * as assert from 'assert';
import { TextDocument, window } from 'vscode';

import { DecoratorFoldingRangeProvider } from '../folding-provider';

const sampleDocument :TextDocument = {

}


suite('Web Extension Test Suite', () => {
  window.showInformationMessage('Start all tests.');

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  // expect folding ranges from `provideFoldingRanges`
  // mock configuration -> custom/all decorators

});
