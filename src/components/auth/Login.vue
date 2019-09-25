<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <el-form :label-position="labelPosition" label-width="100px" :model="formLogin">
      <el-form-item label="Email">
        <el-input placeholder="Enter email" v-model="formLogin.email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input placeholder="Enter password" v-model="formLogin.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('formLogin')">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      labelPosition: "left",
      formLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store.dispatch("retrieveToken", {
        username: this.formLogin.email,
        password: this.formLogin.password
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.login-form {
  display: inline-block;
  width: 400px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login-heading {
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>