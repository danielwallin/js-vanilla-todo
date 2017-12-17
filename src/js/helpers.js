(function (window) {
    'use strict';

    window.findObjectWithKey = (arr, key, value) => {
        for (var index = 0; index < arr.length; index++) {
            if (arr[index][key] == value) {
                return arr[index];
            }
        }
    }

    // http://geekcoder.org/js-extract-hashtags-from-text/
    window.findHashtags = (inputText) => {
        inputText = inputText.toString();
        let regex = /((?:|^\s)(?:#)([a-zA-Zà-úÀ-Ú\d_\s]+))/gm;
        let matches = [];
        let match;

        while ((match = regex.exec(inputText))) { matches.push(match[1]); }
        return matches;
    }

    window.generateId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    // https://stackoverflow.com/questions/1484506/random-color-generator
    window.getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

})(window);