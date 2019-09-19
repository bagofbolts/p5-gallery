var makeSketch = function(s, id, title, funcs, controls){
    s.id = id;
    s.title = title;
    for(var key in funcs){
        s[key] = funcs[key];
    }

    s.controls = controls;
    jQuery(function(){
        window.setTimeout(function(){
            bindSketch(s);
        },500);
    })
}

var bindSketch = function(s){
    var canvasHolder = $("#" + s.id);
    canvasHolder.addClass("canvas-holder col-auto m-2 py-3");
    var canvas = canvasHolder.find("canvas");

    if(s.title){
        canvas.before($("<h5>").addClass("canvas-title text-center").append(s.title));
    }

    if(s.controls && s.controls.length > 0){
        var buttonGroup = $("<div>").addClass("px-3 row justify-content-center");
        canvasHolder.append(buttonGroup);
        if(s.controls.indexOf("refresh") != -1){
            // Creating button element
            var refButton = $("<button>").addClass("btn btn-lg");
            refButton.append($("<i>").addClass("fa fa-sync"));
            buttonGroup.append($("<div>").addClass("col-auto px-1").append(refButton));
            refButton.click(function(){
                s.refresh();
            })
        }
        if(s.controls.indexOf("play") != -1){
            s.playing = false;

            // Creating button element
            var playButton = $("<button>").addClass("btn btn-lg");
            playButton.append($("<i>").addClass("fa fa-play"));
            buttonGroup.append($("<div>").addClass("col-auto px-1").append(playButton));

            // Click function
            playButton.click(function () {
                s.playing = !s.playing;
            })

            // Ensuring right icon
            window.setInterval(function(){
                if(s.playing){
                    $(playButton).find("i").addClass("fa-pause").removeClass("fa-play");
                } else {
                    $(playButton).find("i").addClass("fa-play").removeClass("fa-pause");
                }
                $(playButton).prop("disabled", s.done);
            }, 10);
        }
        if(s.controls.indexOf("stats") != -1){
            var statsButton = $("<button>").addClass("btn btn-lg");
            statsButton.append($("<i>").addClass("fa fa-chart-bar"));

            var statsHolder = $("<div>").addClass("stats-holder");
            var ulist = $("<div>").attr("id", s.id + "-stats");
            statsHolder.append($(ulist));
            statsHolder.hide();
            canvasHolder.append($(statsHolder));
            buttonGroup.append($("<div>").addClass("col-auto px-1").append(statsButton));

            window.setInterval(function(){
                var list = "";
                for(var key in s.stats){
                    var item = $("<div>");
                    item.html("" + toTitleCase(key) + " : " + s.stats[key]);
                    list += item.prop("outerHTML");
                }
                if(list){
                    $(ulist).html(list);
                }
            }, 10);

            statsButton.click(function(){
                canvasHolder.find(".stats-holder").each(function(){
                    $(this).toggle();
                });
            });
        }
    }
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

// var example = function(s){
//     var id = "canvas1-1"
//     makeSketch(
//         s,
//         id,
//         "Examples are fun",
//         function(){
//             s.y = 0;
//             s.dir = 1;
//         },
//         {
//             "setup" : function(){
//                 var canvas = s.createCanvas(400, 400);
//                 canvas.parent(id);
//                 s.noStroke();
//                 s.refresh();
//             },
//             "draw" : function(){
//                 if(s.playing){
//                     s.update();
//                 }
//             },
//             "update" : function(){
//                 s.background(51);
//                 s.ellipse(s.width/2, s.y, 50);
//                 s.y += s.dir;
//                 if(s.y > s.height || s.y < 0){
//                     s.dir *= -1;
//                 }
//             },
//             "refresh" : function(){
//                 s.construct();
//                 s.background(51);
//                 s.playing = false;
//             }
//         },
//         [
//             "refresh",
//             "play"
//         ]
//     );
// }
// var myp5 = new p5(example);
