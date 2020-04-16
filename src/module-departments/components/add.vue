<template>
    <!--visible.sync 当前对话框是否显示 true/false 显示/隐藏 -->
    <el-dialog title="编辑部门" :visible.sync="dialogFormVisible">
      <!-- model 数据模型 -->
      <el-form :model="dept" label-width="120px">
        <el-form-item label="部门名称" >
          <el-input v-model="dept.name" autocomplete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="部门编码" >
          <el-input v-model="dept.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" >
          <el-input v-model="dept.manager" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门介绍" >
          <el-input v-model="dept.introduce" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDept()">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>

// 引入API
import { list,saveorupdate ,find,deleteById} from "@/api/base/dept";


export default {
   data() {
    return { 

      //构造父部门模型，绑定父部门；
      parentId: '',
      dialogFormVisible:false,
      dept:{}
    };
  },
  methods: {   
    //添加部门
    saveDept(){
      this.dept.pid = this.parentId;
      //alert(this.parentId);
      saveorupdate(this.dept).then(res=>{
        //alert(res.data.message);
        this.$message({
          message: res.data.message,
          type: res.data.success? 'success':'error'
        });
        if(res.data.success){
            location.reload();
        }
      });
    },
  },
}
</script>

<style>

</style>