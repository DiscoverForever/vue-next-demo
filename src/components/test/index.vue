<template>
  <div class="index">
    {{ foo.bar }}
    <button @click="increase">increase</button>
    <button @click="test">{{loading}}</button>
    <button @click="">toRef</button>
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
</script>
<style lang="scss" scoped>
.index {
}
</style>
