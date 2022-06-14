<template>
    <div class="header">
    <el-row>
        <el-col class="left" :span='10'>
        <div class="icon">
          <i class="el-icon-s-unfold"></i>
          <i class="el-icon-s-fold"></i>
        </div>
        </el-col>
        <el-col class="right" :span="4">
        </el-col>
    </el-row>
    </div>
</template>
<script>
export default {
  
}
</script>
<style lang='scss' scoped>
.header {
  .left {
    display: flex;
    height: 30px;
    line-height: 30px;
    .icon{
        text-align: left;
    }
  }
  .right {
    height: 30px;
    line-height: 30px;
  }
}
</style>