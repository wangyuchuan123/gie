<template>
  <div class="stuinfo">
     <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>学生列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="primary"
          @click="addNew"
          >添加新生</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="isLoaded">
        <el-table-column label="stuId" width="100" prop="stuId">
        </el-table-column>

        <el-table-column label="学生姓名" width="200" prop="name">
        </el-table-column>
        <el-table-column label="年龄" width="150" prop="age"> </el-table-column>
        <el-table-column label="班级名称" width="150" prop="className">
        </el-table-column>

        <el-table-column label="头像" width="250" prop="imgUrl">
          <template v-slot='scope'>
           <img class="imgs" :src='`http://localhost:3000/upload/${scope.row.imgUrl}`' alt="">

          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="3"
        @current-change="changePage"
        :current-page="page"
      >
      </el-pagination>
     </el-card>
  </div>  
</template>

<script>
import { getStudentList, delStudent } from "@/api/http";
export default {
    data() {
    return {
      tableData: [],
      isLoaded: false,
      total: 0,
      page: 1,
    };
  },
  created(){
this.getData()
  },
  methods:{
    // 获取数据
     getData() {
      getStudentList({
        page: this.page,
      })
        .then((res) => {
          console.log('aaa',res)
          let { code, list, total } = res.data;
          if (code === 0) {
            //有数据
            this.total = total;
            this.tableData = list;
          } else {
            // code=1, 没有数据
            if (this.page === 1) {
              this.tableData = [];
              this.total = 0;
            } else {
              this.page--;
              this.getData();
            }
          }
          this.isLoaded = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加新生
    addNew(){
     this.$router.push("/stuAdmin/AddNewStu");
    },
    // 编辑
    handleEdit(index, row){
     this.$router.push({
       path:"/stuAdmin/AddNewStu",
       query:{
         stuId: row.stuId,
       }
     })
    },
    // 删除
    handleDelete(index,row){
      console.log(row)
       delStudent({stuId: row.stuId}).then(res=>{
         let { code } = res.data;
         if (code === 0) {
            // 删除成功
            this.getData();
            this.$message.success("删除成功");
          }
       }).catch((err) => {
          console.log("err", err);
        });
    },
    // 切换页码
    changePage(num) {
      this.page = num;
      this.getData();
    },
  }
};
</script>

<style lang='scss' scoped>
.stuinfo {
  position: relative;
  .imgs {
    width: 80px;
    height: 80px;
    border: 1px solid #000;
  }
  
}
</style>