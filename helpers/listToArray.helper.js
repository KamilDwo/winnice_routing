const listToArray = (fullString, separator) => {
    let fullArray = [];

    if (fullString !== undefined && fullString !== '' && fullString !==  null) {
        if (fullString.indexOf(separator) === -1) {
            fullArray.push(parseFloat(fullString));
        }
        else {
            fullArray = fullString.split(separator);
            fullArray = fullArray.map(arrayItem => parseInt(arrayItem));
        }
    }
    return fullArray;
};

module.exports = listToArray;
