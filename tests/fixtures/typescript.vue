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
