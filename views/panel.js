(function (Views) {     
    var Panel = Backbone.View.extend({
    
        el: $('#mypanel'),
        
        initialize: function () {
            _.bindAll(this, 'render', 'echo'); // fixes loss of context for 'this' within methods

        },

        render: function () { 
            return this;
        },
        
        echo: function (html) {
            var p = $('<p>', {
                html: html
            });
            
            $(this.el).append(p);
        }
    });
    
    Views.Panel = new Panel();
}(App.Views));