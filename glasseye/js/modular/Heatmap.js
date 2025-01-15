var Heatmap = function (processed_data, div, size) {
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

  GlasseyeChart.call(this, div, size, margin, 300);
  this.processed_data = processed_data;

  this.xScale = d3
    .scaleBand()
    .domain([1, 2, 3]) // Unique x values
    .range([0, this.width])
    .padding(0.01);

  this.yScale = d3
    .scaleBand()
    .domain([1, 2, 3]) // Unique y values
    .range([0, this.height])
    .padding(0.01);

  this.colorScale = d3.scaleSequential(d3.interpolateBlues).domain([10, 90]);
};

Heatmap.prototype = Object.create(GlasseyeChart.prototype);

Heatmap.prototype.add_heatmap = function () {
  this.chart_area
    .selectAll(".cell")
    .data(this.processed_data)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", (d) => this.xScale(d.x))
    .attr("y", (d) => this.yScale(d.y))
    .attr("width", this.xScale.bandwidth())
    .attr("height", this.yScale.bandwidth())
    .style("fill", (d) => this.colorScale(d.value));

  // Add x-axis
  this.chart_area
    .append("g")
    .attr("transform", `translate(0, ${this.height})`)
    .call(d3.axisBottom(this.xScale).tickFormat((d) => `Col ${d}`))
    .selectAll("text")
    .attr("class", "axis-label");

  // Add y-axis
  this.chart_area
    .append("g")
    .call(d3.axisLeft(this.yScale).tickFormat((d) => `Row ${d}`))
    .selectAll("text")
    .attr("class", "axis-label");
};

function heatmap(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Heatmap(processed_data, div, size);

    glasseye_chart.add_svg().add_heatmap();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
