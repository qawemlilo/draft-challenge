(function (Models) {
    Models.Cell = Backbone.Model.extend({
        defaults: {
            'x': '',
            'y': 0,
            'id': '',
            'class': '',
            'player': ''
        },
                
        getID: function () {
            return this.get("y") + this.get("x");
        },
        
        getPlayer: function () {
            return this.get("player");
        }
    });
}(App.Models));