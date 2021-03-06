(function (Views, Models, Collections) {     
    Views.Board = Backbone.View.extend({
    
        el: $('#game'),
        
        initialize: function () {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.model.set({name: 'Que', second_player: 'Opponent'});

            this.render();
        },

        render: function () {
            var Table = $('<table>'), row_counter, row;
                
            for (row_counter = 0; row_counter < 8; row_counter += 1) {
                row = this.createRow(row_counter);
                $(Table).append(row);
            };
  
            $(this.el).append(Table);
            
            return this;
        },
        
        createRow: function (row_counter) {
            var row = $('<tr>'), $this = this, td, column_counter, cell, player = $this.model.get('player'), opponent, pawn;
            
            for (column_counter = 7; column_counter >= 0; column_counter--) {
                td = $('<td>');   
                cell = $this.createCell(row_counter, column_counter);  
                
                if (row_counter < 3 && cell.model.get('class') === 'black_div') {
                    if (player === 'white') {
                        opponent = 'red';
                    } else {
                        opponent = 'white';
                    }
                    
                    pawn = $this.createPawn(row_counter, column_counter, opponent); 
                    $(cell.render().el).append(pawn.render().el);
                    
                    cell.model.set({'player': opponent});
                }
                
                if (row_counter > 4 && cell.model.get('class') === 'black_div') { 
                    pawn = $this.createPawn(row_counter, column_counter, player); 
                    $(cell.render().el).append(pawn.render().el);
                    
                    cell.model.set({'player': player});
                }
                
                $this.collection.add(cell.model);
                
                $(td).append(cell.render().el);
                $(row).append(td);
            }
            
            return row;
        },
        
        createCell: function (row_counter, column_counter) {
            var model, modelView,
                row_key = this.model.getRowKey(row_counter),
                classname = this.model.getClass(row_counter, column_counter);
            
            model = new Models.Cell({
                'x': row_key,
                'y': column_counter,
                'id': column_counter + row_key,
                'class': classname
            });
            
            modelView = new Views.Cell({
                model: model
            });

            return modelView;
        },
        
        createPawn: function (row_counter, column_counter, player) {
            var model, modelView,
                row_key = this.model.getRowKey(row_counter);
            
            model = new Models.Pawn({
                'x': row_key,
                'y': column_counter,
                'from': column_counter + row_key,
                'class': 'pown ' + player,
                'src': 'images/' + player + '.png',
                'color': player
            });
            
            Collections.Pawns.add(model);
            
            modelView = new Views.Pawn({
                model: model
            });
            
            return modelView;
        }
    });
}(App.Views, App.Models, App.Collections));