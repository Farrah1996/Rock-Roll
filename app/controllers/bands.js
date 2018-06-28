import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

export default Controller.extend({
    name: '',
isAddButtonDisabled: computed('name', function() {
return isEmpty(this.get('name'));
})
});
