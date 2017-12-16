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
        let regex = /((?:|^\s)(?:#)([a-zA-Zà-úÀ-Ú\d]+))/gm;
        let matches = [];
        let match;

        while ((match = regex.exec(inputText))) { matches.push(match[1]); }
        return matches;
    }

    window.generateId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

})(window);