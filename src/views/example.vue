<template>
  <input-number
    v-model="inputVal"
    :step="2"
    :max="11"
    :min="-3"
  ></input-number>
</template>

<script>
import InputNumber from '../components/input-number/index.vue'

export default {
  name: 'Example',
  components: {
    InputNumber
  },
  setup(props) {
    return {
      inputVal: 0
    }
  }
}
</script>
