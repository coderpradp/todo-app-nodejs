import axios from 'axios'

const url = 'http://localhost:5000/api/todos/'

class TodoService {
  static getTodos() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  static createTodo(todo) {
    return axios.post(url, todo)
  }

  static deleteTodo(id) {
    return axios.delete(`${url}${id}`)
  }

  static updateDoneStatus(id) {
    return axios.post(`${url}${id}/completed`)
  }
}

export default TodoService
