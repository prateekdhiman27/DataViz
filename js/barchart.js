
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 90, left: 60},
        width = 700 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#barchart1")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    const secondsvg = d3.select("#factarea1").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    
    // Parse the Data
    d3.csv("https://prateekdhiman27.github.io/data/onlywinner.csv", function(data) {


  //--------------------------------------------------------------------------------
  //        Second Scene on this page - Details / Facts / Numbers
  //--------------------------------------------------------------------------------

  // Legend
secondsvg.append("circle").attr("cx",550).attr("cy",340).attr("r", 4).style("fill", "#00529B")  
secondsvg.append("circle").attr("cx",550).attr("cy",360).attr("r", 4).style("fill", "#007b22")
secondsvg.append("circle").attr("cx",550).attr("cy",380).attr("r", 4).style("fill", "#FDBB2F")
secondsvg.append("circle").attr("cx",550).attr("cy",400).attr("r", 4).style("fill", "#F47A1F")
secondsvg.append("circle").attr("cx",550).attr("cy",420).attr("r", 4).style("fill", "#20B2AA") 
secondsvg.append("circle").attr("cx",550).attr("cy",440).attr("r", 4).style("fill", "#8BA1AD")
secondsvg.append("text").attr("x", 560).attr("y", 340).text("Djokovic N").style("font-size", "10px").attr("alignment-baseline","middle")
secondsvg.append("text").attr("x", 560).attr("y", 360).text("Federer R").style("font-size", "10px").attr("alignment-baseline","middle")
secondsvg.append("text").attr("x", 560).attr("y", 380).text("Murray A").style("font-size", "10px").attr("alignment-baseline","middle")
secondsvg.append("text").attr("x", 560).attr("y", 400).text("Nadal R").style("font-size", "10px").attr("alignment-baseline","middle")
secondsvg.append("text").attr("x", 560).attr("y", 420).text("Hewitt L").style("font-size", "10px").attr("alignment-baseline","middle")
secondsvg.append("text").attr("x", 560).attr("y", 440).text("Ivanisevic G").style("font-size", "10px").attr("alignment-baseline","middle")


  const xBLabel = secondsvg.append("text")
  .attr("y", height+60)
  .attr("x", width / 2)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Year")
  
  const yBLabel = secondsvg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 20)
  .attr("x", -((height/2)))
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Title Count")

// var yearwinner = data.filter(function(d) {return (d.Year==2017 && d.Winner =='Federer R.') } )
  
// for (var i = 0; i < yearwinner.length; i++) {
//   console.log("-----------for loop winner----------"+yearwinner[i].Winner)
//   SetLabel1.text("Roger Federer won: " +yearwinner[i].TitleCount )
// }

// var yearwinner2 = data.filter(function(d) {return (d.Year==2022 && d.Winner =='Djokovic N.') } )
  
// for (var i = 0; i < yearwinner.length; i++) {
//   console.log("-----------for loop winner----------"+yearwinner2[i].Winner)
//   SetLabel2.text("Novak Djokovic won: " +yearwinner2[i].TitleCount)
// }

//-----------------------------------------------------------
// -----------------------Second Scene Bubble Chart ---------------------
//-----------------------------------------------------------

var xBScale = d3.scaleLinear()
.domain([2000, 2022])
.range([ 40, width ]);
secondsvg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xBScale).tickFormat(d3.format("d")).ticks(20))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Add Y axis
var yBscale = d3.scaleLinear()
.domain([0, 10])
.range([ height, 10]);
secondsvg.append("g")
.attr("transform", "translate(40," + 0 + ")")
.call(d3.axisLeft(yBscale));

// Add a scale for bubble size
var zBscale = d3.scaleLinear()
.domain([0, 10])
.range([ 4, 40]);

// Add a scale for bubble color
var myColor = d3.scaleOrdinal()
.domain(["Djokovic N.", "Federer R.", "Murray A.", "Nadal R.", "Hewitt L." , "Ivanisevic G."])
.range(['#00529B','#007b22','#FDBB2F', '#F47A1F','#20B2AA', '#8BA1AD']);


  // -1- Create a tooltip div that is hidden by default:
  var tooltip2 = d3.select("#factarea1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltip2 = function(d) {
  tooltip2
    .transition()
    .duration(200)
  tooltip2
    .style("opacity", 1)
    .html("Winner: " + d.Winner  + "<br> Year: " +d.Year  + "<br> Titles: " +d.TitleCount  )
    .style("left", (d3.event.pageX ) + "px")
    .style("top", (d3.event.pageY ) + "px")

    // .style("left", (d3.mouse(this)[0]+30) + "px")
    // .style("top", (d3.mouse(this)[1]+30) + "px")
}
var moveTooltip2 = function(d) {
  tooltip2
  .style("left", (d3.event.pageX ) + "px")
  .style("top", (d3.event.pageY ) + "px")
    // .style("left", (d3.mouse(this)[0]+30) + "px")
    // .style("top", (d3.mouse(this)[1]+30) + "px")
}
var hideTooltip2 = function(d) {
  tooltip2
    .transition()
    .duration(200)
    .style("opacity", 0)
}

// Add dots
secondsvg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
  .attr("class", "bubbles")
  .attr("cx", function (d) { return xBScale(d.Year); } )
  .attr("cy", function (d) { return yBscale(d.TitleCount); } )
  .attr("r", function (d) { return zBscale(d.TitleCount); } )
  .style("fill", function (d) { return myColor(d.Winner); } )
// -3- Trigger the functions
.on("mouseover", showTooltip2 )
.on("mousemove", moveTooltip2 )
.on("mouseleave", hideTooltip2 )

var federerfilter = data.filter(function(d) {return (d.Winner =='Federer R.') } )
secondsvg.append("path")
.datum(federerfilter)
.attr("fill", "none")
.attr("stroke", "#007b22")
.attr("stroke-width", 1.5)
.attr("d", d3.line()
  .curve(d3.curveBasis) // Just add that to have a curve instead of segments
  .x(function(d) { return xBScale(d.Year) })
  .y(function(d) { return yBscale(d.TitleCount) })
  )

  var djokovicfilter = data.filter(function(d) {return (d.Winner =='Djokovic N.') } )
secondsvg.append("path")
.datum(djokovicfilter)
.attr("fill", "none")
.attr("stroke", "#00529B")
.attr("stroke-width", 1.5)
.attr("d", d3.line()
  .curve(d3.curveBasis) // Just add that to have a curve instead of segments
  .x(function(d) { return xBScale(d.Year) })
  .y(function(d) { return yBscale(d.TitleCount) })
  )

  var nadafilter = data.filter(function(d) {return (d.Winner =='Nadal R.') } )
  secondsvg.append("path")
  .datum(nadafilter)
  .attr("fill", "none")
  .attr("stroke", "#F47A1F")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .curve(d3.curveBasis) // Just add that to have a curve instead of segments
    .x(function(d) { return xBScale(d.Year) })
    .y(function(d) { return yBscale(d.TitleCount) })
    )

    var murrayfilter = data.filter(function(d) {return (d.Winner =='Murray A.') } )
    secondsvg.append("path")
    .datum(murrayfilter)
    .attr("fill", "none")
    .attr("stroke", "#FDBB2F")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .curve(d3.curveBasis) // Just add that to have a curve instead of segments
      .x(function(d) { return xBScale(d.Year) })
      .y(function(d) { return yBscale(d.TitleCount) })
      )


  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#barchart1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

    var mouseover = function(d) {
      tooltip
          .html("Opponent Name: " + d.Loser + "<br>  Opponent Rank: " + d.LRank + "<br> Round: " +d.Round )
          .style("opacity", 1)
    }
    var mousemove = function(d) {
      tooltip
      .style("left", (d3.event.pageX ) + "px")
      .style("top", (d3.event.pageY ) + "px")
        // .style("left", (d3.mouse(this)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        // .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
    }

    //----------------------------------------------------------------
    //       Labels
    //----------------------------------------------------------------

    const xLabel = svg.append("text")
.attr("y", height+60)
.attr("x", width / 2)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Wimbeldon Champions")

const yLabel = svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -40)
.attr("x", -((height/2)))
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Wimbledon Titles")

    //----------------------------------------------------------------
    //       Annotations
    //----------------------------------------------------------------

    const annotations = [
      {
        //below in makeAnnotations has type set to d3.annotationLabel
        //you can add this type value below to override that default
        type: d3.annotationCalloutCircle,
        note: {
          label: "Roger Federer has won 20 Grand Slam titles from 2003 to 2018 including an all-time record of 8 Wimbledon Titles.",
          title: "Most Wimbeldon Titles",
          wrap: 250
        },
        //settings for the subject, in this case the circle radius
        subject: {
          radius: 50
        },
        x: 218,
        y: 100,
        dy: 10,
        dx: 50
      },
      {
        //below in makeAnnotations has type set to d3.annotationLabel
        //you can add this type value below to override that default
        type: d3.annotationCalloutCircle,
        note: { 
          label: "He achieved this in 2001 while ranked world No. 125, after being runner-up at Wimbledon in 1992, 1994 and 1998.",
          title: "The Wildcard Wimbledon Champ",
          wrap: 250
        },
        //settings for the subject, in this case the circle radius
        subject: {
          radius: 50
        },
        x: 610,
        y: 400,
        dy: -60,
        dx: -50
      }
    ].map(function(d){ d.color = "#ffab00"; return d})

    const makeAnnotations = d3.annotation()
    .type(d3.annotationLabel)
    .annotations(annotations)

    d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)

    const annotations2 = [
      {
        note: {
          label: "After Winning back to back titles from 2018- 2022 Title , Novak Djokovic is just one title behind with total of 7 Titles.",
          title: "Novak catching up to Roger",
          wrap: 160,
          align: "middle"
        },
        connector: {
          end: "dot" // 'dot' also available
        },
        x: 610,
        y: 140,
        dy: -30,
        dx: 0
      },
      {
        note: {
          label: "Roger Federer plans to return in 2023. Can he extend his title count?",
          title: "Last Championship ",
          wrap: 200,
          align: "right"
        },
        connector: {
          end: "dot" // 'dot' also available
        },
        x: 480,
        y: 100,
        dy: -40,
        dx: -100
      },
      {
        note: {
          label: "Roger Federer plans to return in 2023. Can he extend his title count?",
          title: "2003-2007 Dominance ",
          wrap: 150,
          align: "left"
        },
        connector: {
          end: "dot" // 'dot' also available
        },
        x: 220,
        y: 230,
        dy: 40,
        dx: 50
      }
    ].map(function(d){ d.color = "#ffab00"; return d})

    const makeAnnotations2 = d3.annotation()
    .type(d3.annotationLabel)
    .annotations(annotations2)

    secondsvg
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations2)

    //----------------------------------------------------------------
    //       Annotations
    //----------------------------------------------------------------



    // X axis
    var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Winner; }))
  .padding(0.2);
    
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 10])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.Winner); })
        .attr("width", x.bandwidth)
        .attr("fill", function (d) { return myColor(d.Winner); } )
        // no bar at the beginning thus:
        .attr("height", function(d) { return height - y(0); }) // always equal to 0
        .attr("y", function(d) { return y(0); })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    
    // Animation
    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function(d) { return y(d.TitleCount); })
      .attr("height", function(d) { return height - y(d.TitleCount); })
      .delay(function(d,i){console.log(i) ; return(i*100)})
    
    })
    