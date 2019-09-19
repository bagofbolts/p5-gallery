var rainbow;
var canvasSize = 240;
var colorCompare;

var sorted = new p5(function(s){
    var id = "canvas1-2";
    makeSketch(
        s,
        id,
        "Sorted Rainbow Gradient",
        {
            "setup" : function(){
                var canvas = s.createCanvas(canvasSize, canvasSize);
                canvas.parent(id);
                s.background(51);

                s.gridSize = 16;
                s.grid = new ColorGrid(s.gridSize, s);
                rainbow = rainbowGradient(s);
                colorCompare = new ColorComparator(rainbow);
                s.grid.setup(rainbow);
            },
            "draw" : function(){
                s.grid.draw();
                s.noLoop();
            },
        },
        []
    );
});

var unsorted = new p5(function(s){
    var id = "canvas1-1";
    makeSketch(
        s,
        id,
        "Unsorted (Shuffled) Gradient",
        {
            "setup" : function(){
                var canvas = s.createCanvas(canvasSize, canvasSize);
                canvas.parent(id);
                s.background(51);
                s.grid = new ColorGrid(sorted.grid, s);
                s.refresh();
            },
            "draw" : function(){
                if(s.playing){
                    s.grid.draw();
                    s.playing = false;
                }
            },
            "refresh" : function(){
                s.grid.shuffle();
                s.playing = true;
            }
        },
        [
            "refresh",
        ]
    );
});

var sorterSketch = function(type, id){
    return new p5(function(s){
        makeSketch(
            s,
            id,
            toTitleCase(type) + " Sort",
            {
                "setup" : function(){
                    var canvas = s.createCanvas(canvasSize, canvasSize);
                    canvas.parent(id);
                    s.background(51);
                    s.refresh();
                },
                "draw" : function(){
                    if(s.playing){
                        s.update();
                    }
                },
                "update" : function(){
                    if(!s.sorter.done){
                        s.grid.draw();
                        s.sorter.iterate(1);
                    } else if(!s.done) {
                        s.done = true;
                    }
                },
                "refresh" : function(){
                    s.grid = new ColorGrid(unsorted.grid, s);
                    s.sorter = new Sorter(s.grid, colorCompare, type);
                    s.stats = s.sorter.stats;
                    s.done = false;
                    s.update();
                    s.playing = false;
                }
            },
            [
                "refresh",
                "play",
                "stats"
            ]
        );
    });
};

var bubble = sorterSketch("bubble", "canvas2-1");
var selection = sorterSketch("selection", "canvas2-2");
var insertion = sorterSketch("insertion", "canvas2-3");
var merge = sorterSketch("merge", "canvas2-4");
var cocktail = sorterSketch("cocktail", "canvas2-5");
