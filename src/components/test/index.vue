<template>
  <div class="index">
    {{ foo.bar }}
    {{ foo.c }}
    <button @click="increase">increase</button>
    <button @click="test">{{loading}}</button>
    <button @click="testRef">toRef</button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, toRef } from 'vue'
const foo = reactive({ bar: 1 })
const increase = () => foo.bar++

const loading = ref(false)
toRef(foo, 'bar')


const test = () => loading.value = !loading.value
console.log(unref(loading))
const testRef = () => foo.c++
</script>
<style lang="scss" scoped>
.index {
}
</style>
