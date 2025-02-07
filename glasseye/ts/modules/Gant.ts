var Gantt = function (processed_data, div, size) {
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

  // Scales
  this.xScale = d3
    .scaleTime()
    .domain([
      d3.min(this.processed_data, (d) => d.start),
      d3.max(this.processed_data, (d) => d.end),
    ])
    .range([0, this.width]);

  this.yScale = d3
    .scaleBand()
    .domain(this.processed_data.map((d) => d.task))
    .range([0, this.height])
    .padding(0.2);

  // Axes
  this.xAxis = d3
    .axisBottom(this.xScale)
    .ticks(d3.timeWeek.every(1))
    .tickFormat(d3.timeFormat("%d/%m/%Y"));
  this.yAxis = d3.axisLeft(this.yScale);
};

Gantt.prototype = Object.create(GlasseyeChart.prototype);

Gantt.prototype.add_tasks = function () {
  this.chart_area
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${this.height})`)
    .call(this.xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  this.chart_area.append("g").attr("class", "y-axis").call(this.yAxis);

  // Bars
  this.chart_area
    .selectAll(".bar")
    .data(this.processed_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => this.xScale(d.start))
    .attr("y", (d) => this.yScale(d.task))
    .attr("width", (d) => this.xScale(d.end) - this.xScale(d.start))
    .attr("height", this.yScale.bandwidth());
};

function gantt(data, div, size) {
  var inline_parser = function (data) {
    var parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach((d) => {
      d.start = parseDate(d.start);
      d.end = parseDate(d.end);
      d.duration = (d.end - d.start) / (1000 * 60 * 60 * 24); // Convert to days
    });

    return data;
  };

  var csv_parser = function (data) {
    //To be written
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Gantt(processed_data, div, size);
    glasseye_chart.add_svg().add_tasks();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
