var Gantt = function (processed_data, div, size, scales) {
  this.div = div;
  this.processed_data = processed_data;

  // Scales
  this.xScale = d3
    .scaleTime()
    .domain([d3.min(this.processed_data, (d) => d.start), d3.max(this.processed_data, (d) => d.end)])
    .range([0, width]);

  this.yScale = d3
    .scaleBand()
    .domain(this.processed_data.map((d) => d.task))
    .range([0, this.height])
    .padding(0.2);

  // Axes
  this.xAxis = d3
    .axisBottom(xScale)
    .ticks(d3.timeWeek.every(1))
    .tickFormat(d3.timeFormat("%d/%m/%Y"));
  this.yAxis = d3.axisLeft(yScale);

};

Gantt.prototype = Object.create(GridChart.prototype);

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
    .attr("x", (d) => xScale(d.start))
    .attr("y", (d) => yScale(d.task))
    .attr("width", (d) => xScale(d.end) - xScale(d.start))
    .attr("height", yScale.bandwidth());
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
    var glasseye_chart = new Gantt(processed_data, div, size, scales);
    glasseye_chart.add_svg().add_tasks();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
