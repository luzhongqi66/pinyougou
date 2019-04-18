<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:20px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-input v-model="input" placeholder="请输入内容" style="width:300px;margin-top:20px"></el-input>
        <el-button type="primary" plain style="margin-left:20px" @click="handadd">添加用户</el-button>
      </div>
      <el-table :data="userdata" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="name" label="用户状态" width="180">
          <template slot-scope="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="scope.row.mg_state"
              @change="handchange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="$refs.editmoduleEl.handedit(scope.row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="$refs.AssignrolesEl.handAssignroles(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="onoff">
      <el-form :model="adddata">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="adddata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="adddata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="adddata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="adddata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onoff = false">取 消</el-button>
        <el-button type="primary" @click="handaddsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <editmodule ref="editmoduleEl" @editfinish="xuanran"/>
    <Assignroles ref="AssignrolesEl"/>
  </div>
</template>

<script>
import {
  duqu,
  handstate,
  handadduser,
  deleteur
} from "@/axios/api/yonghuliebiao.js";
import editmodule from "@/views/yonghuliebiao/useredit.vue";
import Assignroles from "@/views/yonghuliebiao/Assignroles.vue";
export default {
  name: "yonghuliebiao",
  components: {
    editmodule,
    Assignroles
  },
  created() {
    this.xuanran();
  },
  data() {
    return {
      userdata: [],
      input: "",
      onoff: false,
      adddata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "200"
    };
  },
  methods: {
    async xuanran() {
      const { data, meta } = await duqu();
      if (meta.status === 200) {
        this.userdata = data.users;
      }
    },
    indexMethod(index) {
      return index * 2;
    },
    async handchange(item) {
      const { data, meta } = await handstate(item);
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      }
    },
    handadd() {
      this.onoff = true;
    },
    async handaddsubmit() {
      const { data, meta } = await handadduser(this.adddata);
      if (meta.status === 201) {
        this.onoff = false;
        this.$message({
          type: "success",
          message: meta.msg
        });
        this.xuanran();
      }
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.userdata);
          this.deleteuser(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async deleteuser(id) {
      const { meta, data } = await deleteur(id);
      if (meta.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.xuanran();
      }
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
