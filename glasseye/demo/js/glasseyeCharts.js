// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!
// Generated Thu Jan  9 16:24:32 CAT 2025


/// GlasseyeChart.js

//Glasseye chart super class: sets up the svg and the chart area
var GlasseyeChart = function(div, size, margin, custom_height) {

  var self = this;

  self.div = div;
  self.size = size;
  self.margin = margin;
  self.custom_height = custom_height;

  //Set the size of the chart
  self.set_size();

};

GlasseyeChart.prototype.set_size = function() {

  var self = this;

  //Get dimension of the div
  var rect = d3.select(self.div).node().getBoundingClientRect();

  //Set chart dimensions according to whether the chart is placed in the margin or the main page

  if (self.margin === undefined) {
    self.margin = {
      top: 20,
      bottom: 20,
      right: 20,
      left: 20
    };
  }


  if (self.size === "full_page") {
    self.svg_width = (rect.width < 500 & rect.width > 0) ? rect.width : 500;
    self.svg_height = (self.custom_height === undefined) ? 300 : self.custom_height;
  } else if (self.size === "margin") {
    //self.svg_width = (rect.width < 300) ? rect.width : 300;
    self.svg_width = 300;
    self.svg_height = (self.custom_height === undefined) ? 250 : self.custom_height;
  } else if (self.size === "double_plot_wide") {
    self.svg_width = (rect.width < 600) ? rect.width : 600;
    self.svg_height = (self.custom_height === undefined) ? 360 : self.custom_height;
    //self.margin.bottom = 50;
  } else if (self.size === "double_plot_narrow"){
    self.svg_width = (rect.width < 300) ? rect.width : 300;
    self.svg_height = (self.custom_height === undefined) ? 360 : self.custom_height;
    //self.margin.bottom = 50;
  }
    else {
    self.svg_width = 300;
    self.svg_height = (self.custom_height === undefined) ? 360 : self.custom_height;
  }


  //Work out the dimensions of the chart
  self.width = self.svg_width - self.margin.left - self.margin.right;
  self.height = self.svg_height - self.margin.top - self.margin.bottom;

  //Define color scales



  return self;

};

GlasseyeChart.prototype.add_svg = function() {

  var self = this;

  //Add the svg to the div
  self.svg = d3.select(self.div).append("svg")
    .attr("class", "glasseye_chart")
    .attr("width", self.svg_width)
    .attr("height", self.svg_height);

  //Add the chart area to the svg
  self.chart_area = self.svg.append("g")
    .attr("class", "chart_area")
    .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

  return self;
};


/**
 * Adds a label to the TimeSeries object
 * @method
 * @param {string} title The title to be placed at the top of the chart
 * @returns {object} The modified TimeSeries object
 */

GlasseyeChart.prototype.add_title = function(title, subtitle) {

  var self = this;
  self.title = title;
  self.svg.append('text').attr("class", "title")
      .text(title)
      .attr("transform", "translate(" + self.margin.left + ",20)");

  if (subtitle != undefined) {

    self.subtitle = subtitle;
    self.svg.append('text').attr("class", "subtitle")
        .text(subtitle)
        .attr("transform", "translate(" + self.margin.left + ",35)");

  }

  return self;

};


GlasseyeChart.prototype.set_tooltip_text = function (commentary_strings, variable_names, formats) {

  var self = this;

  self.tooltip_text = function (d) {
    var embedded_vars = variable_names.map(function(e){
      return (e==="filter")? self.current_variable : d[e];
    })
    var text = create_commentary(commentary_strings, embedded_vars, formats)
    return text;
  }

  self.tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(self.tooltip_text);

  return self;

}

/// GlobalFunctionsAndVariable.js

//Global formatting functions

//Add span around text for highlighting
function highlight(d){
  return   "<span class = 'highlighted'>" + d + "</span>";
};

//Get max string length in an array of strings

function max_string_length(strings){

  var lengths = strings.map(function(d){return d.length})

  return Math.max.apply(null, lengths);

}


var uni_format = function(d){
  var return_val;

  if (d > 999) {
    return_val = d3.format(".3s")(d);
  }
  else if (d > 100) {
    return_val = d3.format(".3r")(d);
  }
  else if (d >= 10) {
    if (Math.round(d) === d) {
      return_val = d3.format(".0f")(d);
    }
    else {
      return_val = d3.format(".1f")(d);
    }
  }
  else if (d > 1) {
    return_val = d3.format(".1f")(d);
  }
  else
  {
    return_val = d3.format(".1f")(d);
  }
  return return_val;

};


var uni_format_range = function(d){

  var min = d[0], max = d[1];
  console.log(min);
  console.log(max);

  if (min > - 1000 & max < 1000) {return d3.format(",.0f");}
  else {return d3.format(",.0f");}

}


var uni_format_axis = function(d){
  var return_val;
  if (d >= 1) {
    return_val = d3.format("s")(d);
  }
  else
  {
    return_val = d3.format("")(d);
  }
  return return_val;

};

var format_millions = function(d) {
  return Math.round(d / 1000) + "m";
};

var format_millions_2d = function(d) {
  return d3.format(".3r")(d / 1000) + "m";
};


var quarter_year = function(d) {

  var month = d3.time.format("%m")(d);
  var year = d3.time.format("%Y")(d);
  var quarter = parseInt(month) / 3;

  return "Q" + quarter + " " + year;

};


//Commentary function to be used in tool tips and on side bars

function cap_first_letter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lower_case(string) {
  return string.toLowerCase();
}

function unchanged(string) {
  return string;
}

function create_commentary(commentary_strings, embedded_vars, formats){


  var string_parts = commentary_strings.split("$");

  var text = "";

  embedded_vars.forEach(function(d, i){
    var formatter = (formats===undefined)? uni_format:formats[i];
    text = text + string_parts[i] + formatter(d);
  });

  return text;

}


function create_scale(data, d3_scale, padding) {

  var min = d3.min(data),
    max = d3.max(data);
  var range = max - min;
  var range_max_ratio = range / max;

  var scale = d3_scale;

  if (typeof d3_scale.rangePoints === "function") {
    scale.domain(data);
    var scale_type = "ordinal";
  } else {

    if (typeof data[0] === "number") {

      if (range_max_ratio < 0.25 || min < 0) {
        scale.domain([min - 0.1 * range, max + 0.1 * range]).nice;
      } else {
        scale.domain([0, max + 0.1 * range]).nice;
      }

      var scale_type = "linear";

    } else {

      scale.domain([min, max]).nice;

      if (data[0].constructor.name === "Date") {
        var scale_type = "datetime";
      } else {
        var scale_type = "nonlinear";
      }
    }

  }



  return {
    scale_func: scale,
    scale_type: scale_type
  };

}

//Data processing function

function build_chart(data, div, size, labels, csv_parser, inline_parser, draw) {


  if (typeof data === "object")

  {

    var processed_data = inline_parser(data);

    draw(processed_data, div, size, labels);

  } else

  {


    d3.csv(data, function(error, data) {

      var processed_data = csv_parser(data);
      draw(processed_data, div, size, labels);

    });

  }

}


function add_legend(svg, x, y, legend_data) {

  var legend_groups = svg.selectAll('.legend_item')
    .data(legend_data)
    .enter()
    .append('g')
    .attr('class', 'legend_item')
    .attr("transform", "translate(" + x + "," + y + ")");


  legend_groups.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr('class', function(d) {
      return ('legend_block ' + d.class);
    })
    .attr("x", 10)
    .attr("y", function(d, i) {
      return i * 20;
    })
    .attr("fill", function(d, i) {
      return d.colour;
    });

  legend_groups.append("text")
    .attr("x", 27)
    .attr("y", function(d, i) {
      return 8 + i * 20;
    })
    .text(function(d) {
      return d.label;
    });

}


function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}


function abbrev(text, max) {

  if (text.length > max) {
    text = text.substring(0, max - 3) + "...";
  }

  return text;

}

function minmax_across_groups(processed_data, variable) {

  y_values = processed_data.map(function(d) {
    return (d.values.map(function(e) {
      if (e.variable === variable) {
        return e.value;
      }
    }));
  });
  y_values = [].concat.apply([], y_values);

  return ([d3.min(y_values), d3.max(y_values)]);

}

function create_class_label(prefix, x){

  return prefix + "_" + x.replace(/[.,\/#!$%\^&\*;:{}=+\-_`~()]/g,"").replace(" ","");

}
/// GridChart.js

var GridChart = function (div, size, labels, scales, margin, height) {

    var self = this;
    self.scales = scales;
    self.labels = labels;

    GlasseyeChart.call(self, div, size, margin, height);

    if (scales[0].scale_type === "ordinal") {
        self.x = self.scales[0].scale_func.rangePoints([0, self.width], 1);
    } else {
        self.x = self.scales[0].scale_func.range([0, self.width]);
    }

    if (scales[1].scale_type === "ordinal") {
        self.y = self.scales[1].scale_func.rangePoints([self.height, 0], 1);
    } else {
        self.y = self.scales[1].scale_func.range([self.height, 0]);
    }


    self.x_axis = d3.svg.axis()
        .scale(self.x)
        .orient("bottom")
        .tickSize(-self.height, 0, 0)
        .tickPadding(10);

    self.y_axis = d3.svg.axis()
        .scale(self.y)
        .orient("left")
        .tickSize(-self.width, 0, 0);

    //If the scale is not ordinal apply the universal format
    if (scales[1].scale_type != "ordinal") {self.y_axis .tickFormat(uni_format_axis)};

    self.tooltip_formtter = uni_format;

};

GridChart.prototype = Object.create(GlasseyeChart.prototype);

GridChart.prototype.set_y_axis_format = function (format) {

    var self = this;

    self.y_axis.tickFormat(format);
    self.tooltip_formtter = format;
    return self;

}



GridChart.prototype.add_grid = function () {

    var self = this;

    var x_axis_g = self.chart_area.append("g")
        .attr("class", "chart_grid x_axis")
        .attr("transform", "translate(0," + self.height + ")")
        .call(self.x_axis);

    if (self.scales[0].scale_type === "nonlinear") {
        x_axis_g.selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-90)");
    }

    self.chart_area.append("g")
        .attr("class", "chart_grid y_axis")
        .call(self.y_axis);

    //Add labels if they have been provided

    if (typeof self.labels !== "undefined") {
        self.svg.append("g")
            .attr("class", "axis_label axis_label_x")
            .attr("transform", "translate(" + (self.margin.left + self.width + 15) + ", " + (self.height + self.margin.top) + ") rotate(-90)")
            .append("text")
            .text(self.labels[0]);

        self.svg.append("g")
            .attr("class", "axis_label axis_label_y")
            .attr("transform", "translate(" + self.margin.left + ", " + (self.margin.top - 8) + ")")
            .append("text")
            .text(self.labels[1]);
    }

    return self;

};

/// NonStandard.js

function treemap(data, div, size) {

  var inline_parser = function(data) {
    return data;
  }

  var csv_parser = function(data) {
    //Needs to be written
  }

  var draw = function(processed_data, div, size) {

    var w = 300,
      h = 400,
      x = d3.scale.linear().range([0, w]),
      y = d3.scale.linear().range([0, h]),
      color = d3.scale.category20c(),
      root,
      node;

    var treemap = d3.layout.treemap()
      .round(false)
      .size([w, h])
      .sticky(true)
      .value(function(d) {
        return d.size;
      });

    var svg = d3.select(div)
      .append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(.5,.5)");

    var node = root = data;

    var nodes = treemap.nodes(root)
      .filter(function(d) {
        return !d.children;
      });

    var cell = svg.selectAll("g")
      .data(nodes)
      .enter().append("svg:g")
      .attr("class", "cell")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .on("click", function(d) {
        return zoom(node == d.parent ? root : d.parent);
      });


    cell.append("svg:rect")
      .attr("width", function(d) {
        return d.dx - 1;
      })
      .attr("height", function(d) {
        return d.dy - 1;
      })
      .style("fill", function(d) {
        return color(d.parent.name);
      });

    cell.append("svg:text")
      .attr("x", function(d) {
        return d.dx / 2;
      })
      .attr("y", function(d) {
        return d.dy / 2;
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.name;
      });
      //.style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; })
      //.call(wrap, 80);


    d3.select(window).on("click", function() {
      zoom(root);
    });

    d3.select("select").on("change", function() {
      treemap.value(this.value == "size" ? size : count).nodes(root);
      zoom(node);
    });

    function size(d) {
      return d.size;
    }

    function count(d) {
      return 1;
    }

    function zoom(d) {
      var kx = w / d.dx,
        ky = h / d.dy;
      x.domain([d.x, d.x + d.dx]);
      y.domain([d.y, d.y + d.dy]);

      var t = svg.selectAll("g.cell").transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) {
          return "translate(" + x(d.x) + "," + y(d.y) + ")";
        });

      t.select("rect")
        .attr("width", function(d) {
          return kx * d.dx - 1;
        })
        .attr("height", function(d) {
          return ky * d.dy - 1;
        })

      t.select("text")
        .attr("x", function(d) {
          return kx * d.dx / 2;
        })
        .attr("y", function(d) {
          return ky * d.dy / 2;
        });
      //.style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

      node = d;
      d3.event.stopPropagation();
    }

  }

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);

}


function simplot(data, div, size) {

  var inline_parser = function(data) {
    //To be written
  }

  var csv_parser = function(data) {

    //Read in the different varaiations and simulations
    var variations = [];
    data.map(function(d) {
      if (variations.indexOf(d.variation) === -1) {
        variations.push(d.variation)
      }
    });

    var simulations = [];
    data.map(function(d) {
      if (simulations.indexOf(d.sim_num) === -1) {
        simulations.push(d.sim_num)
      }
    });

    //Create the json data from the csv data
    var processed_data = variations.map(function(v) {

      return {
        variation: v,
        simulations: simulations.map(function(s) {
          return {
            simulation: +s,
            values: data.filter(function(d) {
              return d.variation === v && d.sim_num === s
            }).map(function(e) {
              return {
                value: +e.value,
                iter: +e.day
              }
            })
          }
        })
      }

    });

    var comp_data = {
      original_data: data,
      grouped_data: processed_data,
      variations: variations,
      simulations: simulations
    };

    return comp_data;

  }

  var draw = function(processed_data, div, size) {

    var glasseye_chart = new GlasseyeChart(div, size, {
      top: 20,
      bottom: 20,
      right: 100,
      left: 20
    });
    glasseye_chart.add_svg();

    var color = d3.scale.category20();

    //Set up the scales
    var x = d3.scale.linear()
      .range([0, glasseye_chart.width])
      .domain([d3.min(processed_data.original_data, function(d) {
        return +d["day"]
      }) - 10, d3.max(processed_data.original_data, function(d) {
        return +d["day"]
      })]);

    var y = d3.scale.linear()
      .range([glasseye_chart.height, 0])
      .domain([d3.min(processed_data.original_data, function(d) {
        return +d['value']
      }), d3.max(processed_data.original_data, function(d) {
        return +d['value']
      })]);

    //Set up the axes
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-glasseye_chart.height, 0, 0);

    var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(-glasseye_chart.width, 0, 0)
      .orient("left");

    var svg = glasseye_chart.chart_area;

    //Add the axes
    svg.append("g")
      .attr("class", "chart_grid")
      .attr("transform", "translate(0," + glasseye_chart.height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "chart_grid")
      .call(yAxis);

    //Create a path function
    var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) {
        return x(d.iter);
      })
      .y(function(d) {
        return y(d.value);
      });

    //var totalLength = width + 200; //At some point base this on path length

    //Add the simulation paths for each variation

    processed_data.grouped_data.forEach(function(v, j) {

      var path = svg.selectAll(".variations")
        .data(v.simulations)
        .enter()
        .append("g")
        .append("path")
        .attr("class", "line")
        .attr("d", function(d) {
          return line(d.values);
        })
        .style("stroke", function(d) {
          return color(v.variation);
        })
        .attr("opacity", function(d) {
          if (d.simulation === -1) {
            return 1
          } else {
            return 0.1
          }
        });


      path.each(function(d) {
          d.totalLength = this.getTotalLength();
        })
        .attr("stroke-dasharray", function(d) {
          return d.totalLength + " " + d.totalLength;
        })
        .attr("stroke-dashoffset", function(d) {
          return d.totalLength;
        })
        .transition()
        .delay(j * 7000)
        .duration(7000)
        .ease("linear")
        .attr("stroke-dashoffset", 0)
        .transition()
        .duration((processed_data.variations.length - 1 - j) * 7000)
        .attr("stroke-dashoffset", 0)
        .each("end", repeat);


      function repeat() {
        var path = d3.select(this);
        path.attr("stroke-dasharray", function(d) {
            return d.totalLength + " " + d.totalLength;
          })
          .attr("stroke-dashoffset", function(d) {
            return d.totalLength;
          })
          .transition()
          .delay(j * 7000)
          .duration(7000)
          .ease("linear")
          .attr("stroke-dashoffset", 0)
          .transition()
          .duration((processed_data.variations.length - 1 - j) * 7000)
          .attr("stroke-dashoffset", 0)
          .each("end", repeat);
      }


    });


    if (processed_data.variations.length > 1) {

      add_legend(svg, glasseye_chart.width + glasseye_chart.margin.left, glasseye_chart.margin.top, processed_data.variations.map(function(v) {
        return {
          "label": v,
          "colour": color(v)
        }
      }));
    }
  }

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);

}

function dot_plot(file, div, size) {

  //Set up the layout variables

  var svg_width = 650,
    svg_height = 400;

  var margin = {
      top: 20,
      right: 250,
      bottom: 110,
      left: 30
    },
    width = svg_width - margin.left - margin.right,
    height = svg_height - margin.top - margin.bottom;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d.value;
    })


  d3.csv(file, function(error, data) {


    //Set up color scales
    var color = d3.scale.category10()

    //Read in the different varaiations and simulations
    var groups = [];
    data.map(function(d) {
      if (groups.indexOf(d.group) === -1) {
        groups.push(d.group)
      }
    });


    //Read in the different varaiations and simulations
    var variables = [];
    data.map(function(d) {
      if (variables.indexOf(d.variable) === -1) {
        variables.push(d.variable)
      }
    });


    //Create the json data from the csv data
    var processed_data = groups.map(function(g) {

      return {
        group: g,
        values: data.filter(function(d) {
          return d.group === g
        }).map(function(e) {
          return {
            value: +e.value,
            variable: e.variable
          }
        })
      }
    });


    //This where we add the ordinal scales

    var min_y = d3.min(data, function(d) {
        return +d['value']
      }),
      max_y = d3.max(data, function(d) {
        return +d['value']
      }),
      range_y = max_y - min_y;

    //Work out the ratio of the range of y to max_y

    var range_max_ratio = range_y / max_y;

    var y = d3.scale.linear()
      .range([height, 0]);

    if (range_max_ratio < 0.3) {
      y.domain([min_y - 0.1 * range_y, max_y + 0.1 * range_y]).nice;
    } else {
      y.domain([0, max_y]).nice;
    }


    //Set up the scales
    var x = d3.scale.ordinal()
      .rangePoints([0, width], 1)
      .domain(variables);

    //Set up the axes
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height, 0, 0)
      .tickFormat(function(d) {
        if (d.length > 15) {
          return d.substring(0, 15) + "..";
        } else {
          return d;
        }
      });

    var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(-width, 0, 0)
      .orient("left");

    //Add the svg
    var svg = d3.select(div).append("svg")
      .attr("width", svg_width)
      .attr("height", svg_height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    //Add the axes
    svg.append("g")
      .attr("class", "chart_grid")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)");

    svg.append("g")
      .attr("class", "chart_grid")
      .call(yAxis);


    //Add the simulation paths for each variation
    processed_data.forEach(function(v, j) {


      svg.selectAll(".dot")
        .data(v.values)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return x(d.variable)
        })
        .attr("cy", function(d) {
          return y(d.value)
        })
        .attr("r", 6)
        .attr("fill", function(d) {
          return color(v.group)
        })
        .attr("opacity", 0.5)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);



    });

    if (groups.length > 1) {
      add_legend(svg, width + margin.left, margin.top, groups.map(function(v) {
        return {
          "label": v,
          "colour": color(v)
        }
      }));
    }
  });

  //Put

  //ordinal.rangePoints(interval[, padding])

}

/// Tree.js


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
/// Venn.js

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

function vennchart(data, div, size) {
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

/// Dial.js

var Dial = function(processed_data, div, size, scales) {

  //Store arguments
  this.processed_data = processed_data;

  //Default parameters
  var pct_of_width = 0.55;

  //Inherit any attributes or functions of a parent class
  GlasseyeChart.call(this, div, size);

  //Any overides of parent attributes

  //Derive further attributes
  var dial_domain = scales[0].scale_func.domain();
  this.dial_radius = pct_of_width * this.width / 2;

  //Create functions or closures to be used in methods
  this.dial_scale = scales[0].scale_func.range([0, 359]);

  //Temp overide of range
  this.dial_scale.domain([-0.3, 0.1]).clamp(true);

  this.current_angle = this.dial_scale(-0.123);

  //Create the dial face data

  var angles = d3.range(0, 360, 30);

  var local_scale = this.dial_scale;

  this.dial_face_data = angles.map(function(d) {
    return {
      angle: d,
      value: local_scale.invert((d+180) % 360)
    };
  });

};

//Methods for the class. This is where svgs are created

//Inherit methods from parent
Dial.prototype = Object.create(GlasseyeChart.prototype);

//Method for adding svgs
Dial.prototype.add_dial = function() {

  //Store this locally so that it can reference in further functions
  var self = this;

  //Draw the chart
  var face = self.chart_area.append("g")
    .attr("transform", "translate(" + (self.width / 2) + ", " + (self.height / 2.5) + ")");

  face.append("svg").attr("width", self.dial_radius).attr("height", self.dial_radius).append("circle").attr("r", self.dial_radius).style("fill", "#990000");

  face.append("circle")
    .attr("class", "dial_face")
    .attr("r", self.dial_radius);

  face.append("circle")
      .attr("class", "dial_seg")
      .attr("r", self.dial_radius * 0.4)
      .attr("fill", "black");

  face.append("circle")
    .attr("class", "dial_centre")
    .attr("r", self.dial_radius * 0.05);

  function rotate_tween() {
    var i = d3.interpolate(0, self.current_angle);
    return function(t) {
      return "rotate(" + i(t) + ")";
    };
  }

  face.append("line")
    .attr("class", "dial_hand")
    .attr("x2", self.dial_radius * 0.7)
    .transition()
    .duration(this.current_angle / 360 * 5000)
    .attrTween("transform", rotate_tween);

  //Add ticks
  var dial_ticks = face.selectAll(".dial_ticks")
    .data(self.dial_face_data)
    .enter().append("g")
    .attr("transform", function(d) {
      return "rotate(" + d.angle + ") translate(" + -self.dial_radius + ", 0) ";
    });

  dial_ticks.append("line")
    .attr("x2", 7);

  dial_ticks.append("text")
  .style("text-anchor", "middle")
  .attr("class", "dial_tick_labels")
    .attr("dy", ".35em")
    .attr("transform", function(d) {
      return d.angle < 270 && d.angle > 90 ? "translate(20,0) rotate(-90) " : "translate(20,0) rotate(-90) ";
    })
    .text(function(d) {
      return d3.format(",.0f")(d.value*100);
    });

  //Add the counter

  self.chart_area.append("text")
  .attr("class", "dial_counter")
  .attr("transform", "translate(250," + (self.height / 2.5 +7) + ")")
  .text("")
  .style("text-anchor", "end")
  .transition()
  .delay(this.current_angle / 360 * 5000)
  .text("0%");


  //Return the object so that we can use chaining
  return self;

};


//Method for updating svgs
Dial.prototype.update_dial = function(group, variable) {

  //Store this locally so that it can reference in further functions
  var self = this;

  //If necessary filter the data
  var filtered_data = self.processed_data.filter(function(d) {
      return d.group === group;
    })[0].values
    .filter(function(e) {
      return e.variable === variable;
    })[0];

  //Update the chart
  var angle = self.dial_scale(filtered_data.value);
  var local_angle = self.current_angle;

  function rotate_tween() {
    var i = d3.interpolate(local_angle, angle);
    return function(t) {
      return "rotate(" + i(t) + ")";
    };
  }

  self.chart_area.selectAll(".dial_hand")
    .transition()
    .duration(1000)
    .attrTween("transform", rotate_tween);

  //Update the counter

  self.chart_area.selectAll(".dial_counter")
  .transition()
  .delay(1000)
  .text(d3.format("%")(filtered_data.value));

  //Return the object so that we can use chaining
  self.current_angle = angle;
  return self;

};


Dial.prototype.add_title = function(title) {

  var self = this;
  self.svg.append('text').attr("class", "title")
    .text(title)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + (self.margin.left + self.width/2) + ",20)");

  return this;

};


Dial.prototype.add_subtitle = function(subtitle) {

  var self = this;
  self.svg.append('text').attr("class", "subtitle")
    .text(subtitle)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + (self.margin.left + self.width/2) + ",40)");

  return this;

};

//wrapper function to process the data and draw the chart

/*

function x_chart(data, div, size) {

  //Define data parsers
  var inline_parser = function(data) {

    return processed_data;

  };

  var csv_parser = function(data) {

    return processed_data;

  };

  //Create draw function
  var draw = function(processed_data, div, size) {

    //Calculate values for scales

    //Create scales

    //Create new chart and chain methods

    var glasseye_chart = new XChart(processed_data, div, size);

    glasseye_chart.add_svg();

  };

  //Function that builds the chart based on whether the data is inline or from a file
  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);

}
*/

/// LogReg.js

//A template for glasseye charts

/*
The chart object class.
Contains functions (including closures) and variables that describe the chart in the abstract.
No svg elements are created here.
Even where the chart can be implemented almost entirely by a closure, the closure is constructed
in the object and then executed (and modified) in the methods. This way we have framework that is flexible
enough fpr both techniques.
*/

var LogisticCurve = function(formula) {

  //Store arguments
  this.formula = formula.replace(/ /g, '');

  //Parse the formula
  var right_left = this.formula.split("=");

  var response = right_left[0];
  var explanatory = right_left[1].split("+");

  var parsed_formula = {
    response: response,
    explanatory: explanatory.map(function(d) {
      var coef_split = d.split("*");
      var coef = parseFloat(coef_split[0]);
      var range_split = coef_split[1].split("[");
      var variable = range_split[0];
      var variable_range = range_split[1].slice(0, -1).split(",").map(function(d){return parseFloat(d);});
      return {
        coef: coef,
        variable: variable,
        variable_range: variable_range
      };
    })
  };

  console.log(parsed_formula);

  //Logistic Function
  function logistic(linear_pred) {

    return linear_pred;

  }

  //Default parameters

  //Inherit any attributes or functions of a parent class
  //GlasseyeChart.call(this, x, y);

  //Any overides of parent attributes

  //Derive further attributes

  //Create functions or closures to be used in methods

  //Function to create logistic curve

  var line = d3.svg.line()
    .x(function(d) {
      return d.x;
    })
    .y(function(d) {
      return d.y;
    })
    .interpolate("basis");

};

//Methods for the class. This is where svgs are created

/*
//Inherit methods from parent
XChart.prototype = Object.create(YParent.prototype);

//Method for adding svgs
XChart.prototype.add_svg = function() {

  //Store this locally so that it can reference in further functions
  var self = this;

  //If necessary filter the data
  var filtered_data = function(){};

  //Draw the chart

  //Return the object so that we can use chaining
  return self;

};


//Method for updating svgs
XChart.prototype.update_svg = function() {

  //Store this locally so that it can reference in further functions
  var self = this;

  //If necessary filter the data
  var filtered_data = function(){};

  //Update the chart

  //Return the object so that we can use chaining
  return self;

};


//wrapper function to process the data and draw the chart

//

function x_chart(data, div, size) {

  //Define data parsers
  var inline_parser = function(data) {

    return processed_data;

  };

  var csv_parser = function(data) {

    return processed_data;

  };

  //Create draw function
  var draw = function(processed_data, div, size) {

    //Calculate values for scales

    //Create scales

    //Create new chart and chain methods

    var glasseye_chart = new XChart(processed_data, div, size);

    glasseye_chart.add_svg();

  };

  //Function that builds the chart based on whether the data is inline or from a file
  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);

}
*/

/// RandomNumber.js

function random_gamma(alpha, beta){

    //Create d3 random number generator functions

    var random_normal = d3.random.normal()

    var d = alpha - 1/3;
    var c = 1/Math.sqrt(9*d);

    var closure = function() {

        while (!(con_1 & con_2)) {

            var z = random_normal();
            var u = Math.random();
            var v = Math.pow(1 + c * z, 3);

            //Conditions

            var con_1 = z > -1 / c;
            var con_2 = Math.log(u) < (0.5 * Math.pow(z, 2) + d - d * v + d * Math.log(v));
        }

        return (d * v) / beta;

    }

    return closure;
}


function random_dirichlet(alphas){

    //Create gamma distributions

    var gammas = alphas.map(function(d){
        return random_gamma(d,1);
    })

    var closure = function() {

        var k = gammas.map(function(g) {
            return g();
        });

        var k_sum  =  d3.sum(k);

        var x = k.map(function(d) {return d/k_sum;})


    return x;

    }

    return closure;

}
/// AnimatedDensity.js

/**
 * Builds a AnimatedDensity object
 * @constructor
 * @param {array} processed_data Data that has been given a structure appropriate to the chart
 * @param {string} div The div in which the chart will be placed
 * @param {string} size The size (one of several preset sizes)
 * @param {array} [labels] An array of the axis labels
 * @param {array} scales Scales for the x and y axes
 * @param {object} [margin] Optional argument in case the default margin settings need to be overridden
 */

var AnimatedDensity = function (processed_data, div, size, labels, scales, margin) {

    var self = this;

    self.processed_data = processed_data;


    GridChart.call(self, div, size, labels, scales, margin);

};

AnimatedDensity.prototype = Object.create(GridChart.prototype);


/**
 * Adds the SVGs corresponding to the AnimatedDensity object
 *
 * @method
 * @returns {object} The modified AnimatedDensity object
 */

AnimatedDensity.prototype.add_density = function () {

    var self = this;

    /*self.chart_area.selectAll("rect").data(self.processed_data)
        .enter()
        .append("rect").attr("class", "block").attr("width", self.width / (10 * self.x.domain()[1])).attr("height", self.height / (self.y.domain()[1])).attr("x", function (d) {
        return self.x(d.value)
    }).attr("y", 0).attr("opacity", 0).transition()
        .duration(2500)
        .delay(function (d, i) {
            return i * 40;
        })
        .attr("y", function (d) {
            return self.height - d.position * self.height / (self.y.domain()[1]);
        })
        .attr("opacity", 1);
        */

     var radius = d3.max([self.width / (10 * self.x.domain()[1]), self.height / (self.y.domain()[1])]) + 2;

     self.chart_area.selectAll("rect").data(self.processed_data)
     .enter()
     .append("circle").attr("class", "block").attr("r", radius).attr("cx", function (d) {
     return self.x(d.value)
     }).attr("cy", 0).attr("opacity", 0).transition()
     .duration(2500)
     .delay(function (d, i) {
     return i * 40;
     })
     .attr("cy", function (d) {
     return self.height - d.position * self.height / (self.y.domain()[1]);
     })
     .attr("opacity", 1);

};


/**
 * Creates a animated density chart within a div
 *
 * @param {array} data Either the path to a csv file or inline data in glasseye
 * @param {string} div The div in which the chart will be placed
 * @param {string} size The size (one of several preset sizes)
 * @param {array} labels An array containing the labels of the x and y axes
 */


function animated_density(div, size) {

    var processed_data = []
    var cl = random_gamma(5, 1);
    for (i = 0; i < 5000; i++) {
        processed_data.push(cl());
    }

    processed_data = processed_data.map(function (d) {
        return Math.round(d * 10) / 10;
    })


    var density_array = Array.apply(null, Array(500)).map(Number.prototype.valueOf, 0);

    processed_data = processed_data.map(function (d) {
        density_array[d * 10] = density_array[d * 10] + 1;
        return {
            value: d,
            position: density_array[d * 10]
        };

    });


    var draw = function (processed_data, div, size) {

        var x_vals = processed_data.map(function (d) {
            return d.value
        });
        var y_vals = processed_data.map(function (d) {
            return d.position
        });

        var scales = [create_scale(d3.extent(x_vals), d3.scale.linear()), create_scale([0, d3.max(y_vals) + 5], d3.scale.linear())];

        var glasseye_chart = new AnimatedDensity(processed_data, div, size, ["Random Variable with Gamma Distribution", "Occurrences"], scales);

        glasseye_chart.add_svg().add_grid().add_density();


    };

    draw(processed_data, div, size);


}

/// PolygonMap.js

/**
 * Builds an PolygonMap object
 * @constructor
 * @param {array} processed_data Data that has been given a structure appropriate to the chart
 * @param {string} div The div in which the chart will be placed
 * @param {string} size The size (one of several preset sizes)
 */

var PolygonMap = function (processed_data, div, size, tooltip_function) {

    var self = this;

    margin = {
        top: 5,
        bottom: 0,
        left: 5,
        right: 5
    };

    GlasseyeChart.call(self, div, size, margin, 700);

    self.processed_data = processed_data;

    self.tooltip_function = tooltip_function;

    self.projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(self.width*300/46)
        .translate([self.width / 2, self.height / 2.4]);

    self.path = d3.geo.path()
        .projection(self.projection);

    self.tip = d3.select(self.div).append('div')
        .attr('class', 'hidden tooltip');


};

PolygonMap.prototype = Object.create(GlasseyeChart.prototype);

/**
 * Adds the SVGs corresponding to the PolygonMap object
 *
 * @method
 * @returns {object} The modified PolygonMap object
 */

PolygonMap.prototype.add_map = function () {

    var self = this;

    self.chart_area.selectAll(".map_region")
        .data(self.processed_data)
        .enter().append("path")
        .attr("class", function (d) {
            return "map_region " + d.properties["name"].split(' ').join('_');
        })
        .attr("d", self.path)
        .on('mouseenter', function (d) {
            self.tooltip_function(d.properties["name"]);
            var mouse = d3.mouse(self.chart_area.node()).map(function (d) {
                return parseInt(d);
            });
            self.tip.classed('hidden', false)
                .attr('style', 'left:' + (mouse[0]) +
                    'px; top:' + (mouse[1] - 0) + 'px')
                .html(d.properties["name"]);
        })
        .on('mouseleave', function () {
            self.tip.classed('hidden', true)
        });

    return this;

};


/**
 * Redraws the PolygonMap (for example after a resize of the div)
 * @method
 * @returns {object} The modified PolygonMap object
 */

PolygonMap.prototype.redraw_map = function (title) {

    var self = this;

    //Delete the existing svg and commentary
    d3.select(self.div).selectAll("svg").remove();

    //Reset the size
    self.set_size();

    self.projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(self.width*300/46)
        .translate([self.width / 2, self.height / 2.4]);

    self.path = d3.geo.path()
        .projection(self.projection);

    //Redraw the chart
    self = self.add_svg().add_map().add_title(self.title, self.subtitle);

    return self;

};

/// Skey.js

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
/// BarChart.js

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
/// Pie.js

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
/// Linechart.js


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
  
  Linechart.prototype.add_linechart = function () {
    x = d3
      .scaleLinear()
      .domain([d3.min(this.processed_data, (d) => d.x), d3.max(this.processed_data, (d) => d.x)])
      .range([0, this.width]);
  
    y = d3
      .scaleLinear()
      .domain([0, d3.max(this.processed_data, (d) => d.y)])
      .range([this.height, 0]);
  
    line = d3
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
  
  function linechart(data, div, size) {
    var inline_parser = function (data) {
      return data;
    };
  
    var csv_parser = function (data) {
      return data;
    };
  
    var draw = function (processed_data, div, size) {
      var glasseye_chart = new Linechart(processed_data, div, size);
  
      glasseye_chart.add_svg().add_linechart();
    };
  
    build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);
  }
/// Force.js

var Force = function(processed_data, div, size) {

  var margin = (size === "full_page") ? {
    top: 5,
    bottom: 5,
    left: 100,
    right: 100
  } : {
    top: 5,
    bottom: 5,
    left: 50,
    right: 50
  };

  GlasseyeChart.call(this, div, size, margin, 300);

  this.processed_data = processed_data;

  //Set up the force layout
  this.force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([this.width, this.height]);

  this.tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d.name;
    });

};


Force.prototype = Object.create(GlasseyeChart.prototype);

Force.prototype.add_force = function() {

  var color = d3.scale.category20();

  this.chart_area.call(this.tip);

  //Creates the graph data structure out of the json data
  this.force.nodes(this.processed_data.nodes)
    .links(this.processed_data.links)
    .start();

  //Create all the line svgs but without locations yet
  var link = this.chart_area.selectAll(".forcelink")
    .data(this.processed_data.links)
    .enter().append("line")
    .attr("class", "forcelink")
    .style("stroke-width", function(d) {
      return Math.sqrt(d.value);
    });

  //Do the same with the circles for the nodes - no
  var node = this.chart_area.selectAll(".forcenode")
    .data(this.processed_data.nodes)
    .enter().append("circle")
    .attr("class", "forcenode")
    .attr("r", 8)
    .style("fill", function(d) {
      return color(d.group);
    })
    .call(this.force.drag)
    .on('mouseover', this.tip.show)
    .on('mouseout', this.tip.hide);

  //Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
  this.force.on("tick", function() {
    link.attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node.attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  });

};

function force(data, div, size) {

  var inline_parser = function(data) {
    return data;
  };

  var csv_parser = function(data) {
    return data;
  };

  var draw = function(processed_data, div, size) {

    var glasseye_chart = new Force(processed_data, div, size);

    glasseye_chart.add_svg().add_force();

  };

  build_chart(data, div, size, undefined, csv_parser, inline_parser, draw);


}
