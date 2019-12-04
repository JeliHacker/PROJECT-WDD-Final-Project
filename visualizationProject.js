var screen = {width: 1000, height: 625}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg");

var toggleWinCount = 0;

var swish = document.getElementById("swish")
//svg.attr("width", width).attr("height", height)
var completeData = [];
 
var dataPromise = d3.csv("DATA.csv");

console.log("dataPromise", dataPromise)


var clearInfo = function(clear)
{
    d3.selectAll(clear + " *")
        .remove()
}

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
    
    svg.append("g")
        .attr("id", "winGraph")
        .attr("width", screen.width)
        .attr("height", screen.height)
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
    
    var circleYScale = d3.scaleLinear()
                            .domain([0, 82])
                            .range([height, 0])
            //
            //AXES
            //
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
    
            //
            //AXES
            //
    
    drawOldData(array2D, xScale, yScale, rectScale, 0)
    
    d3.select(".facebookFans").on("click", 
        function()
        {
            //svg.append("image").attr("href", "../nbaLogos/" + "BOS.svg").attr("width", "50px")
            swish.play()
        
            clearInfo("#graph1") 
        
            drawOldData(array2D, xScale, yScale, rectScale, 0)
        
            drawData(array2D, xScale, yScale, rectScale, "FacebookFans")
        })
    d3.select(".twitterFans").on("click", 
        function()
        {
            //svg.append("image").attr("href", "../nbaLogos/" + "BOS.svg").attr("width", "50px")
        
            swish.play()
        
            clearInfo("#graph1") 
        
            drawOldData(array2D, xScale, yScale, rectScale, 0)
        
            drawData(array2D, xScale, yScale, rectScale, "twitterFans")
        })
    d3.select(".value").on("click",
        function()
        {
            swish.play()
        
            clearInfo("#graph1") 
        
            drawOldData(array2D, xScale, yScale, rectScale, 0)
        
            drawData(array2D, xScale, yScale, rectScale, "value")                
        })
    
    d3.select(".winCount")
        .on("click", function()
        {
            if(toggleWinCount == 0)
                {
                    toggleWinCount = 1;
                    d3.select(".winCount")
                        .text("Hide Win Count")
                    
                    drawWins(array2D, xScale, yScale, rectScale, 0)
                }
            else
                {
                    toggleWinCount = 0;
                    d3.select(".winCount")
                        .text("Show Win Count")
                    
                    removeWins();
                    
                }
                
        })
    drawData(array2D, xScale, yScale, rectScale, "FacebookFans")
    
    
} //THIS CLOSES setup function!!!


var drawWins = function(array2D, xScale, circleYScale, rectScale, data)
{
    var wins = d3.select("#winGraph")
    
    console.log("array2D", array2D)
    var wins1 = wins.selectAll("g")
        .data(array2D)
        .enter()
    
    wins1.append("circle")
        .attr("id", "winGraph")
        .attr("cx", function(team, index)
        {
            return xScale(index);
        })
        .attr("cy", function(team, index)
        {
            console.log("team.wins", team.wins)
            return  circleYScale(team.wins/2)
        })
        .attr("r", 10)
        .attr("fill", "green")
        .attr("fill-opacity", "0.4")
} //closes drawWins


var removeWins = function()
{
    d3.selectAll("#winGraph *")
        .remove()
}





var drawData = function(array2D, xScale, yScale, rectScale, data)
{
    var teams = d3.select("#graph1")
    
        teams.selectAll("image")
        .data(array2D)
        .transition()
        .duration(1000)
        .attr("href", function(team)
        {
        console.log("team value", team.value);
        return "../nbaLogos/" + team.imageTitle + ".svg"
        })
        .attr("x", function(num, index)
        {
            return xScale(index)  - 20;
        })
        .attr("y", function(team)
        {
            
            //console.log("twitterfans", team.twitterFans)
            if(data == "FacebookFans")
            {
                    return yScale(team.FacebookFans) - 35
            }
            else if(data == "twitterFans")
            {
                    return yScale(team.twitterFans) - 35
            }
            else if(data == "twitterFans")
            {
                return yScale(team.value) - 35
            }
        })
        .attr("width", "40px")
    
    
        teams.selectAll("rect")
        .data(array2D)
        .transition()
        .duration(1000)
        .attr("x", function(num, index)
        {
            return xScale(index)  - 5;
        })
        .attr("height", function(team)
        {
            //console.log("twitterfans", team.twitterFans)
            if(data == "FacebookFans")
            {
            return rectScale(team.FacebookFans)
            }
            else if(data == "twitterFans")
            {
                    return rectScale(team.twitterFans)
            }
            else if(data == "value")
            {
                    return rectScale(team.value)
            }
        })
        .attr("y", function(team)
            {
            if(data == "FacebookFans")
            {
                    return yScale(team.FacebookFans) 
            }
            else if(data == "twitterFans")
            {
                    return yScale(team.twitterFans)
            }
            else if(data == "value")
            {
                    return yScale(team.value)
            }
            })
}//closes drawData



var drawOldData = function(array2D, xScale, yScale, rectScale, index)
{
    var teams = d3.select("#graph1")
        .selectAll("g")
        .data(array2D)
        .enter()
     
    teams.append("image")
        .attr("href", function(team)
        {
        //console.log("team", team);
        return "../nbaLogos/" + team.imageTitle + ".svg"
        })
        .attr("x", function(num, index)
        {
            return xScale(index) - 20;
        })
        .attr("y", function(team)
        {
            return -10 //ACCOUNT FOR NEAT INTRO ANIMATION
        })
        .attr("width", "40px")
        .on("click", function(e)
        {
            e.preventDefault
            window.location.href="https://www.nba.com/"
        })
        .on("mouseover", function(team, index){
        //console.log("event", event)
        d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY + 18) + "px")
                    .text("Team: " + team.Team + " " + "Facebook Fans: " + team.FacebookFans + " " + "Wins: " + team.wins)
                    .classed("hidden", false)
        
        d3.select(this)
            .attr("width", "60px")
        })
        .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true)
        d3.select(this)
            .attr("width", "40px")
        })
    
   // RECTANGLES FOR BAR CHART
    teams.append("rect")
        .attr("x", function(num, index)
        {
        return xScale(index) - 5;
        })
        .attr("width", "10px")
        .attr("height", function(team){
            return rectScale(team.FacebookFans) 
        })
        .attr("y", function(team, index)
        {
            return yScale(team.FacebookFans) 
        })
    //RECTANGLES FOR BAR CHART 
} //closes drawOldData
