// vite-plugin-vue-markdown.js
import { readFileSync } from 'fs'
import {join, extname } from 'path' 
import { parse } from '@vue/compiler-sfc'
import markdown from 'markdown-it'
import hljs from 'highlight.js' 
import qs from 'qs'  

  const replaceVue = (source, types = ['template', 'script']) => {
    const { descriptor } = parse(source)
    const lang = {
      template: 'html',
      script: 'javascript' 
      // style: 'css'
    }
    return types.map(type => lang[type] && `
\`\`\`${lang[type]}
    ${ descriptor[type].content} 
\`\`\` 
    `).join('')
  }
  const replaceResults = (template, baseDir) => {
    const regexp = new RegExp("\\{\\{:([^:\\}]+)\\}\\}", "g");
  
    return template.replace(regexp, function(match) {
        // {{:examples/pages/actionsheet.vue}}
      match = match.substring(3, match.length - 2); 
      let [loadFile, query = ''] = match.split('?')
      let type = undefined 
      if( query){
        ({ type } = qs.parse(query) )
      }
      const source = readFileSync(join(baseDir, loadFile), "utf-8").replace(/[\r\n]*$/, "")

      if (extname(loadFile) === ".vue") { 
        return replaceVue(source, typeof type === 'string' ? [type] : type)
      }
  
      return source
    });
  };

export default function vueMarkdownPlugin(options = {}) {
//   const filter = createFilter(options.include || /\.md$/, options.exclude);
  return {
    name: 'vite-plugin-vue-markdown',
    transform(code, id) {
    //   if (!filter(id)) return;
      if (!/\.md$/.test(id)) return
 
      const md = new markdown({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<pre><code class="hljs">' +
                       hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                       '</code></pre>';
              } catch (__) {}
            } 
            return '<pre><code class="hljs">' +  md.utils.escapeHtml(str) + '</code></pre>';
        }
      }); 
      const content = readFileSync(id, 'utf-8');
      let source = replaceResults(content, process.cwd())

      const html = md.render(source) 
      // Create Vue component template
      const template = `<template v-pre> ${ html} </template>`; 
 
      return { 
        code: template, 
        map: null
      };
    }
  };
}
