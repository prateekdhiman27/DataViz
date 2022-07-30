
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 90, left: 60},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#barchart1")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.csv("https://prateekdhiman27.github.io/data/onlywinner.csv", function(data) {


  //--------------------------------------------------------------------------------
  //        Second Scene on this page - Details / Facts / Numbers
  //--------------------------------------------------------------------------------

  const secondsvg = d3.select("#factarea1").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

const SetLabel1 = secondsvg.append("text")
	.attr("y", height - 350)
	.attr("x", width - 100)
	.attr("font-size", "40px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "end")
  //.text("Help")

  const SetLabel2 = secondsvg.append("text")
	.attr("y", height - 300)
	.attr("x", width - 80)
	.attr("font-size", "40px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "end")
  //.text("hellp 2")

var yearwinner = data.filter(function(d) {return (d.Year==2017 && d.Winner =='Federer R.') } )
  
for (var i = 0; i < yearwinner.length; i++) {
  console.log("-----------for loop winner----------"+yearwinner[i].Winner)
  SetLabel1.text("Roger Federer won: " +yearwinner[i].TitleCount )
}

var yearwinner2 = data.filter(function(d) {return (d.Year==2022 && d.Winner =='Djokovic N.') } )
  
for (var i = 0; i < yearwinner.length; i++) {
  console.log("-----------for loop winner----------"+yearwinner2[i].Winner)
  SetLabel2.text("Novak Djokovic won: " +yearwinner2[i].TitleCount)
}

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
        .style("left", (d3.mouse(this)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (d3.mouse(this)[1]) + "px")
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
        x: 190,
        y: 80,
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
        x: 525,
        y: 380,
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
          label: "With his latest Wimbledon Title in 2022 , Novak Djokovic is Catching up to Roger's 8th Title. Roger Federer will make a comeback next year after a knee Injury to defend his World Record",
          title: "Novak catching up to Roger",
          wrap: 250,
          align: "middle"
        },
        connector: {
          end: "dot" // 'dot' also available
        },
        x: 200,
        y: 100,
        dy: 60,
        dx: 0
      },
      {
        note: {
          label: "Hover over the bars from top down or botton up to see Tooltip and details who who all did the champions defeat",
          title: "Tool Tip Guide",
          wrap: 250,
          align: "left"
        },
        connector: {
          end: "arrow" // 'dot' also available
        },
        x: 20,
        y: 350,
        dy: 0,
        dx: 60
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
        .attr("fill", "#007b22")
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
    