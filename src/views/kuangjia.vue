<template>
  <el-container class="zt">
    <el-header class="header">
      <el-row :gutter="20">
        <el-col :span="4">
          <img src="../../public/img/logo.png" alt>
        </el-col>
        <el-col :span="16">
          <h1 class="bt">电商管理平台</h1>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" class="tc" @click.prevent="tc">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-submenu :index="item.path" v-for="item in shuju" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group v-for="two in item.children" :key="two.id">
                <el-menu-item :index="`/${two.path}`">{{two.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { cebianlan } from "@/axios/api/cebianlan.js";
export default {
  name: "kuangjia",
  components: {},
  created() {
    this.duqu();
  },
  data() {
    return {
      shuju: {}
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    tc() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          window.localStorage.removeItem("token");
          this.$router.replace("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出!"
          });
        });
    },
    async duqu() {
      const { meta, data } = await cebianlan();
      console.log(data);
      if (meta.status === 200) {
        this.shuju = data;
      }
    }
  }
};
</script>

<style scoped>
.zt {
  height: 100%;
}
.header {
  background: #5484dd25;
  height: 200px;
  border-bottom: 2px solid #000;
}
.aside {
  background: #545c64;
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
  padding: 0;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  background-color: #f9fafc;
}
.bt {
  text-align: center;
  line-height: 60px;
}
.tc {
  margin-top: 10px;
}
.el-col-12 {
  width: 100%;
}
.el-submenu {
  margin-top: 40px;
}
.aside[data-v-1ec1f5ec] {
  border-right: none;
  box-sizing: border-box;
}
</style>
