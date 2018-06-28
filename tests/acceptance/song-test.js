import { test } from 'qunit';
import { visit, andThen, fillIn, click, triggerEvent } from '@ember/test-helpers';
import Pretender from 'pretender';
test('Create a new song in two steps', function(assert) {
    new Pretender(function() {
    this.get('/bands', function() {
    var response = {
    data: [
    {
    id: 1,
    type: 'bands',
    attributes: {
    name: 'Radiohead'
    }
    }
    ]
    };
    return [200, { 'Content-Type': 'application/vnd.api+json' },
    JSON.stringify(response)];
    });
    this.get('/bands/1', function() {
    var response = {
    data: {
    id: 1,
    type: 'bands',
    attributes: {
    name: 'Radiohead'
    }
    }
    };
    return [200, { 'Content-Type': 'application/vnd.api+json' },
    JSON.stringify(response)];
    });
    this.post('/songs', function() {
    var response = {
    data: {
    id: 1,
    type: 'songs',
    attributes: {
    name: 'Killer Cars'
}
}
};
return [200, { 'Content-Type': 'application/vnd.api+json' },
JSON.stringify(response)];
});
this.get('/bands/1/songs', () => {
return [200, { 'Content-Type': 'application/vnd.api+json' },
JSON.stringify({ data: [] })];
});
});
visit('/');
click('.band-link:contains("Radiohead")');
click('a:contains("create one")');
fillIn('.new-song', 'Killer Cars');
triggerEvent('.new-song-form', 'submit');
andThen(function() {
assert.equal(find('.songs .song:contains("Killer Cars")').length,
1, "Creates the song and displays it in the list");
});
});