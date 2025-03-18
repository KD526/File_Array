const fs = require('fs');
const path = require('path');

/**
 * Initializes application 
 * @param {Function} onComplete
 * @param {Function} onError 
 */
function init_app(onComplete, onError) {
    const first_filepath = path.join(__dirname, 'file.txt');

    fs.readFile(first_filepath, { encoding: 'utf8' }, function (err, data) {
        if (err) {
            if (onError) {
                onError(err.message);
            } else {
                throw err;
            }
            return;
        }

        // Process the data to count occurrences
        const result = countOccurrences(data, "Mozilla"); 
        onComplete(result);
    });
}

/**
 * Counts occurrences of the keyword in the provided log data
 * @param {string} data - The content of the log file
 * @param {string} keyword - The keyword to count
 * @return {Object} - Contains counts of the keyword
 */
function countOccurrences(data, keyword) {
    const lines = data.split('\n');
    let count = 0;

    lines.forEach(line => {
        if (line.includes(keyword)) {
            count++;
        }
    });

    return {
        [keyword]: count
    };
}

// Usage
init_app((results) => {
    console.log('Count Results:', results);
}, (errorMsg) => {
    console.error('Initialization error:', errorMsg);
});
