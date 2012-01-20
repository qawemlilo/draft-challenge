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
                    var pawnID = $(this).attr("id"), 
                        pawnModel = Collections.Pawns.getByCid(pawnID),
                        from = pawnModel.get('to') || $(this).parent().attr("id");
                    
                    pawnModel.set({from: to || from});
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
            var p, html = '[' + this.model.cid + '] From #' + this.model.get('from') + ' To ' + this.model.get('to');
            
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