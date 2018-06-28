import { helper } from '@ember/component/helper';

export function capitalize(input) {
  var words = input.toString().split(/\s+/).map(function(word) {
  return word.toLowerCase().capitalize();
  });
  return words.join(' ');
}

export default helper(capitalize);
