<template>
  <div>
    <el-dialog title="分配角色" :visible.sync="onoff">
      <el-form :model="jueseshuju">
        <el-form-item label="用户名称" style="wdith:500px">
          <el-input v-model="Assignrolesdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" style="wdith:500px">
          <el-select v-model="jueseshuju.rid" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onoff = false">取 消</el-button>
        <el-button type="primary" @click="Assignrolessubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>


<script>
import { idAssignroles, getroleslist } from "@/axios/api/yonghuliebiao.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      Assignrolesdata: {},
      onoff: false,
      jueseshuju: {},
      jueselist: []
    };
  },
  methods: {
    async handAssignroles(item) {
      this.Assignrolesdata = item;
      const { data, meta } = await idAssignroles(item.id);
      console.log(data, meta);
      if (meta.status === 200) {
        const jueseshuju = data;
        this.rolelist();
        this.onoff = true;
      }
    },
    async rolelist() {
      const { data, meta } = await getroleslist;
      console.log(meta);
      // if (meta.status === 200) {

      // }
    },
    Assignrolessubmit() {}
  }
};
</script>

<style scoped>
</style>
