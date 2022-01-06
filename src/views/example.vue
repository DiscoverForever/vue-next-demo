<template>
  <input-number
    v-model="inputVal"
    :step="2"
    :max="11"
    :min="-3"
  ></input-number>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import InputNumber from '../components/input-number/index.vue'

export default defineComponent({
  name: 'Example',
  components: {
    InputNumber
  },
  setup(props: any) {
    return {
      inputVal: ref(0)
    }
  }
})
</script>
