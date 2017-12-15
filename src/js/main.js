(function () {
    'use strict';

    function App() {
        const store = new window.Store();
        const controller = new window.Controller(store);
    }

    const app = new App();
    window.App = App;
})();