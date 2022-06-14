<template>
    <div class="navlist">
         <p>
      <i class="el-icon-s-tools"></i
      ><router-link to="/home/dashboard">首页</router-link>
    </p>
      <p>图表展示</p>
      <p><router-link to="/charts/bar">柱状图</router-link></p>
      <p><router-link to="/charts/pie">饼状</router-link></p>
       <p><i class="el-icon-s-tools"></i>学生管理</p>
    <p><router-link to="/stuAdmin/addNewStu">新生报名</router-link></p>
    <p><router-link to="/stuAdmin/adminClass">班级管理</router-link></p>
    <p><router-link to="/stuAdmin/stuInfo">学生信息</router-link></p> 
    <p><i class="el-icon-s-tools"></i>图片上传</p>
    <p><router-link to="/upload/upload">图片上传</router-link></p> 


    </div>
</template>
<script>
export default {
  setup() {
    
  },
}
</script>
<style lang="scss" scoped>
a{
text-decoration: none;
}
</style>