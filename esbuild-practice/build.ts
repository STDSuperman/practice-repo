import { buildSync } from 'esbuild';

buildSync({
	entryPoints: ['src/index.ts'],
	bundle: true,
	outdir: 'dist',
	target: 'es2015'
});