import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './index.ts',
  output: {
    file: './dist/glasseyechart.js',
    format: 'iife', 
    name: 'Glasseye',
  },
  plugins: [resolve(), typescript()]
};