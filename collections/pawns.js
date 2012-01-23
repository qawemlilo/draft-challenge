(function (Collections, Models) {
    var Pawns = Backbone.Collection.extend({
        model: Models.Pawn
    });
    
    Collections.Pawns = new Pawns();
}(App.Collections, App.Models));