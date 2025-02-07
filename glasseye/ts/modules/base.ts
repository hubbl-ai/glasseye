import * as d3 from "d3";

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

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };