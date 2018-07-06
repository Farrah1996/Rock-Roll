import Controller from '@ember/controller';
import { empty } from '@ember/object/computed';

export default Controller.extend({
    name: '',
    isAddButtonDisabled: empty('name'),
});
