<template>
  <div class="todo">
    <div class="header">
      <h1 class="title">TODO</h1>
      <button class="btn-create" @click="onCreate(list)">+</button>
    </div>
    <ul class="todo-list">
      <li class="todo-item" v-for="(todo, index) in list" :key="index">
        <label class="label">{{ todo.id }}</label>
        <input type="text" v-model="todo.title">
        <button @click="onDelete(list, index)">-</button>
        <button @click="onInsert(list, index)">+</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
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
InputHTMLAttributes,
} from 'vue'

import useMouse from '../components/mouse'
import Modal from '../components/modal/index.vue'

interface Todo {
  id: number
  title: string
}

const getMaxId = (list: Array<Todo>): number => {
  console.log(list)
  if (list.length === 0) return 0
  return Math.max(...list.map((item) => item.id))
}

const onCreate = (list: Array<Todo>) => {
  list.push({ id: getMaxId(list) + 1, title: '' })
}

const onDelete = (list: Array<Todo>, index: number) => {
  list.splice(index, 1)
}

const onInsert = (list: Array<Todo>, index: number) => {
  list.splice(index + 1, 0, { id: getMaxId(list) + 1, title: '' })
}


const list = reactive<Todo[]>([])
const onConfirm = () => {
}
    
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
