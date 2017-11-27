const ViewabilityHelper = require('../lib/viewability-helper.min');

const myObserver = new ViewabilityHelper(document.getElementById('cube'), () => {
    console.log('Observed');
}, {threshold: [0], unobserve: true});

myObserver.observe();
