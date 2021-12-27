<template>
  <button class="el-button" :class="[`el-button-${type}`]" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
const emits = defineEmits({
  /**
   * 事件发出前验证
   */
  click: (event: Event) => true
})

const props = defineProps({
  /**
   * 类型
   */
  type: {
    type: String,
    default: 'primary'
  }
})

const ctx = getCurrentInstance()

const handleClick = (event: Event) => ctx?.emit('click', event)

</script>

<style lang="scss">
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    -o-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.el-button-primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
</style>

function useContext() {
  throw new Error("Function not implemented.")
}

function useContext() {
  throw new Error("Function not implemented.")
}
