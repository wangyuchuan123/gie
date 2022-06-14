<template>
  <el-card class="card-box">
    <div slot="header" class="clearfix">
      <span>班级查询</span>
    </div>
    <!-- 表单 -->
    <el-form :model="form" :rules="rules" ref="classForm">
      <el-row>
        <el-col :span="10">
          <!-- 班级名称 -->
          <el-form-item
            label="班级名称"
            :label-width="formLabelWidth"
            prop="className"
          >
            <el-input v-model="form.className" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 教室名称 -->
          <el-form-item
            label="教室名称"
            :label-width="formLabelWidth"
            prop="classroom"
          >
            <el-select v-model="form.classroom" placeholder="请选择教室名称">
              <el-option label="淀山湖" value="淀山湖"></el-option>
              <el-option label="鄱阳湖" value="鄱阳湖"></el-option>
              <el-option label="王屋山" value="王屋山"></el-option>
              <el-option label="嵩山" value="嵩山"></el-option>
              <el-option label="桐柏山" value="桐柏山"></el-option>
            </el-select>
          </el-form-item>

          <!-- 班主任 -->
          <el-form-item label="班主任" :label-width="formLabelWidth" prop="ht">
            <el-radio-group v-model="form.ht">
              <el-radio label="王趁红">王趁红</el-radio>
              <el-radio label="薛煜">薛煜</el-radio>
              <el-radio label="孔莎莎">孔莎莎</el-radio>
              <el-radio label="何霜">何霜</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <!-- 开班日期 -->
          <el-form-item
            label="开班日期"
            :label-width="formLabelWidth"
            prop="startDate"
          >
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <!-- 开班状态 -->
          <el-form-item
            label="班级状态"
            :label-width="formLabelWidth"
            prop="classStatus"
          >
            <el-radio-group v-model="form.classStatus">
              <el-radio :label="0">即将开班</el-radio>
              <el-radio :label="1">已开班</el-radio>
              <el-radio :label="2">已毕业</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit('classForm')">查询</el-button>
            <el-button type="primary" @click="reset('classForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import{getClassList}from'@/api/http';
import { moment } from "moment";
export default {
  name: "selectClass",
  data() {
    return {
      form: {
         className: "",
        classroom: "",
        ht: "",
        startDate: "",
        classStatus: "",
      },
        rules: {
        className: [{ max: 15, min: 3, message: "3-15", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      page: 1,
    };
  },
  methods:{
     submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功
          if (this.form.startDate) {
            this.form.startDate = moment(this.form.startDate).format(
              "YYYY-MM-DD"
            );
          }
          //请求接口
          getClassList({
            page: 1,
            ...this.form,
          })
            .then((res) => {
              console.log('ss',res)
              let { code } = res.data;
              if (code === 0) {
                this.$emit("send", res.data, this.form);
              }else{
                  this.$message.success("查询内容不存在");
              }
            })
            .catch((err) => {

              console.log("err");
            });
        } else {
          console.log("验证error");
        }
      });
    },
    reset(formName){
      this.$refs[formName].resetFields();
      this.$emit("send");
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  border: 1px solid #000;
}
</style>