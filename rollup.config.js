// export default {
// 	input: 'src/index.js', 
// 	external: ['fs', 'path', 'markdown-it', 'highlight.js', 'qs', '@vue/compiler-sfc'] // <-- suppresses the warning
// };

export default {
    input: 'src/index.js',
    // output: {
    //     file: 'dist/index.js',
    //     format: 'cjs'
    // },
    output: [
        {
            file: 'dist/index.js',
            format: 'es'
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        }
    ],
    external: ['fs', 'path', '@vue/compiler-sfc', 'markdown-it', 'qs', 'highlight.js']
};