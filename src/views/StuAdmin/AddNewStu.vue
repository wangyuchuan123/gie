<template>
  <div class="add-new">
    <!-- 表头 -->
    <el-card class="add-new">
      <div slot="header" class="clearfix">
    <span>{{actio === 'add' ? '新生报名':'编辑学生信息'}}</span>
      </div>
   <!-- 表单 -->
   <el-form ref="ruleForm" :model="ruleForm" :rules='rules' label-width="80px">
     <!-- 姓名 -->
  <el-form-item label="姓名" prop='name'>
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <!-- 年龄 -->
   <el-form-item
    label="年龄"
    prop="age"
    :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
  >
    <el-input type="age" v-model.number="ruleForm.age" autocomplete="off"></el-input>
  </el-form-item>
  <!-- 班级名称 -->
  <el-form-item label="班级名称" prop="classId">
        <el-select v-model="ruleForm.classId" placeholder="请选择班级名称">
          <el-option
          v-for="item in classInfo"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          >
           </el-option>
        </el-select>
  </el-form-item>
  <!-- 头像 -->
  <el-form-item label="头像" >
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
</el-form-item>
<!-- 提交 -->
  <el-form-item>
    <el-button type="primary" @click="onSubmit('ruleForm')" >{{actio ==='add' ? '提交新增':'提交编辑' }}</el-button>
  
    <el-button @click="reset('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-card> 
</div>
</template>

<script>
import {
  getClassList,
  addStudent,
  getOneStudent,
  editStudent,
} from "@/api/http";
  export default {
    data() {
      return {
        // 回显图片
        imageUrl: '',
        serverImg: "",
        headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
        ruleForm: {
        name: "",
        age: "",
        classId: "",
      },
      // 图片地址
      imgUrl:'',
      classInfo: [],
      rules: {
        name: [
          { required: true, message: "请输入新生姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      actio:''
      }
    },
    mounted(){
      // 获取班级名称
      this.getlist()
      // console.log('id',this.$route.query)
       let { stuId } = this.$route.query;
       this.stuId = stuId;
       console.log('stuId',stuId)
      //  编辑学生信息
       if(stuId){
         document.title='编辑学生信息'
        this.actio='edit'
         getOneStudent(stuId).then(res=>{
           let row=res.data.list;
           console.log('row',row);
           this.ruleForm={
             name: row.name,
            age: row.age,
            classId: row.classId,
           };
          this.imageUrl=`http://localhost:3000/upload/${row.imgUrl}`;
           this.imgUrl = row.imgUrl;
         })
       }else{
         this.actio='add'
         console.log('add')
       }
       console.log('15',this.actio)
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
         this.imgUrl = res.url;
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
      },
      // 获取班级名称
      getlist(){
       getClassList({
        classStatus: 0,
      })
        .then((res) => {
          let { code, list } = res.data;
          if (code === 0) {
            this.classInfo = list;
          } else {
            alert("没有即将开班的班级");
          }
        })
        .catch((err) => {
          console.log("err");
        });
      },
     onSubmit(formName){
        this.$refs[formName].validate((valid)=>{
           if(valid){
         this.ruleForm.imgUrl = this.imgUrl;
        // 添加
         if(this.actio==='add'){
            addStudent(this.ruleForm).then(res=>{
              let{code}=res.data
              if(code===0){
                this.$refs[formName].resetFields();
                this.$message.success("添加成功");
                this.imageUrl=''
              }
          }).catch(err=>{
             console.log("err");
          })
         }else {
          // 编辑
            this.ruleForm.stuId = this.stuId;
           
            console.log('25',this.ruleForm.imgUrl )
            //编辑
            editStudent(this.ruleForm)
              .then((res) => {
                let { code } = res.data;
                if (code === 0) {
                  this.$message.success("编辑成功");
                  this.$refs[formName].resetFields();
                  this.$router.push("/stuAdmin/stuInfo");
                }
              })
              .catch((err) => {
                console.log("err");
              });
          }
         
           }
       })
     } ,
    // 重置
    reset(formName){
       this.$refs[formName].resetFields();
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