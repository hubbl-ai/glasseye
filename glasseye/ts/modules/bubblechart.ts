interface BubbleNode {
  name: string;
  value: number;
  children?: BubbleNode[];
}

export async function bubblechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
    if (file?.path) {
        data = await loadData(file?.path, file?.format);
      }

  // Clear existing content
  d3.select(div).selectAll("*").remove();

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height)
    .attr("viewBox", `0 0 ${size.width} ${size.height}`)
    .style("font-family", "sans-serif");

  const colorScale = d3.scaleOrdinal<string>()
    .range(colors);

  const root = d3
    .hierarchy<BubbleNode>(data)
    .sum(d => d.value)
    .sort((a, b) => b.value! - a.value!);

  const pack = d3.pack<BubbleNode>()
    .size([size.width, size.height])
    .padding(5);

  const nodes = pack(root).descendants();

  const node = svg.selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  node.append("circle")
    .attr("r", d => d.r)
    .attr("fill", (d, i) => colorScale(i.toString()))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);

  node
    .filter(d => !d.children)
    .append("text")
    .text(d => d.data.name)
    .attr("text-anchor", "middle")
    .attr("dy", "0.3em")
    .style("font-size", d => `${Math.min(2 * d.r / d.data.name.length, 12)}px`)
    .style("fill", "#fff");
}