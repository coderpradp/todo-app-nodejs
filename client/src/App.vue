<template>
  <div id="todolist">
    <h1>
      Todo List
      <span>Get stuff done, one at a time.</span>
    </h1>
    <Todo></Todo>
  </div>
</template>

<script>
import Todo from '@/components/Todo'

export default {
  name: 'app',
  components: {
    Todo
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  background: #f7f1f1;
  font-size: 1.1rem;
  font-family: 'Quicksand', sans-serif;
  height: 100%;
}
#todolist {
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  max-width: 500px;
  background: #ff6666;
  color: #fff;
  box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}
</style>
