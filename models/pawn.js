(function (Models) {
    Models.Pawn = Backbone.Model.extend({
        defaults: {
            src: '',
            color: '',
            x: '', 
            y: 0,
            from: '',
            to: '',
            'class': ''
        },
        
        isValidSingleMove: function () {
            var that = this, 
                from = that.createObj('from'), 
                to = that.createObj('to');

            return ((to.y === (from.y + 1) || to.y === (from.y - 1)) &&
                   ((to.x === that.lookUp( that.lookUp( from.x )  + 1 ) && that.get('color') === 'white') ||
                   (to.x === that.lookUp( that.lookUp( from.x ) - 1 ) && that.get('color') === 'red')));
        },
        
        toImageString: function () {
            var imgSring = '';
            imgSring += '<img src="' + this.get("src") + '" id="' + this.cid +'"';
            imgSring += 'class="pown ' + this.get("color") + '" >';
            return imgSring;
        },
        
        lookUp: function(val) {
            var alph_lookup = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7},
                num_lookup = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            
            if(typeof val === 'number') {
                return num_lookup[val];
            }
            else if (typeof val === 'string' && Object.prototype.hasOwnProperty.call(alph_lookup, val)) {
                return alph_lookup[val];
            }      
        },

        createObj: function (prop) {
           var str = this.get(prop), obj;
           
           obj = {
               x: str.charAt(1),
               y: parseInt(str)
           };
           
           return obj;
        },
        
        parentID: function () {
            return '#' + this.get("x") + this.get("y");
        }
    });
}(App.Models));