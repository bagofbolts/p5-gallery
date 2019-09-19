jQuery(function(){
    // Play preview gif on hover
    $(".gif-img").each(function(){
        var img = $(this);
        var src = img.attr("src");
        var dir = src.substring(0, src.indexOf("still.jpg"));

        img.parent().hover(
            function(){
                img.attr("src", dir + "active.gif");
            },
            function(){
                img.attr("src", dir + "still.jpg");
            }
        )
    });
})
