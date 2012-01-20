(function (Views, Collections) {    
    Views.Pawn = Backbone.View.extend({
    
        tagName: 'img',
        
        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove', 'onMove'); 
            $this = this;
            
            this.model.bind('change:to', this.onMove);
            
            $($this.el).draggable({
                scroll: false,
                zIndex: 1000,
                revert: "invalid",
                containment: "#game",
                start: function() {
                    var from, pawnID, pawnModel = $this.model;
                            
                    pawnID = $(this).attr("id");
                    from = $(this).parent().attr("id");
                    
                    console.log(pawnModel.get('y'));
                    
                    pawnModel.set({from: from});
		        }
            });
            
            $($this.el).data("backbone-view", $this);
        },

        render: function () {
            $(this.el).attr({
                'id': this.model.cid,
                'class': this.model.get('class'),
                'src': this.model.get('src')
            });
            
            return this;
        },
        
        onMove: function () {
            var html;
            
            if (this.model.isValidSingleMove()) {
                html = '[' + this.model.cid + '] From #' + this.model.get('x') + ' To' + this.model.parentID();
            }
            else {
                html = 'Invalid move';
            }
            
            var p = $('<p>', {
                html: html
            });
            
            $('#mypanel').append(p);
        },

        remove: function () {
            this.model.destroy();
        },
        
        unrender: function () {
           $(this.el).remove();
        }
    });
}(App.Views, App.Collections));