var Boxplot = function (processed_data, div, size) {
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
    // Sort the data
    this.processed_data.sort(d3.ascending);

    // Compute summary statistics
    this.q1 = d3.quantile(this.processed_data, 0.25);
    this.median = d3.median(this.processed_data);
    this.q3 = d3.quantile(this.processed_data, 0.75);
    this.iqr = this.q3 - this.q1;  // Interquartile range
    this.min = Math.max(this.q1 - 1.5 * this.iqr, d3.min(this.processed_data)); // Lower bound
    this.max = Math.min(this.q3 + 1.5 * this.iqr, d3.max(this.processed_data)); // Upper bound
    this.outliers = this.processed_data.filter(d => d < this.min || d > this.max);
    

    // Create scale for positioning
    this.xScale = d3.scaleLinear()
        .domain([d3.min(this.processed_data) - 1, d3.max(this.processed_data) + 1])
        .range([this.margin.left, this.width - this.margin.right]);
};

Boxplot.prototype = Object.create(GlasseyeChart.prototype);

Boxplot.prototype.add_boxplot = function () {
  // Box (interquartile range)
  this.chart_area.append("rect")
  .attr("class", "box")
  .attr("x", this.xScale(this.q1))
  .attr("y", this.height / 2 - 50)
  .attr("width", this.xScale(this.q3) - this.xScale(this.q1))
  .attr("height", 100);

// Median line
this.chart_area.append("line")
  .attr("class", "median")
  .attr("x1", this.xScale(this.median))
  .attr("x2", this.xScale(this.median))
  .attr("y1", this.height / 2 - 50)
  .attr("y2", this.height / 2 + 50);

// Whiskers
this.chart_area.append("line")
  .attr("class", "whisker")
  .attr("x1", this.xScale(this.min))
  .attr("x2", this.xScale(this.q1))
  .attr("y1", this.height / 2)
  .attr("y2", this.height / 2);

this.chart_area.append("line")
  .attr("class", "whisker")
  .attr("x1", this.xScale(this.q3))
  .attr("x2", this.xScale(this.max))
  .attr("y1", this.height / 2)
  .attr("y2", this.height / 2);

// Outliers
this.chart_area.selectAll(".outlier")
  .data(this.outliers)
  .enter()
  .append("circle")
  .attr("class", "outlier")
  .attr("cx", d => this.xScale(d))
  .attr("cy", this.height / 2)
  .attr("r", 5);

// Axis
this.chart_area.append("g")
  .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
  .call(d3.axisBottom(this.xScale));

// Labels
this.chart_area.append("text")
  .attr("x", this.width / 2)
  .attr("y", this.margin.top / 2)
  .attr("text-anchor", "middle")
  .attr("font-size", "18px")
  .text("Box-and-Whisker Plot");
  
};

function boxplot(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Boxplot(processed_data, div, size);

    glasseye_chart.add_svg().add_boxplot();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
