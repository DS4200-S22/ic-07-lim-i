/*
In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 
*/

// Build your scatterplot in this file
const svg3 = d3
    .select("#csv-scatter")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatter.csv").then((data) => {

    // find max X
    let maxX = d3.max(data, (d) => { return d.day; });

    // find max Y
    let maxY = d3.max(data, (d) => { return d.score; });

    let xScale = d3.scaleLinear()
        .domain([0, maxX])
        .range([margin.left, width - margin.right]);

    let yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin.bottom, margin.top]);

    svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .attr("font-size", '20px');

    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale))
        .attr("font-size", '20px');

const tooltip3 = d3.select("#csv-scatter")
    .append("div")
    .attr('id', "tooltip3")
    .style("opacity", 0)
    .attr("class", "tooltip");

const mouseover3 = function(event, d) {
    tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
        .style("opacity", 1);
}

const mousemove3 = function(event, d) {
    tooltip3.style("left", (event.x)+"px")
        .style("top", (event.pageY + yTooltipOffset) +"px");
}

const mouseleave3 = function(event, d) {
    tooltip3.style("opacity", 0);
}

    const points = svg3.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", (d) => d.day)
        .attr("r", 10)
        .attr("cx", (d) => xScale(d.day))
        .attr("cy", (d) => yScale(d.score))
        .style("fill", (d) => d.day)
        .style("opacity", 1)
        .attr("class", "myFirstPlot")
        .on("mouseover", mouseover3)
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3);

});