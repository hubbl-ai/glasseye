import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './index.ts',
  output: {
    file: '../../../demo/js/glasseyechart.js',
    // file: './dist/glasseyechart.js',
    format: 'iife', 
    name: 'ChartModule',
  },
  plugins: [resolve(), typescript()]
};



// import { defineConfig } from 'rollup';
// import typescript from 'rollup-plugin-typescript2';

// export default defineConfig({
//   input: ['./linechart.ts', './GlasseyeChart.ts'], // List your input files
//   output: {
//     file: '../../../demo/js/bundle.js',
//     format: 'iife', // Immediately Invoked Function Expression for browsers
//     name: 'ChartModule', // Global variable for the bundle (used in browsers)
//     sourcemap: true, // Optional: helpful for debugging
//   },
//   plugins: [typescript()],
// });



// import { defineConfig } from 'rollup';
// import typescript from 'rollup-plugin-typescript2';

// export default defineConfig({
//   input: ['./linechart.ts', './GlasseyeChart.ts'],
//   output: {
//     dir: '../../../demo/js/', // Output directory
//     format: 'es', // Use "esm" for better compatibility
//     sourcemap: true,
//   },
//   plugins: [typescript()],
// });