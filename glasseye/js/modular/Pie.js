var Pie = function (processed_data, div, size) {
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
  
    this.radius = Math.min(this.width, this.height) / 2;
  };
  
  Pie.prototype = Object.create(GlasseyeChart.prototype);
  
  Pie.prototype.add_pie = function (isDonut = false) {
    color = d3
      .scaleOrdinal()
      .domain(this.processed_data.map((d) => d.label))
      .range(d3.schemeCategory10);
  
    // Create the pie function
    pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);
  
    // Create the arc generator
    arc = d3
      .arc()
      .innerRadius(isDonut ? this.radius * 0.5 : 0) // For a pie chart, the inner radius is 0 (use for a donut chart)
      .outerRadius(this.radius);
  
    // Bind data to arcs
    arcs = this.chart_area
      .selectAll(".arc")
      .data(pie(this.processed_data))
      .enter()
      .append("g")
      .attr("class", "arc");
  
    // Draw the slices
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));
  
    // Add labels to the slices
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.label);
  };
  
  function piechart(data, div, size, isDonut = false) {
    var inline_parser = function (data) {
      return data;
    };
  
    var csv_parser = function (data) {
      return data;
    };
  
    var draw = function (processed_data, div, size) {
      var glasseye_chart = new Pie(processed_data, div, size);
  
      glasseye_chart.add_svg().add_pie(isDonut);
    };
  
    build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
  }
  
  function donut(data, div, size) {
    piechart(data, div, size, true);
  }