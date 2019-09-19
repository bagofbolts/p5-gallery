class ColorGrid{
    constructor(obj, sketch){
        if(obj instanceof ColorGrid){
            this.grid = [];
            for(var i = 0; i < obj.grid.length; i++){
                this.grid.push(obj.grid[i]);
            }
            this.sketch = sketch;
            this.size = obj.size;
        } else{
            this.size = obj;
            this.sketch = sketch;
            this.grid = [];
        }
    }

    setup(gradient) {
        for(var i = 0; i < this.size * this.size; i++){
            var refIndex = Math.floor(this.sketch.map(i, 0, this.size * this.size, 0, gradient.length));
            var posColor = gradient[refIndex];
            this.grid.push(posColor);
        }
    };

    draw() {
        for(var i = 0; i < this.size * this.size; i++){
            this.showColor(i, false);
        }
    }

    showColor(index, outlined){
        if(!outlined){
            this.sketch.noStroke();
        } else {
            this.sketch.strokeWeight(3);
            this.sketch.stroke(0);
        }
        this.sketch.fill(this.grid[index]);
        var l = Math.floor(this.sketch.width/ this.size);
        var pos = this.indexToPos(index);
        this.sketch.rect(pos[0] * l, pos[1] * l, l, l);
    }

    shuffle(){
        for(var i = this.size * this.size - 1; i > 0; i--){
            var pos = Math.floor(this.sketch.random(i+1));
            var temp = this.grid[i];
            this.grid[i] = this.grid[pos];
            this.grid[pos] = temp;
        }
    }

    indexToPos(index){
        var y = Math.floor(index / this.size);
        var rem = index % this.size;
        var x;

        // if(y % 2 == 0){
        //     x = rem;
        // } else {
        //     x = this.size - rem - 1;
        // }
        x = rem;

        var result = [];
        result.push(x);
        result.push(y);
        return result;
    }
}

class ColorComparator{
    constructor(gradient){
        this.gradient = gradient;
    }
    lt(a, b){
        a = this.gradient.indexOf(a);
        b = this.gradient.indexOf(b);
        return a < b;
    }
    lte(a, b){
        return this.lt(a, b) || this.e(a, b);
    }
    e(a, b){
        a = this.gradient.indexOf(a);
        b = this.gradient.indexOf(b);
        return a == b;
    }
    gte(a, b){
        return this.gt(a, b) || this.e(a, b);
    }
    gt(a, b){
        a = this.gradient.indexOf(a);
        b = this.gradient.indexOf(b);
        return a > b;
    }
}
