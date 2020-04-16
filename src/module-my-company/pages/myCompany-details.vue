<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
          <el-tabs v-model="activeName" >
            <el-tab-pane label="企业信息" name="first">
               <el-form ref="form" :model="formData" label-width="200px">
                    <el-form-item label="企业名称">
                      <el-input v-model="formData.name" style="width:400px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址">
                      <el-input v-model="formData.companyAddress" style="width:400px" disabled></el-input>
                    </el-form-item>          
                    <el-form-item label="公司电话">
                      <el-input v-model="formData.companyPhone" style="width:400px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="formData.mailbox" style="width:400px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="截止时间">
                      <el-input v-model="formData.expirationDate" style="width:400px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                      <el-input type="textarea" v-model="formData.remark" style="width:400px" disabled></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" >审核</el-button>
                      <el-button>拒绝</el-button>
                    </el-form-item>
                </el-form>
              </el-tab-pane>
            <el-tab-pane label="账户信息" name="second">账户信息</el-tab-pane>
            <el-tab-pane label="交易记录" name="third">交易记录</el-tab-pane>
          </el-tabs>
        
        <!-- end -->
      </el-card>
    </div>
  </div>
</template>

<script>
//引出api 中的list 方法
import { detail } from "@/api/base/myCompanyClient";

export default {
  name: "myCompany-details",
  data() {
    return {
       activeName: "first",
       formData: {}
    };
  },
  methods: {
    getDetail(id){
      detail({id:id}).then(res=>{
        this.formData = res.data.data;
        console.log(res.data.data)
        console.log(id)
      });
    }
  },
  // 创建完毕状态
  created() {
    var id = this.$route.params.id;
    this.getDetail(id);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
