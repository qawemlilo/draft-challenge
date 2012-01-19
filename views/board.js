(function (Views, Models, Collections) {     
    Views.Board = Backbone.View.extend({
    
        el: $('#game'),
        
        initialize: function () {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
            
            this.model.set({name: 'Que'});
            
            this.render();
        },

        render: function () {
            var table = $('<table>'), tr, x_counter, x,
                player = this.model.get('player'), td_counter,
                opponent, $this = this, pawn, td, y_counter;
                
            for (y_counter = 0; y_counter < 8; y_counter += 1) {
            
                tr = $('<tr>');
                
                x = $this.model.getRowKey(y_counter);
                
                for (td_counter = 7; td_counter >= 0; td_counter -= 1) {
                    var item = '', cellModel, cellDiv;
                      
                    td = $('<td>');     
                    
                    cellModel = new Models.Cell({
                        'x': x, 
                        'y': td_counter, 
                        'id': td_counter + x, 
                        'class': $this.model.getClass(y_counter, td_counter)
                    });
                                   
                    cellDiv = new Views.Cell({
                        model: cellModel
                    }).render().el;

                    if (y_counter < 3 && cellModel.get('class') === 'black_div') {     
                        if (player === 'white') {
                            opponent = 'red';
                        }
                        else{
                            opponent = 'white'
                        }   
                        pawn = new Views.Pawn({
                            model: new Models.Pawn({
                                'x': x,
                                'y': td_counter,
                                'class': ('pown ' + opponent), 
                                'src': ('images/' + opponent + '.png'),
                                'color': opponent                                
                            }),
                            
                            collection: Collections.Pawns
                        });
                        
                        $(cellDiv).append(pawn.render().el);
                        
                        cellModel.set({'player': opponent});
                    }
                    
                    if (y_counter > 4 && cellModel.get('class') === 'black_div') {    
                        pawn = new Views.Pawn({
                            model: new Models.Pawn({
                                'x': x,
                                'y': td_counter,
                                'class': ('pown ' + player), 
                                'src': ('images/' + player + '.png'),
                                'color': player                                
                            }),
                            
                            collection: Collections.Pawns
                        });
                        
                        $(cellDiv).append(pawn.render().el);
                        
                        cellModel.set({'player': player})
                    }
                    
                    $this.collection.add(cellModel);
                    $(td).append(cellDiv);
                    $(tr).append(td);
                }
                
                $(table).append(tr);
            };
  
            $(this.el).append(table);
            
            return this;
        }
    });
}(App.Views, App.Models, App.Collections));