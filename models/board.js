(function (Models) {
    Models.Board = Backbone.Model.extend({
        defaults: {
            'player': 'red',
            'name': '',
            'second_player': '',            
        },
        
        getClass: function(x, y) {
            return (x  % 2 === 0) ? ((y  % 2 === 0) ?  "black_div" : "white_div") : ((y  % 2 === 0) ?  "white_div" : "black_div");
        },
        
        getRowKey: function (i) {
            var k = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            return k[i];
        }
    });
}(App.Models));
