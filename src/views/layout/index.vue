<template>
  <div class="index">
<el-container>
  <el-aside width="200px">
    <navlist></navlist>
  </el-aside>
  <el-container>
    <el-header>
      <headernav></headernav>
      </el-header>
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>
<script>
import headernav from '@/views/layout/HeaderNav.vue'
import navlist from '@/views/layout/Navlistmodule.vue'

export default {
 components:{headernav,navlist}
}
</script>
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100vh;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  

</style>