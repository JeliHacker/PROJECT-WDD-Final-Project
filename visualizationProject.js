var screen = {width: 1000, height: 625}
var margins = {top: 10, right: 50, bottom: 50, left:50}

var svg = d3.select("svg");

var toggleWinCount = 1;
var toggleCursor = 1;

var swish = document.getElementById("swish");

var click = document.getElementById("click");

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
    
    
    
    d3.select(".facebookFans").on("click", 
        function()
        {
            //console.log("this", this)
            d3.select(".twitterFans")
                .attr("style", "color:black")
        
            d3.select(".value")
                .attr("style", "color:black")
        
            d3.select(".attendance")
                .attr("style", "color:black")
        
            d3.select(this)
                .attr("style", "color: white")
        
            //svg.append("image").attr("href", "../nbaLogos/" + "BOS.svg").attr("width", "50px")
            swish.play()
        
            clearInfo("#graph1") 
        
            drawOldData(array2D, xScale, yScale, rectScale, "twitterFans")
        
            drawData(array2D, xScale, yScale, rectScale, "FacebookFans")
        })
    d3.select(".twitterFans").on("click", 
        function()
        {
            //svg.append("image").attr("href", "../nbaLogos/" + "BOS.svg").attr("width", "50px")
            d3.select(".value")
                .attr("style", "color:black")
        
            d3.select(".FacebookFans")
                .attr("style", "color:black")
        
            d3.select(".attendance")
                .attr("style", "color:black")
        
            d3.select(this)
                .attr("style", "color: white")
        
        
            swish.play()
        
            clearInfo("#graph1") 
            
            drawOldData(array2D, xScale, yScale, rectScale, "FacebookFans")
        
            drawData(array2D, xScale, yScale, rectScale, "twitterFans")
        })
    d3.select(".value").on("click",
        function()
        {
            d3.select(".twitterFans")
                .attr("style", "color:black")
        
            d3.select(".FacebookFans")
                .attr("style", "color:black")
        
            d3.select(".attendance")
                .attr("style", "color:black")
        
            d3.select(this)
                .attr("style", "color: white")
        
        
            swish.play()
        
            clearInfo("#graph1") 
        
            drawOldData(array2D, xScale, yScale, rectScale, "FacebookFans")
        
            drawData(array2D, xScale, yScale, rectScale, "value")                
        })
    d3.select(".attendance").on("click",
        function()
        {
            d3.select(".twitterFans")
                .attr("style", "color:black")
        
            d3.select(".FacebookFans")
                .attr("style", "color:black")
        
            d3.select(".value")
                .attr("style", "color:black")
        
            d3.select(this)
                .attr("style", "color: white")
        
        
            swish.play()
        
            clearInfo("#graph1")
            
            drawOldData(array2D, xScale, yScale, rectScale, "FacebookFans")
        
            drawData(array2D, xScale, yScale, rectScale, "attendance")         
        })
    
    
    
    
    
    
    
    
    
    //TOGGLE WIN COUNT
    if(toggleWinCount == 0)
                {
                    d3.select(".right .winCount")
                        .text("Show Win Count")
                }
            else
                {
                    d3.select(".right .winCount")
                        .text("Hide Win Count")
                    drawWins(array2D, xScale, yScale, rectScale, 0)
                }
    
    
    d3.select(".right .winCount")
        .on("click", function()
        {
            click.play()
        
        
            if(toggleWinCount == 0)
                {
                    toggleWinCount = 1;
                    d3.select(".right .winCount")
                        .text("Hide Win Count")
                    
                    drawWins(array2D, xScale, yScale, rectScale, 0)
                }
            else
                {
                    toggleWinCount = 0;
                    d3.select(".right .winCount")
                        .text("Show Win Count")
                    
                    removeWins();
                    
                }
                
        })
    //END OF TOGGLE WIN COUNT
    //TOGGLE CURSOR
    if(toggleCursor == 0)
                {
                    d3.select(".right .toggleCursor")
                        .text("Turn on Custom Cursor")
                    
                    d3.select("body")
                        .attr("style", "cursor: auto")
                }
            else
                {
                    d3.select(".right .toggleCursor")
                        .text("Turn off Custom Cursor")
                    
                }
    
    
    d3.select(".right .toggleCursor")
        .on("click", function()
        {
            click.play()
        
        
            if(toggleCursor == 0)
                {
                    toggleCursor = 1;
                    d3.select(".right .toggleCursor")
                        .text("Turn off Custom Cursor")
                    
                    d3.select("body")
                        .attr("style", "cursor:" +  "url('Basketball.cur'), auto;")
                }
            else
                {
                    toggleCursor = 0;
                    d3.select(".right .toggleCursor")
                        .text("Turn on Custom Cursor")
                    
                    d3.select("body")
                        .attr("style", "cursor: auto;")
                }
                
        })
    //END OF TOGGLE CURSOR
    
    drawOldData(array2D, xScale, yScale, rectScale, "value")
    drawData(array2D, xScale, yScale, rectScale, "value")
    
    
} //THIS CLOSES setup function!!!


var drawWins = function(array2D, xScale, circleYScale, rectScale, data)
{
    var wins = d3.select("#winGraph")
    
    console.log("array2D", array2D)
    var wins1 = wins.selectAll("g")
        .data(array2D)
        .enter()
    
    
    
    wins1.append("circle")
    .on("mouseover", function(team, index){ 
        //console.log("event", event)
        d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY + 18) + "px")
                    .text("Team: " + team.Team + " " + "Facebook Fans: " + team.FacebookFans + " " + "Wins: " + team.wins)
                    .classed("hidden", false)
        
        d3.selectAll(".left *")
            .remove()
        
        d3.select(".left")
            .append("h2")
            .text(function(d)
            {
                return team.Team;
            })
            .append("h3")
            .text(function(d)
            {
                return "Team Value: " + team.value;
            })
            .append("h4")
            .text(function(d)
            {
                return "Facebook Fans: " + team.FacebookFans + "million";
            })
        .append("h4")
            .text(function(d)
            {
                return "Twitter Fans: " + team.twitterFans + "million"; 
            })
        .append("h4")
            .text(function(d)
            {
                return "Wins last season: " + team.wins; 
            })
        .append("h4")
            .text(function(d)
            {
                return "Home Game Attendance: " + team.attendance;
        })
        d3.select(this)
            .attr("r", "15px")
            .attr("fill", "orange")
        })
    
    
    
    
    
    
    
        .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true)
        
        d3.select(this)
            .attr("width", "40px")
            .attr("r", "10px")
            .attr("fill", "green")
        
        
        })
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
    
    var width= screen.width - margins.left-margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                    .domain([0, 30])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                    .domain([0, 40])
                    .range([height, 0])
    
    var yScaleValue = d3.scaleLinear()
                    .domain([0, 5000])
                    .range([height, 0])
    
    var yScaleAttendance = d3.scaleLinear()
                        .domain([0, 25000])
                        .range([height, 0])
    
     var rectScaleValue = d3.scaleLinear()
                    .domain([0, 5000])
                    .range([0, height])
     
     var rectScaleAttendance = d3.scaleLinear()
                        .domain([0, 25000])
                        .range([0, height])
    
    var yAxisValue = d3.axisLeft(yScaleValue)
    
    var yAxis = d3.axisLeft(yScale)
    
    var yAxisAttendance = d3.axisLeft(yScaleAttendance)
    
        if(data == "value")
        {
            console.log("data", data)
            
        d3.selectAll("#yAxis *")
                .remove()
          
        d3.select("#yAxis")
            .attr("transform", "translate(45," + margins.top + ")")
            .call(yAxisValue)
            
        }else if(data == "attendance")
        {
            d3.selectAll("#yAxis *")
                .remove()
            
            d3.select("#yAxis")
            .attr("transform", "translate(45," + margins.top + ")")
            .call(yAxisAttendance)
        }else if(data == "FacebookFans" || data == "twitterFans")
        {
            d3.selectAll("#yAxis *")
                .remove()
            
            d3.select("#yAxis")
            .attr("transform", "translate(45," + margins.top + ")")
            .call(yAxis)
        }
    
    
        teams.selectAll("image")
        .data(array2D)
        .transition()
        .duration(1000)
        .attr("href", function(team)
        {
        //console.log("team value", team.value);
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
            else if(data == "value")
            {
                return yScaleValue(parseInt(team.value)) - 35
            }
            else if(data == "attendance")
            {
                return yScaleAttendance(parseInt(team.attendance)) -35
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
                    //console.log("team.value", parseInt(team.value))
                    return rectScaleValue(parseInt(team.value))
            }
            else if(data == "attendance")
            {
                return rectScaleAttendance(parseInt(team.attendance))
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
                    return yScaleValue(parseInt(team.value))
            }
            else if(data == "attendance")
            {
                    return yScaleAttendance(team.attendance)
            }
            
            })
}//closes drawData







var drawOldData = function(array2D, xScale, yScale, rectScale, data)
{
    var width= screen.width - margins.left-margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var yScaleValue = d3.scaleLinear()
                    .domain([0, 5000])
                    .range([height, 0])
     
    
     var rectScaleValue = d3.scaleLinear()
                    .domain([0, 5000])
                    .range([0, height])
     
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
            if(data == "FacebookFans")
            {
                    return yScale(team.FacebookFans) -35
            }
            else if(data == "twitterFans")
            {
                    return yScale(team.twitterFans) -35
            }
            else if(data == "value")
            {
                    return yScaleValue(parseInt(team.value)) - 35
            }
            else if(data == "attendance")
            {
                    return yScale(parseInt(team.attendance)) - 35
            }
        
        })
        .attr("width", "40px")
        .on("click", function(e)
        {
            e.preventDefault
            window.location.href="https://www.nba.com/"
        })
    
    
                //TOOLTIP AND INFO DIV
        .on("mouseover", function(team, index){ 
        //console.log("event", event)
        d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY + 18) + "px")
                    .text("Team: " + team.Team + " " + "Facebook Fans: " + team.FacebookFans + " " + "Wins: " + team.wins)
                    .classed("hidden", false)
        
        d3.selectAll(".left *")
            .remove()
        
        d3.select(".left")
            .append("h2")
            .text(function(d)
            {
                return team.Team;
            })
            .append("h3")
            .text(function(d)
            {
                return "Team Value: " + team.value;
            })
            .append("h4")
            .text(function(d)
            {
                return "Facebook Fans: " + team.FacebookFans + "million";
            })
        .append("h4")
            .text(function(d)
            {
                return "Twitter Fans: " + team.twitterFans + "million"; 
            })
        .append("h4")
            .text(function(d)
            {
                return "Wins last season: " + team.wins; 
            })
        .append("h4")
            .text(function(d)
            {
                return "Home Game Attendance: " + team.attendance;
        })
        d3.select(this)
            .attr("width", "60px")
        })
    
        .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true)
        
        d3.select(this)
            .attr("width", "40px")
        
        
        }) //TOOLTIPS AND INFO DIVS
    
    
    
    
    
    
    
   // RECTANGLES FOR BAR CHART
    teams.append("rect")
    .on("mouseover", function(team, index){ 
        //console.log("event", event)
        d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY + 18) + "px")
                    .text("Team: " + team.Team + " " + "Facebook Fans: " + team.FacebookFans + " " + "Wins: " + team.wins)
                    .classed("hidden", false)
        
        d3.selectAll(".left *")
            .remove()
        
        d3.select(".left")
            .append("h2")
            .text(function(d)
            {
                return team.Team;
            })
            .append("h3")
            .text(function(d)
            {
                return "Team Value: " + team.value;
            })
            .append("h4")
            .text(function(d)
            {
                return "Facebook Fans: " + team.FacebookFans + "million";
            })
        .append("h4")
            .text(function(d)
            {
                return "Twitter Fans: " + team.twitterFans + "million"; 
            })
        .append("h4")
            .text(function(d)
            {
                return "Wins last season: " + team.wins; 
            })
        .append("h4")
            .text(function(d)
            {
                return "Home Game Attendance: " + team.attendance;
        })
        })
    
        .on("mouseout",function(){
        d3.select("#tooltip").classed("hidden",true) 
        
        })
        .attr("x", function(num, index)
        {
        return xScale(index) - 5;
        })
        .attr("width", "10px")
        .attr("height", function(team){
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
                    //console.log("team.value", parseInt(team.value))
                    return rectScaleValue(parseInt(team.value))
            }
        })
        .attr("y", function(team, index)
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
                    return yScaleValue(parseInt(team.value))
            } 
        })
    //RECTANGLES FOR BAR CHART 
    
} //closes drawOldData
