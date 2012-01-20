(function (Views) {  
    Views.Cell = Backbone.View.extend({
    
        tagName: 'div',
        
        initialize: function () {
            _.bindAll(this, 'render');

            $this = this;
            
            $($this.el).droppable({
                accept: '.pown',
                
                hoverClass: 'yellow',
                
                drop: function(event, ui) {
                    var from, pawnID, pawnModel, to = $(this).attr('id');

                    pawnModel = $(ui.draggable).data("backbone-view").model;

                    //if ($this.model.getPlayer()) {
                        //$('#' + pawnModel.cid).draggable({revert: true});
                        //return;
                    //}
                    
                    pawnModel.set({to: to});
		        }
            });
            
            $($this.el).data("backbone-view", $this);
        },

        render: function () {   
            $(this.el).attr({'id': this.model.getID(), 'class': this.model.get('class')});
            
            return this;
        }
    });
}(App.Views));