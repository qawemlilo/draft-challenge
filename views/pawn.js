(function (Views, Collections) {    
    Views.Pawn = Backbone.View.extend({
    
        tagName: 'img',
        
        events: {
            "dblclick":  "remove"
        },
        
        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove', 'onMove'); 
            $this = this;
            
            this.model.bind('remove', this.unrender);
            this.model.bind('change:to', this.onMove);
            
            $(this.el).draggable({
            
                scroll: false,
                
                zIndex: 1000,
                
                revert: "invalid",
                
                containment: "#game",
                
                start: function() {
                    var pawnID = $(this).attr("id"), 
                        pawnModel = Collections.Pawns.getByCid(pawnID),
                        from = pawnModel.get('to') || $(this).parent().attr("id");
                    
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
            var $this = this, html;
            
            $($this.el).draggable({revert: 'invalid'});
            
            if (this.model.isValidSingleMove()) {
                html = '[' + $this.model.cid + '] From #' + $this.model.get('from') + ' To ' + $this.model.get('to');
                Views.Panel.echo(html);
            }
            else {
                $($this.el).draggable({revert: true});
            }                 
        },

        remove: function () {
            this.model.destroy();
        },
        
        unrender: function () {
           $(this.el).remove();
        }
    });
}(App.Views, App.Collections));