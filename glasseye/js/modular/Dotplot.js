var Dotplot = function (processed_data, div, size) {
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

  this.counts = d3.rollup(
    this.processed_data,
    (v) => v.length,
    (d) => d
  );
  this.sortedData = Array.from(this.counts.entries()).sort(
    (a, b) => a[0] - b[0]
  );

  // Scales
  this.xScale = d3
    .scaleBand()
    .domain(this.sortedData.map((d) => d[0]))
    .range([0, this.width])
    .padding(0.2);

  this.yScale = d3
    .scaleLinear()
    .domain([0, d3.max(this.sortedData, (d) => d[1])])
    .range([this.height, 0]);
};

Dotplot.prototype = Object.create(GlasseyeChart.prototype);

Dotplot.prototype.add_dotplot = function () {
  this.chart_area
    .append("g")
    .attr("transform", `translate(0, ${this.height})`)
    .call(d3.axisBottom(this.xScale).tickFormat((d) => d));

  this.chart_area.append("g").call(d3.axisLeft(this.yScale).ticks(5));

  // Add gridlines
  this.chart_area
    .append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(this.yScale).tickSize(-this.width).tickFormat(""))
    .selectAll("line")
    .attr("stroke", "#e0e0e0");

  // Draw dots
  this.chart_area
    .selectAll(".dot")
    .data(this.processed_data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => this.xScale(d) + this.xScale.bandwidth() / 2)
    .attr("cy", (d, i, nodes) => {
      const value = d;
      const freq = nodes.slice(0, i).filter((n) => n.__data__ === value).length;
      return this.yScale(freq + 1);
    })
    .attr("r", 5);

  // Add labels
  this.chart_area
    .append("text")
    .attr("x", this.width / 2)
    .attr("y", this.height + this.margin.bottom - 10)
    .attr("text-anchor", "middle")
    .text("Values");

  this.chart_area
    .append("text")
    .attr("x", -this.height / 2)
    .attr("y", -this.margin.left + 10)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Frequency");
};

function dotplot(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Dotplot(processed_data, div, size);

    glasseye_chart.add_svg().add_dotplot();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
