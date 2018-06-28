// tests/helpers/async-helpers.js
import { registerAsyncHelper } from '@ember/test';
function selectBand(app, name) {
visit('/')
.click('.band-link:contains("' + name + '")');
return app.testHelpers.wait();
}

function submit(app, selector) {
    return triggerEvent(selector, 'submit');
    }

registerAsyncHelper('selectBand', selectBand);
registerAsyncHelper('submit', submit);