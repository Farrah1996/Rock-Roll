// app/routes/bands/band/songs.js
import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { capitalize as capitalizeWords } from 'again/helpers/capitalize'


export default Route.extend({
    noSongs: computed('model.songs.[]', function() {
        return this.get('model.songs.length') === 0;
        }),
model() {
    return this.modelFor('bands.band');
},
resetController(controller) {
    controller.set('songCreationStarted', false);
    },
actions: {
    didTransition() {
        var band = this.modelFor('bands.band');
        var name = capitalizeWords(band.get('name'));
        document.title = `${band.get(name)} songs - Rock & Roll`;
        },
    createSong() {
    var controller = this.get('controller');
    var band = this.modelFor('bands.band');
    var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
        });
        song.save().then(function() {
        controller.set('title', '');
        });
    }
    }
});