<template>
  <teleport to="body" v-if="modelValue">
    <div class="mask" @click="handleClose">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <span class="title">{{title}}</span>
          <span class="icon-close" @click="handleClose">x</span>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button @click="handleClose">取消</button>
            <button @click="handleConfirm">确认</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  props: {
    title: {
      type: String,
      default: '提示'
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function as PropType<() => boolean>,
      default: () => true
    }
  },
  setup(props, ctx) {
    const handleClose = () => ctx.emit('update:modelValue', false)
    const handleConfirm = () => {
      if (props.beforeClose()) {
        ctx.emit('update:modelValue', false)
        ctx.emit('confirm')
      } else {
        ctx.emit('confirm')
      }
    }
    return {
      handleClose,
      handleConfirm
    }
  }
})
</script>

<style lang="scss" scope>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background: #000;
  .modal {
    background: #fff;
    width: 30%;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: auto;
      padding: 20px 20px 10px;
      .title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .icon-close {
        text-align: center;
        cursor: pointer;
      }
    }
    .modal-content {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    .modal-footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
    }
  }
}
</style>
