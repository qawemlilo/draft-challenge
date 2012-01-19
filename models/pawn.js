(function (Models) {
    Models.Pawn = Backbone.Model.extend({
        defaults: {
            src: '',
            color: '',
            x:'', 
            y:0,
            from: '',
            to: '',
            'class': ''
        },
        
        isValidSingleMove: function () {
            var from = this.toObj('from'), 
                to = this.toObj('to');

            return ( from.y === (to.y + 1) || to.y === (from - 1) &&
                     to.x === this.getRowKey(from.y + 1) );
        },
        
        toImageString: function () {
            var imgSring = '';
            imgSring += '<img src="' + this.get("src") + '" id="' + this.cid +'"';
            imgSring += 'class="pown ' + this.get("color") + '" >';
            return imgSring;
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