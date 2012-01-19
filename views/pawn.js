(function (Views, Collections) {    
    Views.Pawn = Backbone.View.extend({
    
        tagName: 'img',
        
        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove'); 
            $this = this;
            
            $($this.el).draggable({
                scroll: false,
                zIndex: 1000,
                revert: "invalid",
                containment: "#game",
                start: function() {
                    var from, pawnID, pawnModel = $this.model;
                            
                    pawnID = $(this).attr("id");
                    from = $(this).parent().attr("id");
                    
                    pawnModel.set({from: from});
		        }
            });
            
            $($this.el).data("backbone-view", $this);
        },

        render: function () {
            this.collection.add(this.model);
            
            $(this.el).attr({
                'id': this.model.cid,
                'class': this.model.get('class'),
                'src': this.model.get('src')
            });
            
            return this;
        },
        
        remove: function () {
            this.model.destroy();
        },
        
        unrender: function () {
           $(this.el).remove();
        }
    });
}(App.Views, App.Collections));