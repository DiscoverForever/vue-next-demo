<template>
  <div class="input-number">
    <span
      :class="['decrease', { disabled : decreaseDisabled }]"
      @click="decrease"
      @keydown.enter="decrease"
    >
      -
    </span>
    <input
      class="input"
      type="text"
      :value="displayValue"
      @input="handleInput"
      @blur="handleBlur"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
    >
    <span
      :class="['increase', { disabled : increaseDisabled }]"
      @click="increase"
      @keydown.enter="increase"
    >
      +
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed, watch } from 'vue'

export default defineComponent({
  name: 'InputNumber',
  emits: ['update:modelValue', 'change', 'input', 'blur', 'focus'],
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const displayValue = ref<string>(props.modelValue?.toString() ?? '')
    const currentValue = ref<number>(props.modelValue)
    const increaseDisabled = computed(() => currentValue.value >= props.max)
    const decreaseDisabled = computed(() => currentValue.value <= props.min)
    /**
     * 设置显示值
     */
    const setDisplayValue = (newValue: number | string) => {
      if (typeof newValue === 'number') {
        displayValue.value = newValue.toString()
      } else if (typeof newValue === 'string') {
        displayValue.value = newValue
      }
    }
    /**
     * 设置真实值
     */
    const setCurrentValue = (newValue: number) => {
      const oldValue = currentValue.value
      currentValue.value = newValue
      emit('update:modelValue', currentValue.value)
      emit('input', newValue)
      emit('change', newValue, oldValue)
    }
    watch(
      () => props.modelValue,
      (value) => {
        setCurrentValue(value)
        setDisplayValue(value)
      },
      {
        immediate: true,
      }
    )

    /**
     * 加
     */
    const increase = () => {
      if (!increaseDisabled.value) {
        setCurrentValue(currentValue.value + 1)
        setDisplayValue(currentValue.value)
      }
    }

    /**
     * 减
     */
    const decrease = () => {
      if (!decreaseDisabled.value) {
        currentValue.value--
        setDisplayValue(currentValue.value)
        emit('update:modelValue', currentValue.value)
      }
    }

    /**
     * 输入是否合法
     */
    const checkInputIsValidate = (inputStr: string) => {
      const parsedValue = parseFloat(inputStr)
      const isNaN = Number.isNaN(parsedValue)
      return !isNaN
    }

    /**
     * 检测输入是否合法不合法重置value
     */
    const handleBlur = (event: Event) => {
      const { value } = event.target as HTMLInputElement
      if (!checkInputIsValidate(value)) {
        displayValue.value = currentValue.value.toString()
      }
      emit('blur', event)
    }

    /**
     * 处理输入非数字类型
     */
    const handleInput = (event: Event) => {
      const { value } = event.target as HTMLInputElement
      setDisplayValue(value)
      if (checkInputIsValidate(value)) {
        setCurrentValue(parseFloat(value))
      }
    }

    return {
      displayValue,
      increase,
      decrease,
      increaseDisabled,
      decreaseDisabled,
      handleBlur,
      handleInput,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 180px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  .input {
    display: inline-block;
    height: 100%;
    flex: 1;
    text-align: center;
    min-width: 0;
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
  .disabled {
    color: #c0c4cc;
    &:hover {
      cursor: not-allowed;
    }
  }
  .decrease {
    cursor: pointer;
    flex: 0 0 40px;
    width: 40px;
    height: 100%;
    line-height: 40px;
    font-size: 20px;
    display: inline-block;
    background: #f5f7fa;
    border-right: 1px solid #f5f7fa;
  }
  .increase {
    cursor: pointer;
    flex: 0 0 40px;
    width: 40px;
    height: 100%;
    line-height: 40px;
    font-size: 20px;
    display: inline-block;
    background: #f5f7fa;
    border-left: 1px solid #f5f7fa;
  }
}
</style>
