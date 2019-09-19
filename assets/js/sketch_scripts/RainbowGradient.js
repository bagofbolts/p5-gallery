function rainbowGradient(sketch){
    var refColor = [255, 0, 0];
    var colors = [];

    var currChannel = 1; // 0 - red , 1- green, 2 - blue
    while(true){
        var prevChannel = (currChannel + 2) % 3;
        var count = 0;

        for(count = 0; count < 256; count++){
            refColor[currChannel] = count;
            colors.push(arrayToColor(refColor, sketch));
        }

        currChannel = (currChannel + 1) % 3;
        if(currChannel == 1){
            break;
        }
        // To remove last few colors from purple to red, I put the break first
        for(count = 254; count >= 0; count--){
            refColor[prevChannel] = count;
            colors.push(arrayToColor(refColor, sketch));
        }
    }
    return colors;
};

function arrayToColor(data, s){
    return s.color(data[0], data[1], data[2]);
}

function compareRainbowColors(a, b, gradient){
    a = gradient.indexOf(a);
    b = gradient.indexOf(b);
    if( a == b){
        return 0;
    } else if(a > b){
        return 1;
    } else{
        return -1;
    }
}
