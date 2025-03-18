export async function chord(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  const width = size.width, height = size.height, innerRadius = Math.min(width, height) * 0.4, outerRadius = innerRadius + 20;

  const color = d3.scaleOrdinal(colors || d3.schemeCategory10);

  const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const ribbon = d3.ribbon().radius(innerRadius);

  const chords = chord(data);

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // Draw arcs
  const group = svg.append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter().append("g");

  group.append("path")
    .attr("d", arc as any)
    .style("fill", (_, i) => color(i.toString()))
    .style("stroke", "#000");

  // Draw ribbons
  svg.append("g")
    .selectAll("path")
    .data(chords)
    .enter().append("path")
    .attr("d", ribbon as any)
    .style("fill", d => color(d.source.index.toString()))
    .style("stroke", "#000");
}
