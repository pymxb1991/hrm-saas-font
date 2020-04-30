<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据开始 -->
        <div class="organization-index">
          <div class="organization-index-top">
            <div class="main-top-title">
              <el-tabs v-model="activeName">
                <el-tab-pane label="组织结构" name="first"></el-tab-pane>
                <div class="el-tabs-report">
                  <a class="el-button el-button--primary el-button--mini" title="导出">导入</a>
                  <a class="el-button el-button--primary el-button--mini" title="导出">导出</a>
                </div>
              </el-tabs>
            </div>
          </div>
          <div style="overflow: scroll;white-space:nowrap" class="treBox">
            <div class="treeCon clearfix">
              <span>
                <i class="fa fa-university" aria-hidden="true"></i>
                <span>
                  <strong>{{departData.companyName}}</strong>
                </span>
              </span>
              <div class="fr">
                <span class="treeRinfo">
                  <div class="treeRinfo">
                    <span>负责人：{{departData.companyManage}}</span>
                    <span>
                      在职
                      <em class="colGreen" title="在职人数">---</em>&nbsp;&nbsp;(
                      <em class="colGreen" title="正式员工">---</em>&nbsp;/&nbsp;
                      <em class="colRed" title="非正式员工">---</em>)
                    </span>
                  </div>
                  <div class="treeRinfo">
                    <el-dropdown class="item">
                      <span class="el-dropdown-link">
                        操作
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <el-button type="text" @click="handlAdd('')">添加子部门</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" @click="handleList()">查看待分配员工</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </span>
              </div>
            </div>

            <!-- 
                    构造树形列表
                      叶子 <i class="fa fa-male"></i>
                      非叶子 
                        展开 <i class="fa fa-minus-square-o">
                        闭合 <i class="fa fa-plus-square-o">
                    <div class="generalClass" slot-scope="{node,data}" style="width:99%">

                      
            -->
            <el-tree :props="{label:'name'}" :data="depts" node-key="id" default-expand-all>
              <!--  <span class="custom-tree-node" slot-scope="{ node, data }"> -->
              <!-- 
                  node:  是否展开，是否叶子节点；
                      node.isLeaf  叶子节点
                      node.expanded  如果是展开状态
                  data: 部门对象
              -->
              <div class="generalClass" slot-scope="{node,data}" style="width:99%">
                <span>
                  <i v-if="node.isLeaf" class="fa fa-male"></i>
                  <!-- -->
                  <i v-else :class="node.expanded ? 'fa fa-minus-square-o':'fa fa-plus-square-o'"></i>
                  <span>{{ node.label }}</span>
                </span>

                <div class="fr">
                  <span class="treeRinfo">
                    <div class="treeRinfo">
                      <span>负责人：{{departData.companyManage}}</span>
                      <span>
                        在职
                        <em class="colGreen" title="在职人数">---</em>&nbsp;&nbsp;(
                        <em class="colGreen" title="正式员工">---</em>&nbsp;/&nbsp;
                        <em class="colRed" title="非正式员工">---</em>)
                      </span>
                    </div>
                    <div class="treeRinfo">
                      <el-dropdown class="item">
                        <span class="el-dropdown-link">
                          操作
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <el-button type="text" @click="handlAdd(data.id)">添加子部门</el-button>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <el-button type="text" @click="handleUpdate(data.id)">查看部门</el-button>
                          </el-dropdown-item>                          
                          <el-dropdown-item>
                            <el-button type="text" @click="handleDelete(data.id)">干掉部门</el-button>
                          </el-dropdown-item>
                            <el-dropdown-item>
                            <el-button type="text" @click="handleList()">查看待分配员工</el-button>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </span>
                </div>
                <!-- </span> -->
              </div>
            </el-tree>
          </div>
        </div>
        <!--数据结束 -->
      </el-card>
    </div>
  <!--4、 引入组件-->
    <component v-bind:is="deptAdd" ref="addDept"></component>
  </div>
</template>
 <!-- 组件化开发，定义组合步骤
    1、定义插件，把希望抽取的内容放到插件里面中去；
    2、抽取好之后，把插件定义到这边
    3、做数据交互的一个数据改造
 -->
<!-- 引入组件
     1、首先先 import 定义的组件 example: import deptAdd from './../components/add'
     2、在父的页面中，通过componets:{} 来指定需要使用的组件有哪些 example:  components:{deptAdd},
     3、把定义的组件绑定到模型上；
     4、引入组件 ：通过 <component v-bind:is=""></component>  is="deptAdd" 也就是说要引入deptAdd组件，注意：此处要填写的是一个模型名称
 -->
<!-- 页面渲染步骤
     1、首先通过组件，根据模型名称，查找对应的模型： <component v-bind:is="deptAdd"></component>
     2、然后根据模型中指定的名称，去查找对应的组件：  deptAdd:'deptAdd',  ------》  components:{deptAdd},
-->
<!-- 如何在父页面中引用子组件内容  主要根据别名来引用  ref=""  this.$refs.addDept.属性  -->
<script>
// 引入API
import { list,saveorupdate ,find,deleteById} from "@/api/base/dept";
import commonApi from "@/utils/common";
//1、引入自定义的组件
import deptAdd from './../components/add'

export default {
  //2、注册Add 组件 
  components:{deptAdd},

  data() {
    return {
      //3、组件绑定到模型上
      deptAdd:'deptAdd',
      activeName: "first",
      departData: {},
      depts: [],
    };
  },
  methods: {   
     //构造添加部门方法
    handlAdd(parentId) {
      console.log("parentId",parentId);
      //父页面调用子组件中的内容
      this.$refs.addDept.parentId = parentId;
      this.$refs.addDept.dialogFormVisible = true;
      console.log(" this.$refs.addDept.parentId", this.$refs.addDept.parentId);
      console.log("this.$refs.addDept.dialogFormVisible ",this.$refs.addDept.dialogFormVisible );
    },
    //查看部门
    handleUpdate(id){
       //alert(id);
       //1、根据ID，查询部门；
       find({id:id}).then(res=>{
         console.log("dept:",res.data.data);
               //2、查询的部门绑定到数据模型；
         this.$refs.addDept.dept = res.data.data;
                //3、显示弹出层
         this.$refs.addDept.dialogFormVisible = true;
       })       
    },
     //干掉部门
    handleDelete(id){
       this.$confirm('删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                deleteById({id:id}).then(res=>{
                   this.$message({
                    message: res.data.message,
                    type: res.data.success? 'success':'error'
                  });
                  if(res.data.success){
                    location.reload();
                   }
                });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  
    },
    //构造查询方法
    getList() {
      list().then(res => {
        console.log(res.data.data);
        this.departData = res.data.data;
        //将普通的数据转换为父子接口
        this.depts = commonApi.transformTozTreeFormat(res.data.data.depts);
        console.log(this.depts);
      });
    }
  },
  created: function() {
    this.getList();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-dropdown {
  color: #000000;
}
.el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0px;
}
.el-tree-node__expand-icon {
  color: #ffffff;
}
.generalClassNode {
  padding-left: 20px;
}
.el-tree-node__content {
  font-size: 16px;
  line-height: 36px;
  height: 36px;
}
.custom-tree-node {
  padding-left: 20px;
}
.objectTree {
  overflow: auto;
  z-index: 100;
  width: 300px;
  border: 1px solid #dcdfe6;
  margin-top: 5px;
  left: 70px;
}
.el-tabs__content {
  overflow: initial;
}
.boxpad {
  margin-left: -40px;
}
</style>
<style  rel="stylesheet/scss" lang="scss" scoped>
.el-tree-node__expand-icon {
}
.el-icon-caret-right {
}
.el-tree-node__content {
  font-size: 14px;
  line-height: 36px;
}
.generalClass {
  font-size: 14px;
  line-height: 36px;
  color: #000000;
}
.all {
  position: relative;
  min-height: 100%;
  padding-bottom: 200px;
}
.organization-main:after,
.organization-index-top:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.organization-main {
  font-size: 14px;
  font-size: 14px;
}

.organization-index {
  padding-bottom: 20px;
  margin-left: 20px;
}
.main-top-title {
  padding-left: 20px;
  padding-top: 20px;
  text-align: left;
}

::-webkit-scrollbar-thumb {
  background-color: #018ee8;
  height: 50px;
  outline-offset: -2px;
  outline: 8px solid #fff;
  -webkit-border-radius: 4px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #fb4446;
  height: 50px;
  -webkit-border-radius: 4px;
}
.modal-total {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 90;
  opacity: 0.2;
}
.modal {
  width: 400px;
  height: 300px;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  left: 45%;
  top: 20%;
  text-align: center;
}
.treBox {
  padding: 30px 120px 0;
}
.organization-index-top {
  position: relative;

  .el-tabs-report {
    position: absolute;
    top: -50px;
    right: 15px;
  }
}
.treeCon {
  border-bottom: 1px solid #cfcfcf;
  padding: 10px 0;
  margin-bottom: 10px;
  .el-dropdown {
    color: #333;
  }
}
.treeRinfo {
  display: inline-block;
}
.treeRinfo span {
  padding-left: 30px;
}
</style>
