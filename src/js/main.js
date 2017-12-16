(function () {
    'use strict';

    function App() {
        const model = new window.Model();
        const controller = new window.Controller(model);
        const view = new window.View(controller);
    }

    const app = new App();
    window.App = App;
})();