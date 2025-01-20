var ScatterPlot = function (processed_data, div, size) {
  var margin =
    size === "full_page"
      ? {
          top: 5,
          bottom: 5,
          left: 100,
          right: 100,
        }
      : {
          top: 5,
          bottom: 5,
          left: 50,
          right: 50,
        };

  GlasseyeChart.call(this, div, size, margin, undefined);
  this.processed_data = processed_data;
  // Scales
  this.xScale = d3
    .scaleLinear()
    .domain([0, d3.max(this.processed_data, (d) => d.xScore) + 1])
    .range([0, this.width]);

  this.yScale = d3
    .scaleLinear()
    .domain([40, d3.max(this.processed_data, (d) => d.yScore) + 10])
    .range([this.height, 0]);
};

ScatterPlot.prototype = Object.create(GlasseyeChart.prototype);

ScatterPlot.prototype.add_Scatterplot = function () {
  this.chart_area
    .append("g")
    .attr("transform", `translate(0, ${this.height})`)
    .call(d3.axisBottom(this.xScale).ticks(10));

  this.chart_area.append("g").call(d3.axisLeft(this.yScale));

  // Add gridlines
  this.chart_area
    .append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(this.yScale).tickSize(-this.width).tickFormat(""))
    .selectAll("line")
    .attr("stroke", "#e0e0e0");

  // Add dots to scatter plot
  this.chart_area
    .selectAll(".dot")
    .data(this.processed_data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => this.xScale(d.xScore))
    .attr("cy", (d) => this.yScale(d.yScore))
    .attr("r", 6);

  // Add axis labels
  this.chart_area
    .append("text")
    .attr("x", this.width / 2)
    .attr("y", this.height + this.margin.bottom - 10)
    .attr("text-anchor", "middle")
    .attr("class", "axis-label")
    .text("X Score");

  this.chart_area
    .append("text")
    .attr("x", -this.height / 2)
    .attr("y", -this.margin.left + 20)
    .attr("text-anchor", "middle")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .text("Y Score");

  // Add trendline (simple linear regression)
  xMean = d3.mean(this.processed_data, (d) => d.xScore);
  yMean = d3.mean(this.processed_data, (d) => d.yScore);
  slope =
    d3.sum(this.processed_data, (d) => (d.xScore - xMean) * (d.yScore - yMean)) /
    d3.sum(this.processed_data, (d) => (d.xScore - xMean) ** 2);
  intercept = yMean - slope * xMean;

  trendline = [
    { xScore: 1, yScore: slope * 1 + intercept },
    { xScore: 10, yScore: slope * 10 + intercept },
  ];

  this.chart_area
    .append("line")
    .attr("x1", this.xScale(trendline[0].xScore))
    .attr("y1", this.yScale(trendline[0].yScore))
    .attr("x2", this.xScale(trendline[1].xScore))
    .attr("y2", this.yScale(trendline[1].yScore))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5,5");
};

function scatterplot(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new ScatterPlot(processed_data, div, size);

    glasseye_chart.add_svg().add_Scatterplot();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
