var App = {

    Collections: {},
    
    Models : {},
    
    Views : {},
    
    initialize: function () {
        var board = new App.Views.Board({
            model: new App.Models.Board(),
            collection: new App.Collections.Cells()
        });
    }
};

$(function () {
    App.initialize();
});