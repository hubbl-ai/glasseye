var Skey = function (processed_data, div, size) {
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
  
    // Initialize the Skey generator
    self.sankeyGenerator = d3
      .sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [this.width - 1, this.height - 6],
      ]);
  
    // Map the data to the Skey generator
    self.sankeyData = sankeyGenerator({
      nodes: this.processed_data.nodes.map((d) => Object.assign({}, d)),
      links: this.processed_data.links.map((d) => Object.assign({}, d)),
    });
  };
  
  Skey.prototype = Object.create(GlasseyeChart.prototype);
  
  Skey.prototype.add_sankey = function () {
    // Draw the links
    this.chart_area
      .append("g")
      .attr("class", "links")
      .selectAll("path")
      .data(self.sankeyData.links)
      .enter()
      .append("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", "steelblue")
      .attr("stroke-width", (d) => Math.max(1, d["width"]))
      .attr("fill", "none")
      .attr("stroke-opacity", 0.2)
      .on("mouseover", function () {
        d3.select(this).attr("stroke-opacity", 0.5);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-opacity", 0.2);
      });
  
    // Draw the nodes
    var node = this.chart_area
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(self.sankeyData.nodes)
      .enter()
      .append("g");
  
    node
      .append("rect")
      .attr("x", (d) => d["x0"])
      .attr("y", (d) => d["y0"])
      .attr("height", (d) => d["y1"] - d["y0"])
      .attr("width", self.sankeyGenerator.nodeWidth())
      .attr("fill", "steelblue")
      .attr("stroke", "steelblue");
  
    node
      .append("text")
      .attr("x", (d) => (d["x0"] < this.width / 2 ? d["x1"] + 6 : d["x0"] - 6))
      .attr("y", (d) => (d["y1"] + d["y0"]) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d) => (d["x0"] < this.width / 2 ? "start" : "end"))
      .text((d) => d["name"]);
  };
  
  function skey(data, div, size) {
    var inline_parser = function (data) {
      return data;
    };
  
    var csv_parser = function (data) {
      return data;
    };
  
    var draw = function (processed_data, div, size) {
      var glasseye_chart = new Skey(processed_data, div, size);
  
      glasseye_chart.add_svg().add_sankey();
    };
  
    build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
  }