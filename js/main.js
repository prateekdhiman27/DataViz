/*
*********** main.js ***********
*********** D3 JS for CS 416 Data Visulation Final Project ***********
*********** Wimbledon Path to Finals Script ***********
*/

// Global Variables

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%d/%m/%y");

var startDate = new Date("2001-06-25"),
    endDate = new Date("2022-12-27");
var slideryear = 2001; // to be updated based on data.

clearAll = []

var margin = {top:50, right:50, bottom:0, left:50},
    width = 700 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom; //500


const slidersvg = d3.select("#slider-area").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", 80)

const svg = d3.select("#chart-area").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)


// Slider Variables

var moving = false;
var currentValue = 0;
var targetValue = width;    
var playButton = d3.select("#play-button");
var getPlayer = "";


var startyear = 2001
var endyear = 2022
// Slider Scale

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = slidersvg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + (margin.left)+ "," + (margin.top-10) + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue)); 
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) {return formatDateIntoYear(d); });
   // .text((d3.format("d")));

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")  
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    //.text(d3.timeYear)
    //.text((d3.format("d")))
    .attr("transform", "translate(0," + (-25) + ")")
    

// ------------------------------- line graph -------------------------------------

var linechart = svg.append("g")
.attr("class", "line-chart")
.attr("transform", "translate(" + (margin.left+50)+ "," + (height-500) + ")");


var line = linechart
.append('g')
.append("path")

// const legend = linechart.append("g")
// .attr("transform", `translate(${width - 10}, ${height - 125})`)

// Labels
const xLabel = linechart.append("text")
	.attr("y", height+ 40)
	.attr("x", width / 2)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Wimbledon Stages")
const yLabel = linechart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -60)
	.attr("x", -(height/2))
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Opponent Seed")

const ySubLabel1 = linechart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -30)
	.attr("x", -((height/2)-150))
	.attr("font-size", "12px")
	.attr("text-anchor", "middle")
  .attr("fill", "red")
  .attr("opacity", "0.4")
	.text("Higher Seeded Matches")

const ySubLabel2 = linechart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -30)
	.attr("x", -((height/2)+110))
	.attr("font-size", "12px")
	.attr("text-anchor", "start")
  .attr("fill", "gold")
  .attr("opacity", "0.7")
	.text("Middle Seeded Matches")

const ySubLabel3 = linechart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -30)
	.attr("x", -((height/2)+120))
	.attr("font-size", "12px")
	.attr("text-anchor", "end")
  .attr("fill", "green")
  .attr("opacity", "0.4")
	.text("Lower Seeded Matches")


const playerLabel = linechart.append("text")
	.attr("y", height - 450)
	.attr("x", width/2)
  .style('fill', '#007b22')
	.attr("font-size", "30px")
	.attr("opacity", "1")
	.attr("text-anchor", "middle")

const ranklabel = linechart.append("text")
	.attr("y", height - 480)
	.attr("x", width - 650)
	.attr("font-size", "30px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "middle")

const area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.PI])
	.domain([2000, 1400000000])


var xScale = d3.scaleLinear()
.range([ 0, (width-50)]);

var xScaleGroup =  linechart.append("g")
.attr("class", "x axis")
.attr("transform" , `translate(0, ${height})`)

const yScale = d3.scaleLog()
.range([(height), 10])
.base(10)

const yScaleGroup = linechart.append("g")
  .attr("class", "y axis")

  // Tooltip
var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)


var globallinepath
var myColor = d3.scaleOrdinal()
.domain(["Djokovic N.", "Federer R.", "Murray A.", "Nadal R.", "Hewitt L." , "Ivanisevic G."])
.range(['#00529B','#007b22','#FDBB2F', '#F47A1F','#20B2AA', '#8BA1AD']);

//var myColor = d3.scaleOrdinal(d3.schemePastel1) // A color scale: one color for each group

// ---------------------- trying to provide area behind the line chart
var points = []
var points = [
  { xpoint: 0, ypoint: 280 },
  { xpoint: 750, ypoint: 280 }
];

var points2 = []
var points2 = [
  { xpoint: 0, ypoint: 420 },
  { xpoint: 750, ypoint: 420 }
];

var points3 = []
var points3 = [
  { xpoint: 0, ypoint: 500 },
  { xpoint: 750, ypoint: 500 }
];

var Gen = d3.area()
  .x((p) => p.xpoint)
  .y0((p) => 0)
  .y1((p) => p.ypoint);

  var Gen2 = d3.area()
  .x((p) => p.xpoint)
  .y0((p) => 280)
  .y1((p) => p.ypoint);

  var Gen3 = d3.area()
  .x((p) => p.xpoint)
  .y0((p) => 420)
  .y1((p) => p.ypoint);

  linechart
    .append("path")
    .attr("d", Gen(points))
    .attr("fill", "red")
    .attr("opacity" , 0.1)
    .attr("stroke", "black");

    linechart
    .append("path")
    .attr("d", Gen2(points2))
    .attr("fill", "gold")
    .attr("opacity" , 0.1)
    .attr("stroke", "black");

    linechart
    .append("path")
    .attr("d", Gen3(points3))
    .attr("fill", "green")
    .attr("opacity" , 0.1)
    .attr("stroke", "black");

//-----------------------------------bar char-----------------------------------------------
//-----------------------------------bar char-----------------------------------------------
//-----------------------------------bar char-----------------------------------------------
//-----------------------------------bar char-----------------------------------------------
//-----------------------------------bar char-----------------------------------------------

const barsvg = d3.select("#chart-bar").append("svg") 
.attr("width", width + margin.left + margin.right)
.attr("height", (height + margin.top + margin.bottom))


var barchart = barsvg.append("g")
    .attr("class", "bar")
    .attr("transform", "translate(" + (margin.left+50)+ "," + ((height-500)) + ")");

var xbarScale = d3.scaleBand()
.range([ 0, (width-50)]);

var xbarScaleGroup =  barchart.append("g")
.attr("class", "x axis")
.attr("transform" , `translate(0, ${height})`)

const ybarScale = d3.scaleLinear()
.range([(height), 10])
//.base(10)

const ybarScaleGroup = barchart.append("g")
  .attr("class", "y axis")

    // Labels
const xbarLabel = barchart.append("text")
.attr("y", height+50)
.attr("x", width / 2)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Set Details")
const ybarLabel = barchart.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -40)
.attr("x", -((height/2)-80))
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Games Won")

const playerLabel2 = barchart.append("text")
.attr("y", height - 450)
.attr("x", width / 2)
.style('fill', '#007b22')
.attr("font-size", "30px")
.attr("text-anchor", "middle")
.attr("opacity", "1")


const ranklabel2 = barchart.append("text")
	.attr("y", height - 390)
	.attr("x", width/2)
  .style('fill', '#007b22')
	.attr("font-size", "30px")
	.attr("opacity", "1s")
	.attr("text-anchor", "middle")

// ------------------------------ Annotations ------------------------------------

const annotations = [
  {
    note: {
      label: "Due to Covid-19",
      title: "No Wimbledon Tournament",
      wrap: 300,
      align: "middle"
    },
    connector: {
      end: "dot" // 'dot' also available
    },
    x: 570,
    y: 60,
    dy: -20,
    dx: -20
  }].map(function(d){ d.color = "#ffab00"; return d})

  const makeAnnotations = d3.annotation()
  .type(d3.annotationLabel)
  .annotations(annotations)

  slidersvg.append("g")
  .attr("class", "annotation-group")
  .call(makeAnnotations)

  const annotations2 = [
    {
      note: {
        label: "If the line tranverses the red area then the matches were against a tougher opponent",
        title: "Getting to the finals",
        wrap: 300,
        align: "middle"
      },
      connector: {
        end: "dot" // 'dot' also available
      },
      //settings for the subject, in this case the circle radius
      subject: {
        radius: 180
      },
      x: 400,
      y: 120,
      dy: 0,
      dx: -100
    }].map(function(d){ d.color = "#ffab00"; return d})
  
    const makeAnnotations2 = d3.annotation()
    .type(d3.annotationLabel)
    .annotations(annotations2)
  
    svg.append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations2)

  
    const annotations3 = [
      {
        note: {
          label: "Longest running Finale in Wimbeldon",
          title: "2019 Novak Djokovic (13) : Roger Federer(12)",
          wrap: 300,
          align: "middle"
        },
        connector: {
          end: "dot" // 'dot' also available
        },
        //settings for the subject, in this case the circle radius
        subject: {
          radius: 50
        },
        x: 620,
        y: 160,
        dy: 50,
        dx: -200
      }].map(function(d){ d.color = "#ffab00"; return d})
    
      const annotations4 = [
        {
          note: {
            label: "One of the longest matches in Wimbeldon",
            title: "2009 Roger Federer(12): Andy Roddick (14)",
            wrap: 300,
            align: "middle"
          },
          connector: {
            end: "dot" // 'dot' also available
          },
          //settings for the subject, in this case the circle radius
          subject: {
            radius: 50
          },
          x: 460,
          y: 140,
          dy: 50,
          dx: -200
        }].map(function(d){ d.color = "#ffab00"; return d})

 
      function showannotation2019(){

        const makeAnnotations3 = d3.annotation()
      .type(d3.annotationLabel)
      .annotations(annotations3)
    
      barsvg.append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations3)

      }

      function showannotation2009(){

        const makeAnnotations4 = d3.annotation()
      .type(d3.annotationLabel)
      .annotations(annotations4)
    
      barsvg.append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations4)

      }
//--------------------------------Third Scene --------------------------------------------

const setsvg = d3.select("#set-area").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", 200)

// -------------------------------------- SET Details -----------------------------------------
// const SetLabel1 = setsvg.append("text")
// 	.attr("y", height - 520)
// 	.attr("x", width - 550)
// 	.attr("font-size", "40px")
// 	.attr("opacity", "0.4")
// 	.attr("text-anchor", "end")
//   .text("hellp")

//   const SetLabel2 = setsvg.append("text")
// 	.attr("y", height - 520)
// 	.attr("x", width - 100)
// 	.attr("font-size", "40px")
// 	.attr("opacity", "0.4")
// 	.attr("text-anchor", "end")
//   .text("hellp 2")
// --------------------------------------- Slider ----------------------------------------------

//--------------------------------------------------ONDEMAND-------------------------------------------------

var dataset;

  
//---------------------------------- Start of CSV Read and Promise ------------------------------------

d3.csv("https://prateekdhiman27.github.io/data/wins_wimbeldon.csv",  function(d){
        return{
            Winner: d.Winner,
            Loser: d.Loser,
            Date : parseDate(d.Date),
            RoundId: +d.RoundId,
            Round: d.Round,
            WRank: +d.WRank,
            W1: +d.W1,
            W2: +d.W2,
            W3: +d.W3,
            W4: +d.W4,
            W5: +d.W5,
            L1: +d.L1,
            L2: +d.L2,
            L3: +d.L3,
            L4: +d.L4,
            L5: +d.L5, 
            Wsets: +d.Wsets,
            Lsets: +d.Lsets,
            LRank: +d.LRank
        };
    }).then(function(data){

    console.log(data[0]);
    dataset = data;
  
//    drawLegend(dataset)
    drawLine(dataset)
    drawBar(dataset)

    // Creating a year drop down button
    var allyears = d3.map(dataset, function(d){return(formatDateIntoYear(d.Date))}).keys()
    d3.select("#selectYearButton")
        .selectAll('myOptions')
         .data(allyears)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button
  
        d3.select("#selectYearButton").on("change", function(d) {
          // recover the option that has been chosen
          var selectedyearOption = d3.select(this).property("value")

          if (selectedyearOption == 2019){
            showannotation2019()
          }

          if(selectedyearOption ==2009 ){
            showannotation2009()
          }
          // run the updateChart function with this selected option
          console.log(" ------------------ From year drop down----"+selectedyearOption)
          updatecharts(selectedyearOption)
      })
  
      if (slideryear == 2019){
        showannotation2019()
      }

      if(slideryear ==2009 ){
        showannotation2009()
      }

  playButton 
    .on("click", function() {
    var button = d3.select(this);
    if (button.text() == "Pause") {
      moving = false;
      clearInterval(timer);
      // timer = 0;
      button.text("Play");
    } else {
      moving = true;
      timer = setInterval(step, 300);
      button.text("Pause");
    }
    console.log("Slider moving: " + moving);
  })

  // End of Promise Then

})

  
function step() {
  update(x.invert(currentValue));
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    // timer = 0;
    playButton.text("Play");
    console.log("Slider moving: " + moving);
  }
}


function update(h) {
  // update position and text of label according to slider scale

  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

  // filter data set and redraw plot
  var newData = dataset.filter(function(d) {
    // console.log("new data date "+d.Date)
    // console.log("what is h "+h)
    return d.Date < h;
  })

  getPlayer = dataset.filter(function(d){
    console.log("getting winner from new data/date "+d.Winner)
    return d.Winner && formatDateIntoYear(d.Date) == formatDateIntoYear(h)
  })

  slideryear = formatDateIntoYear(h);
  console.log("slider is showing the year "+slideryear);
  console.log("fetched playr is "+getPlayer);
  console.log("new data is --> "+newData[0]); // not working
  //drawPlot(newData);
  drawLine(newData)
  drawBar(newData)
  //redrawLine(getPlayer , newData)

}


function drawLine(data){
  var allGroup = d3.map(data, function(d){return(d.Winner)}).keys()

  var yearwinner = data.filter(function(d) {return (formatDateIntoYear(d.Date)==slideryear && d.Round =='The Final') } )
  
  for (var i = 0; i < yearwinner.length; i++) {
    console.log("-----------for loop winner----------"+yearwinner[i].Winner)
    playerLabel.text(+slideryear+" Champion: " +yearwinner[i].Winner)
    // ranklabel.text("Seed: " +yearwinner[i].WRank)
    playerLabel2.text(+formatDateIntoYear(yearwinner[i].Date)+" Champion: " +yearwinner[i].Winner)
    ranklabel2.text("Seed: " +yearwinner[i].WRank)
  }

  // Setting Scales 
    xScale.domain(d3.extent(data, function(d) { return d.RoundId; }))
    xScaleGroup
      .call(
        d3.axisBottom(xScale)
        .ticks(7)
        .tickFormat((d, i) => ["1st Round" , "2nd Round" , "3rd Round", "4th Round", "Quarterfinals", "Semifinals" , "The Final"][i]))

  yScale.domain([d3.max(data, function(d){ return +d.LRank}) , 1 ])
  yScaleGroup.call(d3.axisLeft(yScale).tickFormat(d3.format(".3")))
  
  var mouseover = function(d) {
    d3.select(this).transition()
    .duration('200')
    .attr("r", 5);
    tooltip
      .html("Opponent Name: " + d.Loser + "<br>  Opponent Rank: " + d.LRank + "<br> Round: " +d.Round )
      .style("left", (d3.event.pageX ) + "px")
      .style("top", (d3.event.pageY ) + "px")
      // .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      // .style("top", (d3.mouse(this)[1]+90) + "px")
      .style("opacity", 1)
  }
  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    d3.select(this).transition()
    .duration('100')
    .attr("r", 5);
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0) }
  
  // Add the scatterplot
  const dot = linechart.selectAll("dot").data(data.filter(function(d){return formatDateIntoYear(d.Date)==slideryear}))

  d3.selectAll("circle").data(clearAll).exit().remove() //this works but also removed slider circle


  dot.enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return xScale(d.RoundId); })
      .attr("cy", function(d) { return yScale(+d.LRank); })
      .attr("fill" , "#b8babd")
      .on("mouseover", mouseover )
      .on("mouseleave", mouseleave )
     // .on("click" , showmatchdeatails )
  //dot.exit().remove()

  var linepath = d3.line()
           .x(function(d, i) { return xScale(d.RoundId); }) // set the x values for the line generator
           .y(function(d) { return yScale(+d.LRank); }) // set the y values for the line generator 
           .curve(d3.curveMonotoneX) // apply smoothing to the line
    
           globallinepath = linepath

  line
    .datum(data.filter(function(d){return d.Winner==allGroup[0]}))
    .datum(data.filter(function(d){return formatDateIntoYear(d.Date)==slideryear})) 
            .attr("d" , linepath)
            .attr("stroke", "#007b22")// function(d){ return myColor(ValueA) })  // d.Winner --> ValueA
            //.attr("stroke", function(d){ return myColor(d.Winner) })//   // d.Winner --> ValueA
            .style("stroke-width", 4)
            .style("fill", "none")



}


function drawBar(data){ 
  // Scales and axis
  barsvg.append("circle").attr("cx",120).attr("cy",100).attr("r", 4).style("fill", "#007b22") 
  barsvg.append("circle").attr("cx",120).attr("cy",120).attr("r", 4).style("fill", "#b8babd")
  barsvg.append("text").attr("x", 140).attr("y", 100).text("Winner").style("font-size", "10px").attr("alignment-baseline","middle")
  barsvg.append("text").attr("x",140).attr("y", 120).text("Loser").style("font-size", "10px").attr("alignment-baseline","middle")

  console.log("From DrawBar - Slider year is"+slideryear)
  var getSetYear1 = data.filter(function(d){return formatDateIntoYear(d.Date)==slideryear})

  //var subgroups = data.columns.slice(19) // slicing untill win/loss columns
  var subgroups = ["W1", "L1", "W2", "L2","W3", "L3","W4", "L4","W5", "L5"]
 
  var groups = d3.map(getSetYear1, function(d){return(d.Loser)}).keys()

  console.log(" Filtered data from drawbar mactching rows"+getSetYear1)

  xbarScale.domain(getSetYear1.map(function(d) { return d.Loser; })).padding(0.2)
  xbarScaleGroup.call(d3.axisBottom(xbarScale).tickFormat(d=>  "VS: "+d))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-15)")
  .style("text-anchor", "end");

  ybarScale.domain([0,18])
  ybarScaleGroup.call(d3.axisLeft(ybarScale).ticks(18))//.tickFormat(d3.format(".3")))

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, xbarScale.bandwidth()])
        .padding([0.05])
  
  var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#007b22', '#b8babd'])


  // trying tool tips

  var mouseoverb = function(d) {
    d3.select(this).transition()
    .duration('200')
    tooltip
      .html("Game Won: " + d.value)
      .style("left", (d3.event.pageX ) + "px")
      .style("top", (d3.event.pageY ) + "px")
      .style("opacity", 1)
  }
  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleaveb = function(d) {
    d3.select(this).transition()
    .duration('100')
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0) }

  d3.selectAll("rect").data(clearAll).exit().remove() // this also removes legend rects

  barchart.append("g")
    .attr("class", "1st Bar G")
    .selectAll("g")
    .data(getSetYear1)
    .enter()
    .append("g")
      .attr("class", "2nd Bar G")
      .attr("transform", function(d) { return "translate(" + xbarScale(d.Loser)+ ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return ybarScale(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - ybarScale(d.value); })
      .attr("fill", function(d) { return color(d.key); })
      .on("mouseover", mouseoverb )
      .on("mouseleave", mouseleaveb )

 
}

function drawBar2(data){  ///// this function is called from year drop down. so the data is already filtered based on year.

  var subgroups = ["W1", "L1", "W2", "L2","W3", "L3","W4", "L4","W5", "L5"] 
  var groups = d3.map(data, function(d){return(d.Loser)}).keys()

  xbarScale.domain(data.map(function(d) { return d.Loser; })).padding(0.2)
  xbarScaleGroup.call(d3.axisBottom(xbarScale).tickFormat(d=>  "VS: "+d))  

  ybarScale.domain([0,18])
  ybarScaleGroup.call(d3.axisLeft(ybarScale).ticks(18))//.tickFormat(d3.format(".3")))

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, xbarScale.bandwidth()])
        .padding([0.05])
  
  var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#007b22', '#b8babd'])


  // trying tool tips

  var mouseoverb = function(d) {
    d3.select(this).transition()
    .duration('200')
    //.attr("r", 5);
    tooltip
      .html("Game Won: " + d.value)
      .style("left", (d3.event.pageX ) + "px")
      .style("top", (d3.event.pageY ) + "px")
      .style("opacity", 1)
  }
  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleaveb = function(d) {
    d3.select(this).transition()
    .duration('100')
    //.attr("r", 5);
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0) }

  d3.selectAll("rect").data(clearAll).exit().remove() // this also removes legend rects

  barchart.append("g")
    .attr("class", "1st Bar G")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
      .attr("class", "2nd Bar G")
      .attr("transform", function(d) { return "translate(" + xbarScale(d.Loser)+ ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return ybarScale(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - ybarScale(d.value); })
      .attr("fill", function(d) { return color(d.key); })
      .on("mouseover", mouseoverb )
      .on("mouseleave", mouseleaveb )

 
}

function drawLine2(data){  ////// Draw Line based on Year drop down
  var allGroup = d3.map(data, function(d){return(d.Winner)}).keys()

  var yearwinner = data.filter(function(d) {return (d.Round =='The Final') } )
  
  for (var i = 0; i < yearwinner.length; i++) {
    console.log("-----------for loop winner----------"+yearwinner[i].Winner)
    playerLabel.text(+formatDateIntoYear(yearwinner[i].Date)+" Champion: " +yearwinner[i].Winner)
    // ranklabel.text("Seed: " +yearwinner[i].WRank)
    playerLabel2.text(+formatDateIntoYear(yearwinner[i].Date)+" Champion: " +yearwinner[i].Winner)
    ranklabel2.text("Seed: " +yearwinner[i].WRank)
  }

  // Setting Scales 
    xScale.domain(d3.extent(data, function(d) { return d.RoundId; }))
    xScaleGroup
      .call(
        d3.axisBottom(xScale)
        .ticks(7)
        .tickFormat((d, i) => ["1st Round" , "2nd Round" , "3rd Round", "4th Round", "Quarterfinals", "Semifinals" , "The Final"][i]))

  yScale.domain([d3.max(data, function(d){ return +d.LRank}) , 1 ])
  yScaleGroup.call(d3.axisLeft(yScale).tickFormat(d3.format(".3")))
  
  var mouseover = function(d) {
    d3.select(this).transition()
    .duration('200')
    .attr("r", 5);
    tooltip
      .html("Opponent Name: " + d.Loser + "<br>  Opponent Rank: " + d.LRank + "<br> Round: " +d.Round )
      .style("left", (d3.event.pageX ) + "px")
      .style("top", (d3.event.pageY ) + "px")
      // .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      // .style("top", (d3.mouse(this)[1]+90) + "px")
      .style("opacity", 1)
  }
  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    d3.select(this).transition()
    .duration('100')
    .attr("r", 5);
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0) }
  
  // Add the scatterplot
  const dot = linechart.selectAll("dot").data(data)

  d3.selectAll("circle").data(clearAll).exit().remove() //this works but also removed slider circle

  dot.enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return xScale(d.RoundId); })
      .attr("cy", function(d) { return yScale(+d.LRank); })
      .attr("fill" , "#b8babd")
      .on("mouseover", mouseover )
      .on("mouseleave", mouseleave )
     // .on("click" , showmatchdeatails )
  //dot.exit().remove()

  var linepath = d3.line()
           .x(function(d, i) { return xScale(d.RoundId); }) // set the x values for the line generator
           .y(function(d) { return yScale(+d.LRank); }) // set the y values for the line generator 
           .curve(d3.curveMonotoneX) // apply smoothing to the line
    
           globallinepath = linepath

  line
    .datum(data.filter(function(d){return d.Winner==allGroup[0]}))
//    .datum(data.filter(function(d){return formatDateIntoYear(d.Date)==slideryear})) 
            .attr("d" , linepath)
            .attr("stroke", "#007b22")// function(d){ return myColor(ValueA) })  // d.Winner --> ValueA
            //.attr("stroke", function(d){ return myColor(d.Winner) })
            .style("stroke-width", 4)
            .style("fill", "none")
}

function updatecharts(year) {
 var datafilter = dataset.filter(function(d){return formatDateIntoYear(d.Date)==year})
  drawBar2(datafilter)
  drawLine2(datafilter)
}


