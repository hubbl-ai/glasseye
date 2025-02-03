var BarChart = function (processed_data, div, size) {
    this.margin =
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
  
    GlasseyeChart.call(this, div, size, this.margin, 300);
  
    this.processed_data = processed_data;
  
    // Declare the x (horizontal position) scale.
    this.xScale = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          this.processed_data,
          ([d]) => -d.value,
          (d) => d.label.toString()
        )
      ) // descending frequency
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.1);
  
    // Declare the y (vertical position) scale.
    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.processed_data, (d) => d.value)])
      .range([this.height - this.margin.bottom, this.margin.top]);
  };
  
  BarChart.prototype = Object.create(GlasseyeChart.prototype);
  
  BarChart.prototype.add_barchart = function () {
    // this.chart_area
    //   .attr("viewBox", [0, 0, this.width, this.height])
    //   .attr("style", "max-width: 100%; height: auto;");
  
    // Add a rect for each bar.
    this.chart_area
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(this.processed_data)
      .join("rect")
      .attr("x", (d) => this.xScale(d.label.toString()))
      .attr("y", (d) => this.yScale(d.value))
      .attr("height", (d) => this.yScale(0) - this.yScale(d.value))
      .attr("width", this.xScale.bandwidth());
    // .on("mouseover", function (event, d) {
    //   d3.select(this).attr("fill", "orange");
  
    //   const tooltipText = `${d.label} - ${d.value}`;
  
    //   // Add a tooltip for value display
    //   this.chart_area
    //     .append("text")
    //     .attr("class", "tooltip")
    //     .attr("x", this.xScale(d.label))
    //     .attr("y", this.yScale(d.value))
    //     .attr("text-anchor", "middle")
    //     .attr("fill", "black")
    //     .text(tooltipText);
    // })
    // .on("mouseout", function (s = 'steelblue') {
    //   d3.select(this).attr("fill", s);
  
    //   // Remove the tooltip
    //   this.chart_area.selectAll(".tooltip").remove();
    // });
  
    // Add the x-axis and label.
    this.chart_area
      .append("g")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale).tickSizeOuter(0));
  
    // Add the y-axis and label, and remove the domain line.
    this.chart_area
      .append("g")
      .attr("transform", `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.yScale).tickFormat((y) => y.valueOf().toFixed()))
      .call((g) => g.select(".domain").remove());
    // .call((g) =>
    //   g
    //     .append("text")
    //     .attr("x", -this.margin.left)
    //     .attr("y", 10)
    //     .attr("fill", 'steelblue')
    //     .attr("text-anchor", "start")
    //     .text("Amount On Hand")
    // );
  };
  
  function barchart(data, div, size) {
    var inline_parser = function (data) {
      return data;
    };
  
    var csv_parser = function (data) {
      return data;
    };
  
    var draw = function (processed_data, div, size) {
      var glasseye_chart = new BarChart(processed_data, div, size);
  
      glasseye_chart.add_svg().add_barchart();
    };
  
    build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
  }