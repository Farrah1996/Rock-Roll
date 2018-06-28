import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';


export default Route.extend({
    afterModel: function(band) {
        var description = band.get('description');
        if (isEmpty(description)) {
        this.transitionTo('bands.band.songs');
        } else {
        this.transitionTo('bands.band.details');
        }
        }
});
