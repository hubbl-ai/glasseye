var Treemap = function (processed_data, div, size) {
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

  this.root = d3.hierarchy(processed_data).sum((d) => d.size || 0);

  // Create the treemap layout
  d3.treemap().size([this.width, this.height]).padding(1)(this.root);
};

Treemap.prototype = Object.create(GlasseyeChart.prototype);

Treemap.prototype.add_treemap = function () {
  this.nodes = this.chart_area
    .selectAll("g")
    .data(this.root.descendants())
    .join("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  this.nodes
    .append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => (d.children ? "#ccc" : "#69b3a2"))
    .attr("stroke", "#fff");

  // Add labels
  this.nodes
    .append("text")
    .attr("class", "node")
    .attr("x", 3)
    .attr("y", 13)
    .text((d) => d.data.name)
    .style("pointer-events", "none");
};

function treemap(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Treemap(processed_data, div, size);

    glasseye_chart.add_svg().add_treemap();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
