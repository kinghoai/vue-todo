<template>
  <div class="register-form">
    <h2 class="register-heading">Register</h2>
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      ref="formRegister"
      label-width="100px"
      :model="formRegister"
    >
      <el-form-item label="Name" prop="name">
        <el-input placeholder="Enter name" v-model="formRegister.name"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Enter email" v-model="formRegister.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input placeholder="Enter password" v-model="formRegister.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register('formRegister')">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      labelPosition: "right",
      formRegister: {
        name: '',
        email: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Please input user", trigger: "blur" },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: "Please input Password", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register(formRegister) {
      this.$refs[formRegister].validate(valid => {
        if (valid) {
          console.log('register')
        } else {
          return;
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.register-form {
  display: inline-block;
  width: 400px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .register-heading {
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>