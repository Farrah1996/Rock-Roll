import Controller from '@ember/controller';
import {
  sort
} from '@ember/object/computed';
import {
  isEmpty
} from '@ember/utils';
import {
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
  canCreateSong: computed('songCreationStarted', 'model.songs.[]',
    function () {
      return this.get('songCreationStarted') ||
        this.get('model.songs.length');
    }),

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
  isAddButtonDisabled: computed('title', function () {
    return isEmpty(this.get('title'));
  }),

  newSongPlaceholder: computed('model.name', function() {
    var bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
    }),
    
  actions: {
    setSorting: function(option) {
        this.set('sortBy', option);
        },
    enableSongCreation: function () {
      this.set('songCreationStarted', true);
    },
    updateRating: function (params) {
      var song = params.item,
        rating = params.rating;
      if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      return song.save();
    }
  }
});
