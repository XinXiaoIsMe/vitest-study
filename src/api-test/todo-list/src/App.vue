<template>
  <div class="todo-list">
    <header>TODO LIST</header>
    <div class="todo-list__opt">
      <TodoInput v-model="title" @enter="addTodo" />
      <TodoButton @click="addTodo(title)">ADD</TodoButton>
    </div>
    <div class="todo-list__content">
      <TodoItem
        v-for="(todo, index) in todoList"
        :key="todo.id"
        :todo="todo"
        :index="index + 1"
        @remove-todo="removeTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/store/todo' 
import TodoButton from './TodoButton.vue'
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';

const todoStore = useTodoStore()
const {
  title,
  todoList,
} = storeToRefs(todoStore)
const {
  addTodo,
  removeTodo
} = todoStore

onMounted(() => {
  todoStore.initTodoList()
})
</script>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 400px;
  border: 1px solid gray;
  border-radius: 3px;

  header {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid gray;
    color: #333;
  }

  &__opt {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px;

    input {
      flex: 1;
    }

    button {
      flex-shrink: 0;
    }
  }

  &__content {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;

    .todo-list__item {
      border-bottom: 1px solid gray;
    }
  }
}
</style>
