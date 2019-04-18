<template>
  <div class="login">
    <div class="login-box">
      <el-form
        ref="formEl"
        :model="userdata"
        label-width="100px"
        class="demo-ruleForm"
        style="margin-top:50px"
      >
        <el-form-item label="用户名">
          <el-input v-model="userdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userdata.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width:100%">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { readuesrdata } from "@/axios/api/login.js";
import router from "@/router.js";
export default {
  name: "login",
  components: {},
  data() {
    return {
      userdata: {
        username: "",
        password: ""
      }
      // rules: [{ required: true, message: "用户名不能为空" }]
    };
  },
  methods: {
    async submitForm() {
      const { data, meta } = await readuesrdata(this.userdata);
      this.$refs.formEl.validate(async valid => {
        if (valid) {
          const { data, meta } = await readuesrdata(this.userdata);
          if (meta.status === 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$router.push("/");
          } else {
            this.$message({
              message: meta.msg,
              type: "warning"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2f4050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 500px;
  height: 300px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
}
.btn {
  width: 100%;
}
</style>
