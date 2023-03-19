<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const asAny = (foo: any) => foo as any;
</script>

<!-- Error Case -->
<!-- 错误写法 -->
<template $menu>
  <div class="count" @click="count++">
    {{ count }}
  </div>
</template>

<!-- Error Case -->
<!-- 错误写法 -->
<template $list>
  <div class="list">
    {{ n }}
  </div>
</template>

<template>
  <div>
    <container outlet="menu" />
    <div v-for="n in [1,2,3]">
      <container outlet="list" />
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
