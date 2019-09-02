<template>
    <div class="todo__item">
        <div class="item__left">
          <input type="checkbox" class="item__checkbox" v-model="todo.completed">
          <div class="item__name" @dblclick="editTodo(todo)" v-if="!todo.editing">{{ todo.name }}</div>
          <input class="item__input-name" v-else type="text" v-model="todo.name" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" v-focus @keyup.esc="cancelEdit(todo)">
        </div>
        <div class="item__remove" @click="removeTodo(index)">&times;</div>
    </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    }
}
</script>