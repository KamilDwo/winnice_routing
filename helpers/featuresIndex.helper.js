'use strict';

const featuresIndex = name => {
    switch (name) {
        case 'accommodation':
            return 'Accommodation';
        case 'additional':
            return 'Additional';
        case 'events':
            return 'Events';
        case 'meals':
            return 'Meals';
        case 'sightseeing':
            return 'Sightseeing';
        case 'tastings':
            return 'Tastings';
        case 'sale':
            return 'Sale';
    }
}

module.exports = featuresIndex;
