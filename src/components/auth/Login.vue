<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">
      <div class="form-control">
        <input type="email" name="username" id="username" class="login-input" placeholder="Username" required v-model="username">
      </div>

      <div class="form-control mb-more">
        <input type="password" name="password" id="password" class="login-input" placeholder="Password" required v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retrieveToken', {
              username: this.username,
              password: this.password,
            })
        }
    }
}
</script>
<style scoped lang="stylus">
  .login-form {
    display inline-block
    width 300px
    text-align center
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    input {
      width 100%
      height 40px
      margin-bottom 10px
      padding 15px
      font-size 15px
    }
    button {
      width 100%
      background-color lightgreen
      height 35px
      font-size 15px
    }
  }
</style>