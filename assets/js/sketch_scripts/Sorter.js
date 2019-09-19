class Sorter{
    constructor(grid, comparator, type){
        this.grid = grid;
        this.data = this.grid.grid;
        this.comp = comparator;
        this.type = type;
        this.stats = { "comparisons" : 0, "array accesses": 0};
        this.setup();
    }

    setup(){
        this.done = false;
        switch(this.type){
            case "bubble":
                this.i = 0;
                this.j = 0;
                break;
            case "merge":
                this.k = 1;
                this.ls = 0;
                this.base = this.ls;
                this.rs = this.ls + this.k;
                this.re = this.rs + this.k;
                if(this.re > this.data.length){
                    this.re = this.data.length;
                }
                break;
            case "selection":
                this.bigPos = 0;
                this.i = 0;
                this.j = 1;
                break;
            case "insertion":
                this.i = 1;
                this.j = this.i;
                break;
            case "cocktail" :
                this.f = 0;
                this.r = this.data.length;
                this.dir = 1;
                this.pos = this.f;
                break;
        }
    }

    iterate(times){
        for(var t = 0; t < times; t++){
            switch(this.type){
                case "bubble":
                    if(this.i < this.data.length - 1){
                        if(this.comp.gt(this.data[this.j], this.data[this.j + 1])){
                            var temp = this.data[this.j];
                            this.data[this.j] = this.data[this.j+1];
                            this.data[this.j+1] = temp;
                            this.stats["array accesses"] += 4;
                            this.grid.showColor(this.j, true);
                        }
                        this.stats["array accesses"] += 2;
                        this.j++;
                        if(this.j == this.data.length - 1 - this.i){
                            this.j = 0;
                            this.i++;
                        }
                    } else {
                        this.done = true;
                    }
                    break;
                case "merge":
                    if(this.k < this.data.length){
                        if(this.base + this.k < this.data.length){
                            for(var p = this.ls; p < this.re; p++){
                                this.grid.showColor(p, true);
                            }
                            if(this.ls < this.rs && this.rs < this.re){
                                if(this.comp.gt(this.data[this.ls], this.data[this.rs])){
                                    var temp = this.data[this.rs];
                                    this.stats["array accesses"] += 1;
                                    for(var p = this.rs; p > this.ls; p--){
                                        this.data[p] = this.data[p-1];
                                        this.stats["array accesses"] += 2;
                                    }
                                    this.data[this.ls] = temp;
                                    this.stats["array accesses"] += 1;
                                    this.rs++;
                                }
                                this.stats["array accesses"] += 2;
                                this.ls++;
                            } else {
                                this.ls = this.re;
                                this.base = this.ls;
                                this.rs = this.ls + this.k;
                                this.re = this.rs + this.k;
                                if(this.re > this.data.length){
                                    this.re = this.data.length;
                                }
                            }
                        } else {
                            this.k *= 2;
                            this.ls = 0;
                            this.base = this.ls
                            this.rs = this.ls + this.k;
                            this.re = this.rs + this.k;
                            if(this.re > this.data.length){
                                this.re = this.data.length;
                            }
                        }
                    } else {
                        this.done = true;
                    }
                    break;
                case "selection":
                    if(this.i < this.data.length){
                        this.grid.showColor(this.bigPos, true);
                        if(this.j < this.data.length - this.i){
                            this.grid.showColor(this.j, true);
                            if(this.comp.lt(this.data[this.bigPos], this.data[this.j])){
                                this.bigPos = this.j;
                            }
                            this.stats["array accesses"] += 2;
                            this.j++;
                        } else {
                            this.j--;
                            var temp = this.data[this.j];
                            this.data[this.j] = this.data[this.bigPos];
                            this.data[this.bigPos] = temp;
                            this.stats["array accesses"] += 4;
                            this.bigPos = 0;
                            this.i++;
                            this.j = 1;
                        }
                    } else {
                        this.done = true;
                    }
                    break;
                case "insertion":
                    if(this.i < this.data.length){
                        this.grid.showColor(this.j , true);
                        if(this.j > 0){
                            if(this.comp.lt(this.data[this.j], this.data[this.j - 1])){
                                var temp = this.data[this.j];
                                this.data[this.j] = this.data[this.j - 1];
                                this.data[this.j - 1] = temp;
                                this.stats["array accesses"] += 4;
                                this.j--;
                            } else {
                                this.i++;
                                this.j = this.i;
                            }
                            this.stats["array accesses"] += 2;
                        } else {
                            this.i++;
                            this.j = this.i;
                        }
                    } else {
                        this.done = true;
                    }
                    break;
                case "cocktail" :
                    if(this.f != this.r){
                        this.grid.showColor(this.pos, true);
                        if(this.dir > 0){
                            if(this.comp.gt(this.data[this.pos], this.data[this.pos + this.dir])){
                                var temp = this.data[this.pos];
                                this.data[this.pos] = this.data[this.pos + this.dir];
                                this.data[this.pos + this.dir] = temp;
                                this.stats["array accesses"] += 4;
                            }
                            this.stats["array accesses"] += 2;
                            this.pos++;
                            if(this.pos == this.r - 1){
                                this.dir = -1;
                                this.r--;
                                this.pos = this.r;
                            }
                        } else {
                            if(this.comp.lt(this.data[this.pos], this.data[this.pos + this.dir])){
                                var temp = this.data[this.pos];
                                this.data[this.pos] = this.data[this.pos + this.dir];
                                this.data[this.pos + this.dir] = temp;
                                this.stats["array accesses"] += 4;
                            }
                            this.stats["array accesses"] += 2;
                            this.pos--;
                            if(this.pos == this.f){
                                this.dir = 1;
                                this.f++;
                                this.pos = this.f;
                            }
                        }
                    } else {
                        this.done = true;
                    }
                    break;
            }
            this.stats.comparisons++;
        }
    }
}
