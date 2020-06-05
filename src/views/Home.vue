<template>
  <div class="todo">
    <div class="header">
      <h1 class="title">TODO {{x}} {{y}}</h1>
      <button class="btn-create" @click="onCreate">+</button>
    </div>
    <ul class="todo-list">
      <li class="todo-item" v-for="(todo, index) in list" :key="index">
        <label class="label">{{ todo.id }}</label>
        <input type="text" :value="todo.text" @input="todo.text = $event.target.value">
        <button @click="onDelete(index)">-</button>
        <button @click="onInsert(index)">+</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  watch,
  computed,
  reactive,
  onBeforeMount,
  watchEffect,
  isReactive,
  onBeforeUpdate,
} from 'vue'

import { useMouse } from '../components/mouse'

interface Todo {
  list: { id: number, title: string }[]
}
const state = reactive<Todo>({
  list: [],
})
const onCreate = () => {
  state.list.push({ id: getMaxId(state.list) + 1, title: '' })
}

const onDelete = (index: number) => {
  state.list.splice(index, 1)
}
const onInsert = (index: number) => {
  state.list.splice(index + 1, 0, { id: getMaxId(state.list) + 1, title: '' })
}

const getMaxId = (list: { id: number, title: string }[]): number => {
  if (state.list.length === 0) return 0
  return Math.max(...state.list.map(item => item.id)
}

watch(() => state.list, () => {
  console.log('state.list has change')
}, {
  deep: true,
  immediate: true
})

// watchEffect(() => {
//   console.log(state.list)
// })

export default defineComponent({
  name: 'Todo',
  setup(props) {
    onBeforeMount(() => console.log('onBeforeMount'))
    onBeforeUpdate(() => console.log('onBeforeUpdate'))
    const {x, y} = useMouse()
    return {
      x,
      y,
      list: state.list,
      onCreate,
      onDelete,
      onInsert
    }
  }
})
</script>
<style lang="scss" scoped>
.todo {
  .header {
    position: relative;
    .title {
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0;
    }
    .btn-create {
      position: absolute;
      top: calc(50% - 11.5px);
      right: 0;
    }
  }
  .todo-list {
    margin: 10px;
    padding: 0;
    list-style: none;
    .todo-item {
      .label {
        width: 40px;
        text-overflow: ellipsis;
      }
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      border: 1px solid #eee;
      background: #eee;
      border-radius: 5px;
    }
  }
}
</style>
