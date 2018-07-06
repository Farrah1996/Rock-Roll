// adapters/application.js
import DS from 'ember-data';
export default DS.JSONAPIAdapter.extend({
   host: 'http://json-api.rockandrollwithemberjs.com' 
})