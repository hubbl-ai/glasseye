import * as d3 from 'd3';

// Interface for margin definition
interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export class GlasseyeChart {
  div: string;
  size: string;
  margin: Margin;
  customHeight: number | undefined;
  svgWidth = 0;
  svgHeight= 0;
  width= 0;
  height= 0;
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined;
  chartArea: d3.Selection<SVGGElement, unknown, HTMLElement, any> | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  tooltipText: ((d: any) => string) | undefined;

  constructor(div: string, size: string, margin: Margin, customHeight?: number) {
    this.div = div;
    this.size = size;
    this.margin = margin || { top: 20, bottom: 20, left: 20, right: 20 };
    this.customHeight = customHeight;
    this.setSize();
  }

  setSize(): void {
    const rect = (d3.select(this.div).node() as HTMLElement)?.getBoundingClientRect() || { width: 0 };

    const fullPageWidth = 500;
    const marginWidthHeight = 300;
    const doublePlotWidth = 600;
    const minHeight = 500;

    if (this.size === "full_page") {
      this.svgWidth = Math.min(rect.width, fullPageWidth) || fullPageWidth;
      this.svgHeight = this.customHeight || minHeight;
    } else if (this.size === "margin") {
      this.svgWidth = marginWidthHeight;
      this.svgHeight = this.customHeight || marginWidthHeight;
    } else if (this.size === "double_plot_wide") {
      this.svgWidth = Math.min(rect.width, doublePlotWidth);
      this.svgHeight = this.customHeight || minHeight;
    } else if (this.size === "double_plot_narrow") {
      this.svgWidth = Math.min(rect.width, marginWidthHeight);
      this.svgHeight = this.customHeight || minHeight;
    } else {
      this.svgWidth = marginWidthHeight;
      this.svgHeight = this.customHeight || minHeight;
    }

    this.width = this.svgWidth - this.margin.left - this.margin.right;
    this.height = this.svgHeight - this.margin.top - this.margin.bottom;
  }

  addSvg(x?: number, y?: number): this {
    x = x ?? this.margin.left;
    y = y ?? this.margin.top;

    this.svg = d3
      .select(this.div)
      .append("svg")
      .attr("class", "glasseye_chart")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    const scaleFactor = 0.9;

    this.chartArea = this.svg
      .append("g")
      .attr("class", "chart_area")
      .attr("transform", `translate(${x},${y}) scale(${scaleFactor})`);

    return this;
  }

  addTitle(title: string, subtitle?: string): this {
    this.title = title;

    if (this.svg) {
      this.svg
        .append("text")
        .attr("class", "title")
        .text(title)
        .attr("transform", `translate(${this.margin.left}, 20)`);

      if (subtitle) {
        this.subtitle = subtitle;
        this.svg
          .append("text")
          .attr("class", "subtitle")
          .text(subtitle)
          .attr("transform", `translate(${this.margin.left}, 35)`);
      }
    }

    return this;
  }
}

