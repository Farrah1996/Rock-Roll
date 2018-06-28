// tests/helpers/asserts.js
import { registerHelper } from '@ember/test';
function assertTrimmedText(app, assert, selector, text, errorMessage) {
var element = findWithAssert(selector);
var elementText = element.text().trim();
assert.equal(elementText, text, errorMessage);
}
function assertLength(app, assert, selector, length, errorMessage) {
assert.equal(find(selector).length, length, errorMessage);
}
function assertElement(app, assert, selector, errorMessage) {
assert.equal(find(selector).length, 1, errorMessage);
}
registerHelper('assertTrimmedText', assertTrimmedText);
registerHelper('assertLength', assertLength);
registerHelper('assertElement', assertElement);