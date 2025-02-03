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
    this.plotWidth = this.width - this.margin.left - this.margin.right,
    this.plotHeight = this.height - this.margin.top - this.margin.bottom;

    this.categories = this.processed_data.map(d => d.category);

    this.xScale = d3.scaleBand()
      .domain(this.categories)
      .range([0, this.plotWidth])
      .padding(0.5);

      this.allValues = this.processed_data.flatMap(d => d.values);
      this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.allValues)])
      .range([this.plotHeight, 0]);
};

Boxplot.prototype = Object.create(GlasseyeChart.prototype);

Boxplot.prototype.add_boxplot = function () {
  this.chart_area.append("g")
      .attr("transform", `translate(0, ${this.plotHeight})`)
      .call(d3.axisBottom(this.xScale));

    this.chart_area.append("g")
      .call(d3.axisLeft(this.yScale));

    this.processed_data.forEach((d, i) => {
      var sortedValues = d.values.sort(d3.ascending);
      var q1 = d3.quantile(sortedValues, 0.25);
      var median = d3.quantile(sortedValues, 0.5);
      var q3 = d3.quantile(sortedValues, 0.75);
      var min = d3.min(sortedValues);
      var max = d3.max(sortedValues);

      var centerX = this.xScale(d.category) + this.xScale.bandwidth() / 2;

      // Draw box
      this.chart_area.append("rect")
        .attr("x", centerX - 20)
        .attr("y", this.yScale(q3))
        .attr("width", 40)
        .attr("height", this.yScale(q1) - this.yScale(q3))
        .attr("stroke", "black")
        .attr("fill", "lightblue");

      // Draw median line
      this.chart_area.append("line")
        .attr("x1", centerX - 20)
        .attr("x2", centerX + 20)
        .attr("y1", this.yScale(median))
        .attr("y2", this.yScale(median))
        .attr("stroke", "black");

      // Draw min and max lines
      this.chart_area.append("line")
        .attr("x1", centerX)
        .attr("x2", centerX)
        .attr("y1", this.yScale(min))
        .attr("y2", this.yScale(q1))
        .attr("stroke", "black");

      this.chart_area.append("line")
        .attr("x1", centerX)
        .attr("x2", centerX)
        .attr("y1", this.yScale(q3))
        .attr("y2", this.yScale(max))
        .attr("stroke", "black");

      // Draw whiskers
      this.chart_area.append("line")
        .attr("x1", centerX - 10)
        .attr("x2", centerX + 10)
        .attr("y1", this.yScale(min))
        .attr("y2", this.yScale(min))
        .attr("stroke", "black");

      this.chart_area.append("line")
        .attr("x1", centerX - 10)
        .attr("x2", centerX + 10)
        .attr("y1", this.yScale(max))
        .attr("y2", this.yScale(max))
        .attr("stroke", "black");
    });
  
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
