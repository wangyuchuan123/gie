<template>
    <div class="upload">
      <el-upload
  class="avatar-uploader"
  action="http://localhost:3000/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :headers="headers"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>

</el-upload>
  <img :src='`http://localhost:3000/upload/${serverImg}`' alt="">
    </div>
</template>
<script>
  export default {
    data() {
      return {
        imageUrl: '',
            serverImg: "",
         headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
         this.serverImg = res.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #060606;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style> 