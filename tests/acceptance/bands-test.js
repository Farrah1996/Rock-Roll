// tests/acceptance/bands-test.js
import {
  test
} from 'qunit';
import {
  click,
  andThen
} from '@ember/test-helpers';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

// tests/acceptance/bands-test.js
test('Search songs', function (assert) {
  server = new Pretender(function () {
    httpStubs.stubBands(this, [{
      id: 1,
      attributes: {
        name: 'Them Crooked Vultures',
      }
    }]);
    httpStubs.stubSongs(this, 1, [{
        id: 1,
        attributes: {
          title: 'Elephants',
          rating: 5
        }
      },
      {
        id: 2,
        attributes: {
          title: 'New Fang',
          rating: 4
        }
      },
      {
        id: 3,
        attributes: {
          title: 'Mind Eraser, No Chaser',
          rating: 4
        }
      },
      {
        id: 4,
        attributes: {
          title: 'Spinning in Daffodils',
          rating: 5
        }
      },
      {
        id: 5,
        attributes: {
          title: 'No One Loves Me & Neither Do I',
          rating: 5
        }
      }
    ]);
  });
  visit('/bands/1');
  fillIn('.search-field', 'no');
  andThen(function () {
    assertLength(assert, '.song', 2, 'The songs matching the search term are displayed');
  });
  click('button.sort-title-desc');
  andThen(function () {
    assertTrimmedText(assert, '.song:first', 'Spinning In Daffodils',
      'The first song is the one that is the last in the alphabet');
    assertTrimmedText(assert, '.song:last', 'Mind Eraser, No Chaser',
      'A matching song that comes sooner in the alphabet appears at the bottom ');
  });
  click('button.sort-rating-asc');
  andThen(function () {
    assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc');
    assertTrimmedText(assert, '.song:last', 'Spinning In Daffodils',
      'The last song is the highest ranked, last in the alphabet');
  });
});
