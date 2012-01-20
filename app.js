var App = {

    Collections: {},
    
    Models : {},
    
    Views : {},
    
    initialize: function () {
        App.Collections.Pawns = new App.Collections.Pawns();
        App.Views.Panel = new App.Views.Panel();
        
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