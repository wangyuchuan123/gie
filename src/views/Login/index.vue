<template>
   <div class="login">
     <el-row >
       <el-col :span='8' :offset='8' class="bg">
 <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="account">
    <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pw">
    <el-input type="password" v-model="ruleForm.pw" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>
       </el-col>
     </el-row>
     
   </div>
</template>

<script>
import {login}from'@/api/http'
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } 
         else{
        if (/^\w{3,6}$/.test(value)) {
          callback();
        } else {
          callback(new Error("3-6位字符"));
        
      }
        
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
        if (/^\w{3,8}$/.test(value)) {
          callback();
        } else {
          callback(new Error("3-8位字符"));
        }
      }
      };
      return {
        ruleForm: {
          account: '',
          pwd: '',
         
        },
        rules: {
          account: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pw: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            login(this.ruleForm).then(data=>{
               let { code, token } = data.data;
              //  console.log( code, token)
                console.log(data)
                 if (code === 0) {
                sessionStorage.setItem("token", token);
                this.$router.push("/home");
              }
            }).catch(err=>{
              console.log('err',err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang='scss' scoped>
.login{
    width: 100%;
    height: 100%;
    background-color:#409EFF;
};
.bg{
  position: absolute;
  top: 200px;
height: 200px;
padding: 30px 10px 30px 10px;
background-color:  white;
}
</style>