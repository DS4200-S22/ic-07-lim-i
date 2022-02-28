/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
const svg1 = d3
  .select("#hard-coded-bar") // finds element w that id
  .append("svg") // adds an svg
  .attr("width", width-margin.left-margin.right) // with set width
  .attr("height", height - margin.top - margin.bottom) // and set height
  .attr("viewBox", [0, 0, width, height]); // in view box

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do?
// finds the maximum data point in the data1 set and stores it
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?  
// scaling function (data value 5 -> pixel value x)
let yScale1 = d3.scaleLinear() // this createsa linear scale
            .domain([0,maxY1]) // with a domain from 0 to the max y 
            .range([height-margin.bottom,margin.top]); // spreading the domain over a range defined by 
                                                       // the starting and end vertical positions of the graph

// TODO: What does each line of this code do? 
let xScale1 = d3.scaleBand() // this creates a scale of discrete bands, not continuous
            .domain(d3.range(data1.length)) // with the number of bands as there are entries in data1
            .range([margin.left, width - margin.right]) // spreading the domain over a range defined by 
                                                        // the starting and end horizontal positions of the graph
            .padding(0.1); // adding padding between each bar

// TODO: What does each line of this code do?  
svg1.append("g") // append generic svg 
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1)) // built in function that takes in scale and makes axis
   .attr("font-size", '20px'); // adjust font

// TODO: What does each line of this code do? 
svg1.append("g") // append generic svg 
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) // built in function that takes in scale and makes axis
            .tickFormat(i => data1[i].name))  // at each tick add the name label
    .attr("font-size", '20px'); // adjust font

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar") // selects the div in the html with that id
                .append("div") // inserts a div inside
                .attr('id', "tooltip1") // sets id of added div as the tooltip1
                .style("opacity", 0)  // makes it not visible at first
                .attr("class", "tooltip"); // sets class of added div to tooltip

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) { // defines event handler function
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")  // where tooltip will show info about the bar its hovering over
          .style("opacity", 1); // and it will be visible
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) { // defines event handler function
  tooltip1.style("left", (event.x)+"px") // defines the x position of the tooltip 
          .style("top", (event.y + yTooltipOffset) +"px"); // defines the y position of the tooltip 
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) {  // defines event handler function
  tooltip1.style("opacity", 0); // where when the mouse leaves, the tooltip isn't shown/isn't visible anymore
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg1.selectAll(".bar") // selects all items with class bar in the svg
   .data(data1) // sets the data source to data1
   .enter() // links it to the current bars
   .append("rect") // calls the rect of each bar
     .attr("class", "bar") // sets the class of each to be "bar"
     .attr("x", (d,i) => xScale1(i)) // sets x value of bar to be the respective element in the xScale array
     .attr("y", (d) => yScale1(d.score)) // sets y value of bar to be the respective element in the yScale array
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) // enables event handler in this listener
     .on("mousemove", mousemove1) // enables event handler in this listener
     .on("mouseleave", mouseleave1); // enables event handler in this listener

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


svg2.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(yScale1))
  .attr("font-size", '20px');

svg2.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale1)
      .tickFormat(i => data1[i].name))
  .attr("font-size", '20px');


// This code is creating a tooltip.
const tooltip2 = d3.select("#csv-bar")
  .append("div")
  .attr('id', "tooltip2")
  .style("opacity", 0)
  .attr("class", "tooltip");

// Event Handler. When the mouse goes over a certain bar, it shows the name and score of the bar.
const mouseover2 = function(event, d) {
tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
    .style("opacity", 1);
}

// Event Handler. When the mouse moves, it shows the position of the mouse.
const mousemove2 = function(event, d) {
tooltip2.style("left", (event.x)+"px")
    .style("top", (event.pageY + yTooltipOffset) +"px");
}

//Event Handler. When the mouse leaves a bar graph and the tool tip go away.
const mouseleave2 = function(event, d) {
tooltip2.style("opacity", 0);
}


d3.csv("data/barchart.csv").then((data) => {
svg2.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d,i) => xScale1(i))
    .attr("y", (d) => yScale1(d.score))
    .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
    .attr("width", xScale1.bandwidth())
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2);
});