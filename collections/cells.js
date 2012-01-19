(function (Collections, Models) {
    Collections.Cells = Backbone.Collection.extend({
        model: Models.Cell
    });
}(App.Collections, App.Models));