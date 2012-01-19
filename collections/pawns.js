(function (Collections, Models) {
    Collections.Pawns = Backbone.Collection.extend({
        model: Models.Pawn
    });
}(App.Collections, App.Models));