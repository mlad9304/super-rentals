import Component from '@ember/component';

export default Component.extend({
    classNames: ['list-filter'],
    value: '',

    init() {
        this._super(...arguments);
        this.filter('').then(results => this.set('results', results.results));
    },

    actions: {
        handleFilterEntry() {
            let filterInputValue = this.value;
            let filterAction = this.filter;
            filterAction(filterInputValue).then(results => {
                if (this.value === results.query) {
                    this.set('results', results.results);
                }
            });
        }
    }
});
