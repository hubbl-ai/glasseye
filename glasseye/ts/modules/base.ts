import * as d3 from "d3";
import {
  sankey,
  sankeyLinkHorizontal,
  SankeyGraph,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify,
} from "d3-sankey";
import { SimulationNodeDatum } from "d3";
import { Contours } from "d3-contour";

interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface DataPoint {
  x: number;
  y: number;
}

interface DataLabeled {
  label: string;
  value: number;
}

interface Size {
  width: number;
  height: number;
}

interface DataFile {
  path: string;
  format: string;
}

// DataNode is used for Venn diagrams

interface DataNode {
  name?: string;
  size?: number;
  children?: DataNode[];
}

interface ArgumentObject {
  data: any;
  div: string;
  size: Size;
  colors: string[];
  file?: DataFile;
}

interface Join extends Leaf {
  height?: number;
  children?: Join[];
}

interface Leaf {
  name?: string;
  id?: number;
  size?: number;
  score?: number;
}

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };
const defaultSize: Size = { width: 300, height: 300 };

const defaultArgumentObject: ArgumentObject = {
  data: [],
  div: "chart_",
  size: defaultSize,
  colors: ["#081F36", "#004E98", "#1D5E9F", "#C0C0C0", "#EBEBEB", "#FF6700"],
};

const formatters: { [key: string]: Function } = {
  csv: d3.csv,
  tsv: d3.tsv,
  json: d3.json,
  txt: d3.text,
  hsv: (path: string) => d3.dsv("#", path),
};

async function loadData(path: string, format: string = ""): Promise<any> {
  if (format == "") {
    format = path.split(".").slice(-1)[0];
  }
  if (!(format in formatters)) {
    console.log(`Invalid file format ${format}`);
    return [];
  }

  const data = await formatters[format](path);
  return data;
}

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

const interp_map = {
  rgb: d3.interpolateRgb,
  hsl: d3.interpolateHsl,
  hslLong: d3.interpolateHslLong,
  lab: d3.interpolateLab
};

const interp_map_list = {
  rgbBasis: d3.interpolateRgbBasis,
  rgbBasisClosed: d3.interpolateRgbBasisClosed
};


type InterpType = keyof typeof interp_map;
type InterpListType = keyof typeof interp_map_list;

function color_interp(args: any) {
  const interp_list = (args['interp'] || 'rgbBasis') as InterpListType;
  const interp = (args['interp'] || 'rgb') as InterpType;
  const gamma = args['gamma'] ?? 0;
  const colors: string[] = args['colors'] || [];
  const color_list = !(interp in interp_map);

  if (interp === 'rgb' && gamma > 0) {
    return interp_map[interp].gamma(gamma)(colors[0], colors[1]);
  }

  const rx = color_list ? interp_map_list[interp_list](colors) :interp_map[interp](colors[0], colors[1]);
  return rx;
}
