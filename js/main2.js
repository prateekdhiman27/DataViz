/*
*********** main.js ***********
*********** D3 JS for CS 416 Data Visulation Final Project ***********
*********** Wimbledon Path to Finals Script ***********
*/

// Global Variables

var formatDateIntoYear = d3.timeFormat("%Y");
var formatDate = d3.timeFormat("%b %Y");
var parseDate = d3.timeParse("%d/%m/%y");

var startDate = new Date("2002-02-01"),
    endDate = new Date("2022-12-27");
var slideryear = 2002; // to be updated based on data.

clearAll = []

var margin = {top:50, right:50, bottom:0, left:50},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom; //550


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
//var yearchamp ="";

var startyear = 2012
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
.attr("transform", "translate(" + (margin.left+50)+ "," + (height-550) + ")");


var line = linechart
.append('g')
.append("path")

const legend = linechart.append("g")
.attr("transform", `translate(${width - 10}, ${height - 125})`)

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
	.attr("font-size", "15px")
	.attr("text-anchor", "middle")
  .attr("fill", "red")
  .attr("opacity", "0.4")
	.text("Higher Seeded Matches")

const ySubLabel2 = linechart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -30)
	.attr("x", -((height/2)+110))
	.attr("font-size", "15px")
	.attr("text-anchor", "start")
  .attr("fill", "gold")
  .attr("opacity", "0.7")
	.text("Middle Seeded Matches")

const ySubLabel3 = linechart.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -30)
	.attr("x", -((height/2)+120))
	.attr("font-size", "15px")
	.attr("text-anchor", "end")
  .attr("fill", "green")
  .attr("opacity", "0.4")
	.text("Lower Seeded Matches")


const playerLabel = linechart.append("text")
	.attr("y", height - 520)
	.attr("x", width - 600)
	.attr("font-size", "30px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "middle")

const ranklabel = linechart.append("text")
	.attr("y", height - 480)
	.attr("x", width - 685)
	.attr("font-size", "30px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "end")

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
  .style("opacity", 0);

var globallinepath
var myColor = d3.scaleOrdinal(d3.schemePastel1) // A color scale: one color for each group

// ---------------------- trying to provide area behind the line chart
var points = []
var points = [
  { xpoint: 0, ypoint: 320 },
  { xpoint: 750, ypoint: 320 }
];

var points2 = []
var points2 = [
  { xpoint: 0, ypoint: 460 },
  { xpoint: 750, ypoint: 460 }
];

var points3 = []
var points3 = [
  { xpoint: 0, ypoint: 550 },
  { xpoint: 750, ypoint: 550 }
];

var Gen = d3.area()
  .x((p) => p.xpoint)
  .y0((p) => 0)
  .y1((p) => p.ypoint);

  var Gen2 = d3.area()
  .x((p) => p.xpoint)
  .y0((p) => 320)
  .y1((p) => p.ypoint);

  var Gen3 = d3.area()
  .x((p) => p.xpoint)
  .y0((p) => 460)
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
    .attr("transform", "translate(" + (margin.left+50)+ "," + ((height-550)) + ")");

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
.attr("y", height+40)
.attr("x", width / 2)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Winner Set(W) / Opponent Set (L)")
const ybarLabel = barchart.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -40)
.attr("x", -((height/2)-80))
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Games Won")

// ------------------------------ Annotations ------------------------------------

const annotations = [
  {
    note: {
      label: "Due to Covid-19 Pandemic, Wimbledon was cancelled in 2020",
      title: "No Wimbledon Tournament",
      wrap: 150,
      align: "right"
    },
    connector: {
      end: "arrow" // 'dot' also available
    },
    x: 720,
    y: 5,
    dy: 50,
    dx: -50
  }].map(function(d){ d.color = "#E8336D"; return d})

  const makeAnnotations = d3.annotation()
  .type(d3.annotationLabel)
  .annotations(annotations)

  svg.append("g")
  .attr("class", "annotation-group")
  .call(makeAnnotations)

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

//---------------------------------------------------------------------------------------------------
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
  
    drawLegend(dataset)
    drawLine(dataset)
    drawBar(dataset)

  
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
    console.log("new data date "+d.Date)
    console.log("what is h "+h)
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

function updateline(selectedGroup, yearforline) {
  
  // Create new data with the selection?
//var dataFilter = data.filter(function(d){return d.Winner==selectedGroup})
var dataFilter = dataset.filter(function(d){return d.Winner==selectedGroup && formatDateIntoYear(d.Date) == yearforline })
console.log("Getting Player Name from Legend"+selectedGroup)
console.log("Getting Year of Slider Line"+yearforline)
console.log("datafilter from update line is"+ dataFilter[0])
// Give these new data to update line
line
    .datum(dataFilter)
    .transition()
    .duration(1000)
    .attr("d" , globallinepath)
    .attr("stroke", function(d){ return myColor("ValueA") })

  //Add the scatterplot
}

function drawLine(data){
  var allGroup = d3.map(data, function(d){return(d.Winner)}).keys()

  var yearwinner = data.filter(function(d) {return (formatDateIntoYear(d.Date)==slideryear && d.Round =='The Final') } )
  
  for (var i = 0; i < yearwinner.length; i++) {
    console.log("-----------for loop winner----------"+yearwinner[i].Winner)
    playerLabel.text(+slideryear+" Champion: " +yearwinner[i].Winner)
    ranklabel.text("Seed: " +yearwinner[i].WRank)
    // SetLabel1.text("Sets Won "+yearwinner[i].Wsets)
    // SetLabel2.text("Opponent Won"+yearwinner[i].Lsets)
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
            .style("stroke-width", 4)
            .style("fill", "none")

    // --------------------------- Trying Multiline graph ------------------------
    var filterData ={"Djokovic N.":true,"Federer R.":true,"Murray A.":true};//player to be shown 

    // all group has all winner names


}

function drawLegend(data) {
  var allWinners = d3.map(data, function(d){return(d.Winner)}).keys()

  //------------------------------------- Legend for line chart --------------------------------------

  allWinners.forEach((player, i) => {
    const legendRow = legend.append("g")
     .attr("transform", `translate(0, ${i * 20})`)

   legendRow.append("rect")
     .attr("width", 10)
     .attr("height", 10)
     .attr("fill", myColor(player))

   legendRow.append("text")
     .attr("x", -10)
     .attr("y", 10)
     .attr("text-anchor", "end")
     .style("text-transform", "capitalize")
     .text(player)

   // Trying to add on click for legend
   legendRow.on("click" , function(d){ 
       //getPlayer != getPlayer
       console.log(player)
       console.log(slideryear)
       updateline(player , slideryear)})
     // getPlayer = player // passing player to global variable
 })

}

function drawBar(data){ // this should be stacked bar chart
  // Scales and axis

  console.log("From DrawBar - Slider year is"+slideryear)
  var getSetYear1 = data.filter(function(d){return formatDateIntoYear(d.Date)==slideryear})

  //var subgroups = data.columns.slice(19) // slicing untill win/loss columns
  var subgroups = ["W1", "L1", "W2", "L2","W3", "L3","W4", "L4","W5", "L5"]
 
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(getSetYear1, function(d){return(d.Loser)}).keys()

  //console.log(" Filtered data from drawbar based on slider year"+getSetYear)
  console.log(" Filtered data from drawbar mactching rows"+getSetYear1)

  xbarScale.domain(getSetYear1.map(function(d) { return d.Loser; })).padding(0.2)
  xbarScaleGroup.call(d3.axisBottom(xbarScale).tickFormat(d=>  "Winner vs "+d))  

  ybarScale.domain([0,7])
  ybarScaleGroup.call(d3.axisLeft(ybarScale).ticks(7))//.tickFormat(d3.format(".3")))

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
      // .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      // .style("top", (d3.mouse(this)[1]+90) + "px")
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
    .data(getSetYear1)
    .enter()
    .append("g")
      .attr("class", "2nd Bar G")
      .attr("transform", function(d) { return "translate(" + xbarScale(d.Loser)+ ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
 //     .attr("y", function(d) { return ybarScale(0); })
      .attr("y", function(d) { return ybarScale(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - ybarScale(d.value); })
   //   .attr("height", function(d) { return height - ybarScale(0); })
      .attr("fill", function(d) { return color(d.key); })
  //    .attr("fill", "#000000") 
      .on("mouseover", mouseoverb )
      .on("mouseleave", mouseleaveb )
  

// barchart.selectAll("rect")  // need to provide filtered data for year and winner
// .data(getSetYear1)
// .enter().append("rect")
// .attr("class", "barchart")
// .attr("x", function(d) { return xbarScale(d.Loser); })
// .attr("width", xbarScale.bandwidth())
// .attr("fill", "#69b3a2") // no bars at the beginning
// .attr("height", function(d) { return height - ybarScale(0); }) // always equal to 0
// .attr("y", function(d) { return ybarScale(0); })

    // barchart.selectAll("rect")
    // .transition()
    // .duration(1)
    // .attr("y", function(d) { return ybarScale(d.value); })
    // .attr("height", function(d) { return height - ybarScale(d.value); })
    // .attr("fill", function(d) { return color(d.key); })
    // .delay(function(d,i){console.log(i) ; return(i*100)})
 
}
