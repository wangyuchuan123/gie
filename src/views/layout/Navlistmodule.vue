<template>
    <div class="nav">
    <el-menu
     :default-active="$route.fullPath" 
      background-color="#194679"
     text-color="#fff"
  active-text-color="#ffd04b"
    class="el-menu-demo" 
    mode="horizontal" 
     :collapse="false"
     :router="true"
   >
  <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-help"></i>
        <span>首页</span>
      </template>

      <el-menu-item index="/home/dashboard">首页</el-menu-item>

    </el-submenu>
  <el-submenu index="2">
    <template slot="title">
      <span class="tubiao">图标展示</span>
    </template>
    <el-menu-item index="/charts/bar">柱状图</el-menu-item>
    <el-menu-item index="/charts/pie">饼图</el-menu-item>
  </el-submenu>
  <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>学生管理</span>
      </template>
      <el-menu-item index="/stuAdmin/addNewStu">新生报名</el-menu-item>
      <el-menu-item index="/stuAdmin/adminClass">班级管理</el-menu-item>
      <el-menu-item index="/stuAdmin/stuInfo">学生信息</el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>图片上传</span>
      </template>
      <el-menu-item index="/upload/upload">图片上传</el-menu-item>
    </el-submenu>
  </el-menu>

    </div>
</template>
<script>
export default {
  props: ["collapse"],
};
</script>
<style>
.tubiao{
 padding-left: 20px;
}
</style>