<template>
  <div>
    <el-dialog title="编辑用户" :visible.sync="onoff">
      <el-form :model="eidtdata">
        <el-form-item label="用户名称" style="width:500px">
          <el-input v-model="eidtdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" style="width:500px">
          <el-input v-model="eidtdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" style="width:500px">
          <el-input v-model="eidtdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onoff = false">取 消</el-button>
        <el-button type="primary" @click="handaddsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { edit } from "@/axios/api/yonghuliebiao.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      eidtdata: {},
      onoff: false
    };
  },
  methods: {
    handedit(item) {
      this.onoff = true;
      this.eidtdata = item;
    },
    async handaddsubmit() {
      const { meta, data } = await edit(this.eidtdata);
      console.log(meta, data);
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: meta.msg
        });
        this.onoff = false;
      }

      this.$emit("editfinish");
    }
  }
};
</script>

<style scoped>
</style>
