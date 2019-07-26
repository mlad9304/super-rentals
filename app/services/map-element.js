import Service from '@ember/service';
import { camelize } from '@ember/string';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Service.extend({
    geocode: service(),
    map: service(),

    init() {
        if (!this.cashedMaps) {
            set(this, 'cashedMaps', {});
        }
        this._super(...arguments);
    },

    async getMapElement(location) {
        let camelizeLocation = camelize(location);
        let element = this.cashedMaps[camelizeLocation];
        if (!element) {
            element = this._createElement();
            let geocodedLocation = await this.geocode.fetchCoordinates(location);
            this.map.createMap(element, geocodedLocation);
            this.cashedMaps[camelizeLocation] = element;
        }
        return element;
    },

    _createElement() {
        let element = document.createElement('div');
        element.className = 'map';
        return element;
    }
});
