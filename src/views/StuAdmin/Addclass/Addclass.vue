<template>
    <div class="addclss">

<el-dialog :title="action ==='add' ? '添加班级':'编辑班级'" :visible="dialogVisible" @close="cancel">
    <el-form ref="classform" :model="form"  :rules="rules" >
        <!-- 班级名称 -->
  <el-form-item label="班级名称" :label-width="formLabelWidth" prop='className'>
    <el-input v-model="form.className"  autocomplete="off"></el-input>
  </el-form-item>
  <!-- 教师名称 -->
  <el-form-item label="教室名称" :label-width="formLabelWidth" prop='classroom'>
    <el-select v-model="form.classroom" placeholder="请选择教室名称">
          <el-option label="淀山湖" value="淀山湖"></el-option>
          <el-option label="鄱阳湖" value="鄱阳湖"></el-option>
          <el-option label="王屋山" value="王屋山"></el-option>
          <el-option label="嵩山" value="嵩山"></el-option>
          <el-option label="桐柏山" value="桐柏山"></el-option>
    </el-select>
  </el-form-item>
<!-- 班主任 -->
  <el-form-item label="班主任" :label-width="formLabelWidth">
     <el-radio-group v-model="form.ht">
          <el-radio label="王趁红">王趁红</el-radio>
          <el-radio label="薛煜">薛煜</el-radio>
          <el-radio label="孔莎莎">孔莎莎</el-radio>
          <el-radio label="何霜">何霜</el-radio>
        </el-radio-group>
  </el-form-item>
  <!-- 开办日期 -->
  <el-form-item label="开班日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.startDate"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
  <!-- 开班状态 -->
      <el-form-item label="班主任" :label-width="formLabelWidth">
        <el-radio-group v-model="form.classStatus">
          <el-radio :label="0">即将开班</el-radio>
          <el-radio :label="1">已开班</el-radio>
          <el-radio :label="2">已毕业</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
 <!-- footer -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary"
     @click="add('classform')"
     v-if="action==='add'"
    >确 定</el-button>
   <el-button type="primary" @click="edit('classform')" v-else
        >编辑</el-button
      >
  </div>
</el-dialog>
    </div>
</template>
<script>
import moment from "moment";

import{addClass, editClass}from '@/api/http'
  export default {
     props: ["dialogVisible","record","action"],
    data() {
      return {
        form: {
        className: "",
        classroom: "",
        ht: "",
        startDate: "",
        classStatus: "",
      },
        formLabelWidth: '120px',
         rules: {
        className: [{ max: 10, min: 3, message: "3-10", trigger: "blur" }],
      },
      };
    },
  watch: {
    record() {
      this.form = JSON.parse(JSON.stringify(this.record));
    },
  },
    methods:{
  cancel() {
      this.$emit("update:dialogVisible", false);
    },
    // 添加
    add(formName){
       this.$refs[formName].validate((valid)=>{
           if(valid){
                 this.form.startDate = moment(this.form.startDate).format(
            "YYYY-MM-DD"
          );
          addClass(this.form).then(res=>{
              let{code}=res.data
              if(code===0){
                this.$refs[formName].resetFields();
                this.$message.success("添加成功");
                //   新增成功后隐藏表单
                  this.cancel(),
                //  添加成功后向父组件注册时间重新获取数据
                  this.$emit('refresh')
              }
          }).catch(err=>{
             console.log("err");
          })
           }
       })
    },
// 编辑
edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功
          this.form.startDate = moment(this.form.startDate).format(
            "YYYY-MM-DD"
          );
          //请求添加接口
          editClass(this.form)
            .then((res) => {
              let { code } = res.data;
              if (code === 0) {
                this.$refs[formName].resetFields();
                this.$message.success("编辑成功");
                this.cancel();
                this.$emit("edit-success");
              }
            })
            .catch((err) => {
              console.log("err");
            });
        } 
        else {
          console.log("验证error");
        }
      });
    },
    }
  };
</script>