var Venn = function (processed_data, div, size) {
  margin = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };

  GlasseyeChart.call(this, div, size, margin);

  this.processed_data = processed_data;

  this.venn_chart = venn.VennDiagram().width(500).height(400);
};

Venn.prototype = Object.create(GlasseyeChart.prototype);

Venn.prototype.add_venn = function () {
  this.chart_area.datum(this.processed_data).call(this.venn_chart);
  this.chart_area.selectAll(".venn-circle path").style("fill-opacity", 0.5);

  this.chart_area
    .selectAll(".venn-circle text")
    .style("font-size", "14px")
    .style("fill", "#000");
};

function venn(data, div, size) {
  var inline_parser = function (data) {
    return data;
  };

  var csv_parser = function (data) {
    return data;
  };

  var draw = function (processed_data, div, size) {
    var glasseye_chart = new Venn(processed_data, div, size);

    glasseye_chart.add_svg().add_venn();
  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
}
