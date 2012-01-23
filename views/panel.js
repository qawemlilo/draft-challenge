(function (Views, Collections) {     
    var Panel = Backbone.View.extend({
    
        el: $('#mypanel'),
        
        events: {
            "keypress #terminal":  "createOnEnter",
            "focus #terminal": "handleFocus",
            "blur #terminal": "handleBlur"
        },
        
        initialize: function () {
            _.bindAll(this, 'render', 'echo', 'createOnEnter', 'handleFocus', 'handleBlur', 'blink', 'execute');
 
            this.input = this.$("#terminal");
            
            this.blink();
        },

        render: function () { 
            return this;
        },
        
        echo: function (html) {
            var p = $('<p>', {
                html: html
            });
            
            $(this.el).append(p);
        },
        
        handleFocus: function(e) {           
            this.input.val('');
            clearInterval(this.thandle);
        },
        
        handleBlur: function(e) {
            if (!this.input.val()) {
                this.input.val('_');
                
                this.blink();
            }
        },
        
        blink: function(e) {
            var $this = this;
            
            if (!$this.input.val()) {
                $this.input.val('_');
            }
                
            $this.thandle = setInterval(function(){
                if($this.input.val() === '_') { 
                    $this.input.val('');
                }
                else if(!$this.input.val()) {
                    $this.input.val('_');
                } 
                else {
                  return;
                }   
            }, 500);
        },
                
        createOnEnter: function(e) {
            if (e.keyCode != 13) {
                return;
            }
            var request = this.input.val(), $this = this, white=0, red=0;
            
            this.execute(request, function(result){
                $(result).each(function(i,item){
                    if(item === 'white') red += 1;
                    if(item === 'red') white += 1;
                });
            });
            
            $this.echo('[Red] ' + red);
            $this.echo('[White] ' + white);
        },
        
        execute: function (request, fn) {
            var arr = [];
            
            $(Collections.Pawns.models).each(function(i, m){
                arr.push(m.get('color'));
            });

            fn(arr);
        }
    });
    
    Views.Panel = new Panel();
}(App.Views, App.Collections));
