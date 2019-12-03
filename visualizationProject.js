var screen = {width: 1000, height: 625}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg");

//svg.attr("width", width).attr("height", height)
var completeData = [];
 
d3.select(".container").on("click", 
        function()
        {
            svg.append("image").attr("href", "../nbaLogos/" + "BOS.svg").attr("width", "50px")
        })

