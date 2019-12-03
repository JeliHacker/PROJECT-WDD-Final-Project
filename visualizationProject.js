var screen = {width: 1000, height: 625}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg");

var swish = document.getElementById("swish")
//svg.attr("width", width).attr("height", height)
var completeData = [];
 
var dataPromise = d3.csv("DATA.csv");

console.log("dataPromise", dataPromise)

d3.select(".container").on("click", 
        function()
        {
            svg.append("image").attr("href", "../nbaLogos/" + "BOS.svg").attr("width", "50px")
            swish.play()
        })

dataPromise.then
(
    function(data){
        console.log("data", data)
        setup(data);
    },
    
    function(err){
        console.log("broke", err)
    }
)

var setup = function(array2D)
{
    d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen.height)
        .append("g")
        .attr("id", "graph1")
        .attr("transform", "translate(" + margins.left + "," + margins.top+")");
    
    var width= screen.width - margins.left-margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                    .domain([0, 30])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                    .domain([0, 40])
                    .range([height, 0])
    var rectScale = d3.scaleLinear()
                    .domain([0, 40])
                    .range([0, height])
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("svg")
        .append("g")
        .classed("axis", true)
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate(" + margins.left + "," + (margins.top+height) + ")")
        .call(xAxis)
    
      d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(25," + margins.top + ")")
        .call(yAxis)
    
    var teams = d3.select("#graph1")
        .selectAll("g")
        .data(array2D)
        .enter()
    
    teams.append("image")
        .attr("href", function(team)
        {
        console.log("team", team);
        return "../nbaLogos/" + team.imageTitle + ".svg"
        })
        .attr("x", function(num, index)
        {
            return xScale(index)  - 15;
        })
        .attr("y", function(team)
        {
            return yScale(team.FacebookFans)
        })
        .attr("width", "40px")
        .on("mouseover", function(team, index){
        d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY + 28) + "px")
                    .text("Team: " + team.Team + " " + "Facebook Fans: " + team.FacebookFans)
                    .classed("hidden", false)
        })
        .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true)
        })
    
    //RECTANGLES FOR BAR CHART
//    teams.append("rect")
//        .attr("x", function(num, index)
//        {
//        return xScale(index);
//        })
//        .attr("width", "10px")
//        .attr("height", function(team){
//            return rectScale(team.FacebookFans)
//        })
//        .attr("y", function(team, index)
//        {
//        
//        })
    //RECTANGLES FOR BAR CHART
    
} //THIS CLOSES setup function!!!

var drawData = function(array2D, xScale, yScale, index)
{


}