// app/routes/bands.js
import Route from '@ember/routing/route';
import wait from '../utils/wait';

export default Route.extend({
  model() {
    var bands = this.store.findAll('band');
    return wait(bands, 3 * 1000);
  },
  actions: {
    didTransition() {
      document.title = 'Bands - Rock & Roll';
    },
    createBand() {
      var route = this;
      var controller = this.get('controller');
      var band = this.store.createRecord('band',
        controller.getProperties('name'));
      band.save().then(function () {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band);
      });
    }
  }
});
