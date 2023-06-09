# unplugin-vue-reuse-template

An simple template reuse in Vue3

在Vue3中使用此款插件，可以简单复用模板。

# Example
https://github.com/liulinboyi/unplugin-vue-reuse-template-example

## Usage

### Basic example

app.vue
```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const asAny = (foo: any) => foo as any;
</script>

<!-- Right Case -->
<!-- 正确写法 -->
<!-- The real template must put the top -->
<!-- 真实的template，必须放到最前面 -->
<template>
  <div>
    <container outlet="menu" />
    <div v-for="n in [1,2,3]">
      <container outlet="list" />
    </div>
  </div>
</template>

<template $menu>
  <div class="count" @click="count++">
    {{ count }}
  </div>
</template>

<!-- If you write like this, although it can be run in a development environment, it does not pass type checking when packaging  -->
<!-- It is not recommended to write like this -->
<!-- 如果你这样写，尽管开发环境可以运行，但是打包时无法通过类型检查 -->
<!-- 不推荐这样写 -->
<template $list>
  <div class="list">
    {{ n }}
  </div>
</template>

<style scoped>
.count {
  font-size: 20px;
}
.list {
  font-size: 16px;
  color: aqua;
}
</style>
```

<details>
<summary>Output</summary>

After Format 格式化后
```vue
<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
const asAny = (foo: any) => foo as any;
</script>

<!-- Right Case -->
<!-- 正确写法 -->
<!-- The real template must put the top -->
<!-- 真实的template，必须放到最前面 -->
<template>
  <div>
    <template $menu v-if="true">
      <div class="count" @click="count++">
        {{ count }}
      </div>
    </template>
    <div v-for="n in [1, 2, 3]">
      <template $list v-if="true">
        <div class="list">
          {{ n }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.count {
  font-size: 20px;
}
.list {
  font-size: 16px;
  color: aqua;
}
</style>

```

Before Format 格式化之前
```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const asAny = (foo: any) => foo as any;
</script>

<!-- Right Case -->
<!-- 正确写法 -->
<!-- The real template must put the top -->
<!-- 真实的template，必须放到最前面 -->
<template>
  <div>
    <template $menu v-if="true">
  <div class="count" @click="count++">
    {{ count }}
  </div>
</template>
    <div v-for="n in [1,2,3]">
      <template $list v-if="true">
  <div class="list">
    {{ n }}
  </div>
</template>
    </div>
  </div>
</template>





<style scoped>
.count {
  font-size: 20px;
}
.list {
  font-size: 16px;
  color: aqua;
}
</style>
```

</details>

## Installation

```bash
npm i unplugin-vue-reuse-template -D
```

```ts
// vite.config.ts
import vueReuseTemplate from 'unplugin-vue-reuse-template/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue(), vueReuseTemplate()],
})
```
