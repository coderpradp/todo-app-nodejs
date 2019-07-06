<template>
  <div>
    <loading :active="isLoading" loader="dots" color="#ff6666" background-color="#4B4B4B"></loading>
    <div v-if="todos.length">
      <transition-group name="todolist" tag="ul">
        <li v-for="item in todoByStatus" :class="item.done ? 'done' : ''" :key="item._id">
          <span class="label">{{ item.description }}</span>
          <div class="actions">
            <button
              class="btn-picto"
              type="button"
              @click="markAsDoneOrUndone(item._id)"
              :aria-label="item.done ? 'Undone' : 'Done'"
              :title="item.done ? 'Undone' : 'Done'"
            >
              <i aria-hidden="true" class="material-icons">
                {{ item.done ? 'check_box' : 'check_box_outline_blank' }}
              </i>
            </button>
            <button
              class="btn-picto"
              type="button"
              @click="deleteItemFromList(item._id)"
              aria-label="Delete"
              title="Delete"
            >
              <i aria-hidden="true" class="material-icons">delete</i>
            </button>
          </div>
        </li>
      </transition-group>
      <toggle-button
        label="Move done items at the end?"
        name="todosort"
        @clicked="clickontoogle"
      ></toggle-button>
    </div>
    <p v-else class="emptylist">Your todo list is empty.</p>
    <form name="newform" @submit.prevent="addItem">
      <label for="newitem">Add to the todo list</label>
      <input type="text" name="newitem" id="newitem" v-model="newitem" />
      <button type="submit">Add item</button>
    </form>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import TodoService from '../TodoService'
import ToggleButton from './ToggleButton'

export default {
  name: 'Todo',
  components: {
    ToggleButton,
    Loading
  },
  data() {
    return {
      isLoading: false,
      error: '',
      newitem: '',
      sortByStatus: false,
      todos: []
    }
  },
  methods: {
    addItem() {
      this.isLoading = true
      const todo = {
        description: this.newitem,
        done: false
      }
      TodoService.createTodo(todo)
        .then(async () => {
          this.todos = await TodoService.getTodos()
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
      this.newitem = ''
    },
    markAsDoneOrUndone(id) {
      this.isLoading = true
      TodoService.updateDoneStatus(id)
        .then(async () => {
          this.todos = await TodoService.getTodos()
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    deleteItemFromList(id) {
      this.isLoading = true
      TodoService.deleteTodo(id)
        .then(async () => {
          this.todos = await TodoService.getTodos()
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    clickontoogle(active) {
      this.sortByStatus = active
    }
  },
  computed: {
    todoByStatus: function() {
      if (!this.sortByStatus) {
        return this.todos
      }

      let sortedArray = []
      let doneArray = this.todos.filter(function(item) {
        return item.done
      })
      let notDoneArray = this.todos.filter(function(item) {
        return !item.done
      })

      sortedArray = [...notDoneArray, ...doneArray]
      return sortedArray
    }
  },
  async created() {
    try {
      this.todos = await TodoService.getTodos()
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>

<style scoped>
@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}
.todolist-move {
  transition: transform 1s;
}
.emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
ul {
  margin-top: 2.6rem;
  list-style: none;
}
li {
  display: flex;
  margin: 0 -3rem 4px;
  padding: 1.1rem 3rem;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
}
.actions {
  flex-shrink: 0;
  padding-left: 0.7em;
}
.label {
  position: relative;
  transition: opacity 0.2s linear;
}
.done .label {
  opacity: 0.6;
}
.done .label:before {
  content: '';
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  animation: strikeitem 0.3s ease-out 0s forwards;
}
.btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #fff;
}
form {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
}
form label {
  min-width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
}
form button {
  padding: 0 1.3rem;
  border: none;
  background: #ff6666;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s ease-out;
}
form button:hover {
  background: #ff5e5e;
}
form input,
form button {
  font-family: 'Quicksand', sans-serif;
  height: 3rem;
}
</style>
