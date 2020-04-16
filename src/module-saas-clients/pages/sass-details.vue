<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
        <!-- SAAS 企业管理详情-->
        <el-tabs v-model="activeName">
          <el-tab-pane label="企业信息" name="first">
            <!-- 企业信息 -->
            <!-- form 表单
                 model：双向绑定的数据对象  formData
             -->
            <el-form ref="form" :model="formData" label-width="200px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" style="width:200px" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress"  style="width:200px" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone"  style="width:200px" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox"   style="width:200px" disabled></el-input>
              </el-form-item>
              <el-form-item label="截止时间">
                <el-input v-model="formData.expirationDate"  style="width:200px" disabled></el-input>
              </el-form-item>
              <el-form-item label="备注" >
                <el-input type="textarea" v-model="formData.remark" style="width:200px"></el-input>
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
import { detail } from "@/api/base/saasClient";

export default {
  name: "saas-clients-detail",
  data() {
    return {
      activeName: "first",
      formData: {}
    };
  },
  methods: {
    // 获取列表数据
    getDetail(id) {
      //调用API发起请求（调用APi 需要传一个参数ID）
      //发起请求，必然有响应，如何获取响应，借助then(),获取响应结果
      //res=响应数据
      detail({ id: id }).then(res => {
        this.formData = res.data.data;
        console.log(id);
        console.log(res.data.data);
      });
    }
  },
  // 创建完毕状态
  created() {
    // 得到地址参数的ID值 
    var id = this.$route.params.id;
    //create 调取 methods 中方法，this必须增加
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
