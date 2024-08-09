# vite-plugin-vue-markd


## 安装

```bash
npm i vite-plugin-vue-markd highlight.js
```

## 使用

### 引入插件

```javascript
import vueMdPlugin from 'vite-plugin-vue-markd'

// add to vite plugins
plugins: [
    vueMdPlugin(),
    vue({
        include: [/\.vue$/, /\.md$/],
    })
]
```

### 页面使用

```
// main.js
'highlight.js/styles/github.css' // 代码块着色

// 组件
<template>
    <xx></xx>
</template>

import xx from '*.md'

components: {
    xx
}
```