<template>
  <div class="admin-class">
  <selest-class @send="getSelectData"></selest-class>
 <el-card class="box-card">
  <div slot="header" class="clearfix" style="width: 100%">
    <span>班级列表
    </span>
    <el-button style="float: right; padding: 3px 0" type="primary" @click="show" >新增班级</el-button>
  </div>
<!-- 表格 -->
     <el-table :data="tableData" style="width: 100%" v-loading="isLoaded">
        <el-table-column label="classId" width="100" prop="classId">
        </el-table-column>

        <el-table-column label="班级名称" width="100" prop="className">
        </el-table-column>
        <el-table-column label="教室" width="100" prop="classroom">
        </el-table-column>
        <el-table-column label="班主任" width="100" prop="ht">
        </el-table-column>
         <el-table-column label="开班时间" width="150">
          <template v-slot="scope">
            {{ scope.row.startDate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="班级状态" width="100" prop="status">
        </el-table-column>
        <!-- <el-table-column label="班级状态" width="100">
          <template v-slot='scope'>
            {{switchStatus(scope.row.classStatus)}}
          </template>
        </el-table-column> -->
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
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
 <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="3"
  @current-change='changePage'
  :current-page="page"
  >
</el-pagination>
</el-card>

<addclass :dialog-visible.sync="dialogVisible" 
:record='record'
@refresh='refresh'
:action="action"
@edit-success='editsuccess'
>
</addclass>

  </div>
</template>

<script>
import{getClassList,deleteClass} from '@/api/http'
import Addclass from './Addclass/Addclass.vue'
import SelestClass from './Addclass/selest-class.vue';

export default {
  name: "adminClass",
  components:{Addclass, SelestClass},
  data() {
    return {
      tableData: [],
      dialogVisible:false,
      record: {},
      total:0,
      action: "",
      isLoaded:false,
      page:1,
      query:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
      getSelectData(data, form) {
      if (data) {
        //筛选的处理
        console.log('111',data)
        this.page = 1;
        this.tableData = data.list;
        this.total = data.total;
        this.query = form;
      } else {
        //重置的处理
        this.page = 1;
        this.getData();
        this.query = "";
      }
    },
    // 获取数据
    getData(query) {
      this.isLoaded=true
       if (query) {
        query = {
          page: this.page,
          ...query,
        };
      } else {
        query = {
          page: this.page,
        };
      }
      getClassList(query)
        .then((res) => {
          console.log(res)
         let { code, list,total } = res.data;
       
          if (code === 0) {
              this.total=total
            this.tableData = this.handleData(list);
          }else{
            if(this.page===1){
              this.tableData=[];
              this.total=0
            }else{
              this.page--;
              this.getData()
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
              this.isLoaded=false
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row);
      this.action = "edit";
      this.dialogVisible = true;
      this.record = row;
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row);
       deleteClass(row.classId).then(data=>{
   // 删除成功
   console.log(data)
   let {code}=data.data
   if(code===0){
    this.$message.success("删除成功");
    this.getData();

   }
           
       })
    },
    // 开班数据
    switchStatus(status) {
      let result = "";
      switch (status) {
        case 0:
          result = "即将开班";
          break;
        case 1:
          result = "已开班";
          break;
        case 2:
          result = "已毕业";
      }
      return result;
    },
// 改造数据
handleData(list){
  // 进行深拷贝
  let newlist=JSON.parse(JSON.stringify(list))
  return newlist.map(item=>{
    let status='',
        tagType=''
if (item.classStatus === 0) {
          status = "即将开班";
          tagType = "warning";
        }
        if (item.classStatus === 1) {
          status = "已开班";
          tagType = "success";
        }
        if (item.classStatus === 2) {
          status = "已毕业";
          tagType = "danger";
        }
          return{
    ...item,
    status,
    tagType
  }
  })

},
//显示对话框
show(){
   this.dialogVisible = true;
   this.action = "add";
      this.record = {
        className: "",
        classroom: "",
        ht: "",
        startDate: "",
        classStatus: "",
      };

},
//新增成功后重新获取数据
refresh(){
  this.page=1
  this.getData()

},
editsuccess(){
  this.getData()
},
  // 分页
  changePage(num){
    console.log(num)
    this.page=num;
      if (this.query) {
        this.getData(this.query);
      } else {
        this.getData();
      }
  }
  }

};
</script>

<style lang='scss' scoped>

.box-card{
  text-align: left;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.admin-class {
  position: relative;
}

</style>