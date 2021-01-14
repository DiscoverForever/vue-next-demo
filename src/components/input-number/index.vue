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
      :placeholder="placeholder"
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
import { defineComponent, ref, computed, watch } from 'vue'

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
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
    placeholder: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const displayValue = ref<string>(props.modelValue?.toString() ?? '')
    const currentValue = ref<number>(props.modelValue)
    const increaseDisabled = computed(
      () => currentValue.value + props.step >= props.max
    )
    const decreaseDisabled = computed(
      () => currentValue.value - props.step <= props.min
    )
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
        setCurrentValue(currentValue.value + props.step)
        setDisplayValue(currentValue.value)
      }
    }

    /**
     * 减
     */
    const decrease = () => {
      if (!decreaseDisabled.value) {
        setCurrentValue(currentValue.value - props.step)
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
$theme-color: #409eff;
.input-number {
  position: relative;
  height: 40px;
  width: 180px;
  overflow: hidden;
  .input {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 0 40px;
    text-align: center;
    min-width: 0;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    &:focus {
      border: none;
      outline: none;
      border: 1px solid $theme-color;
    }
  }
  .disabled {
    color: #c0c4cc;
    &:hover {
      cursor: not-allowed;
    }
  }
  .decrease {
    position: absolute;
    top: 1px;
    left: 1px;
    cursor: pointer;
    width: 38px;
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    display: inline-block;
    background: #f5f7fa;
    border-right: 1px solid #f5f7fa;
    user-select: none;
    z-index: 200;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    overflow: hidden;
  }
  .increase {
    position: absolute;
    top: 1px;
    right: 1px;
    cursor: pointer;
    width: 38px;
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    display: inline-block;
    background: #f5f7fa;
    border-left: 1px solid #f5f7fa;
    user-select: none;
    z-index: 200;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
}
</style>
