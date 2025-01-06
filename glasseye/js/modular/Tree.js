
var Tree = function (processed_data, div, size) {
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

Tree.prototype = Object.create(GlasseyeChart.prototype);

Tree.prototype.add_tree = function () {
   // Create a hierarchical layout
   const root = d3.hierarchy(this.processed_data);

   // Create a tree layout with size
   const treeLayout = d3.tree().size([this.height - this.margin.top - this.margin.bottom, this.width - this.margin.left - this.margin.right]);

   // Apply the layout to the data
   const treeData = treeLayout(root);

   // Nodes and links
   const nodes = treeData.descendants();
   const links = treeData.links();

   // Add links
   this.chart_area
   .selectAll(".link")
       .data(links)
       .enter()
       .append("path")
       .attr("class", "link")
       .attr("d", d3.linkHorizontal()
           .x(d => d.y)
           .y(d => d.x)
       );

   // Add nodes
   const node = this.chart_area.selectAll(".node")
       .data(nodes)
       .enter()
       .append("g")
       .attr("class", "node")
       .attr("transform", d => `translate(${d.y},${d.x})`);

   // Add circles to the nodes
   node.append("circle")
       .attr("r", 5);

   // Add labels to the nodes
   node.append("text")
       .attr("dy", 3)
       .attr("x", d => d.children ? -10 : 10)
       .style("text-anchor", d => d.children ? "end" : "start")
       .text(d => d.data.name);

};

function tree(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Tree(processed_data, div, size);

    glasseye_chart.add_svg().add_tree();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}