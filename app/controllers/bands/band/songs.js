import Controller from '@ember/controller';
import { sort, empty, bool, or } from '@ember/object/computed';import {
  computed
} from '@ember/object';
import { capitalize } from 'again/helpers/capitalize';

export default Controller.extend({
    queryParams: {
        sortBy: 'sort',
        searchTerm: 's',
        },
    sortBy: 'ratingDesc',
    sortProperties: computed('sortBy', function() {
    var options = {
    'ratingDesc': 'rating:desc,title:asc',
    'ratingAsc': 'rating:asc,title:asc',
    'titleDesc': 'title:desc',
    'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
    }),  sortedSongs: sort('matchingSongs', 'sortProperties'),
  songCreationStarted: false,
  hasSongs: bool('model.songs.length'),
canCreateSong: or('songCreationStarted', 'hasSongs'),

    searchTerm: '',
matchingSongs: computed('model.songs.@each.title', 'searchTerm',
function() {
var searchTerm = this.get('searchTerm').toLowerCase();
return this.get('model.songs').filter(function(song) {
return song.get('title').toLowerCase().indexOf(searchTerm) !==
-1;
});
}),

  title: '',
  isAddButtonDisabled: empty('title'),

  newSongPlaceholder: computed('model.name', function() {
    var bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
    }),
    
  actions: {
    setSorting(option) {
        this.set('sortBy', option);
        },
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },
    updateRating(params) {
      let { item: song, rating } = params;     if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      return song.save();
    }
  }
});
