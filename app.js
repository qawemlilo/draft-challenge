var App = {

    Collections: {},
    
    Models : {},
    
    Views : {},
    
    initialize: function () {
        App.Collections.Pawns = new App.Collections.Pawns();
        
        var cells = new App.Collections.Cells();
        
        var board = new App.Views.Board({
        
            model: new App.Models.Board(),
            
            collection: cells
        });
    }
};

$(function () {
    App.initialize();
});