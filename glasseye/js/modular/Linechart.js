
var Linechart = function (processed_data, div, size) {
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
  };
  
  Linechart.prototype = Object.create(GlasseyeChart.prototype);
  
  Linechart.prototype.add_linechart = function (isCurved = false) {
    x = d3
      .scaleLinear()
      .domain([d3.min(this.processed_data, (d) => d.x), d3.max(this.processed_data, (d) => d.x)])
      .range([0, this.width]);
  
    y = d3
      .scaleLinear()
      .domain([0, d3.max(this.processed_data, (d) => d.y)])
      .range([this.height, 0]);
  
    line = isCurved ?
       d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveBasis)
      :
      d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));


  
    this.chart_area
      .append("g")
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom(x).ticks(6));
  
    this.chart_area.append("g").call(d3.axisLeft(y));
  
    this.chart_area
      .append("path")
      .datum(this.processed_data)
      .attr("class", "line")
      .attr("d", line);
  };
  
  function linechart(data, div, size, isCurved = false) {
    var inline_parser = function (data) {
      return data;
    };
  
    var csv_parser = function (data) {
      return data;
    };
  
    var draw = function (processed_data, div, size) {
      var glasseye_chart = new Linechart(processed_data, div, size);
  
      glasseye_chart.add_svg().add_linechart(isCurved);
    };
  
    build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
  }

  function simplot(data, div, size) {
    linechart(data, div, size, true);
  }