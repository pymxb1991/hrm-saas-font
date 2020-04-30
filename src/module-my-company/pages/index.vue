<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
        <el-table :data="dataList" border style="width: 100%">
          <el-table-column fixed type="index" prop="date" label="序号" width="50"></el-table-column>
          <el-table-column fixed prop="name" label="企业名称" width="300"></el-table-column>
          <el-table-column prop="version" label="当前版本" width="200"></el-table-column>
          <el-table-column prop="legalRepresentative" label="联系人" width="200"></el-table-column>
          <el-table-column prop="companyPhone" label="联系电话" width="200"></el-table-column>
          <el-table-column prop="companyAddress" label="所在地区" width="400"></el-table-column>
          <el-table-column prop="companySize" label="公司规模" width="200"></el-table-column>
          <el-table-column prop="industry" label="所属行业" width="200"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" width="200"></el-table-column>
          <el-table-column prop="expirationDate" label="结束时间" width="200"></el-table-column>
          <el-table-column prop="state" label="状态" width="120">
            <template  slot-scope="scope">
              <el-switch 
                v-model="scope.row.status" 
                active-color="#13ce66" 
                inactive-color="#ff4949"
                @change="handleStatus(scope.row)"
                ></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <router-link :to="'/myCompany-clients/details/'+ scope.row.id">查看</router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
      </el-card>
    </div>
  </div>
</template>

<script>
//引出api 中的list 方法
import { list } from "@/api/base/myCompanyClient";

export default {
  name: "saas-clients-index",
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    // 获取列表数据
    getList() {
      //调用API发起请求
      //发起请求，必然有响应，如何获取响应，借助then(),获取响应结果
      //res=响应数据
      list().then(res => {
        this.dataList = res.data.data;
        console.log(res.data);
      });
    },
    //状态切换
    handleStatus(scopeRowData){
        console.log(scopeRowData);
    }
  },
  // 创建完毕状态
  created() {
    this.getList();
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
