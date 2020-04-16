<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
        <!-- SAAS 企业管理-->
        <!-- 
            <div v-for="(item,index) in dataList" :key="index">
              {{item.id}} + {{item.name}}
            </div> 
        -->
        <!-- elementui  table 组件
              data :数据模型
              el-table-column :构造table 中的每一列
              prop :  数组当中每一个元素对象的属性名
        -->
        <!-- data :数据模型 -->
        <el-table :data="dataList" border style="width: 100%">
          <!-- el-table-column :构造table 中的每一列 -->
          <!-- prop :  数组当中每一个元素对象的属性名 -->
          <el-table-column fixed type="index" prop="date" label="序号" width="50"></el-table-column>
          <el-table-column fixed prop="name" label="企业名称" width="300"></el-table-column>
          <el-table-column fixed prop="version" label="版本" width="200"></el-table-column>
          <el-table-column fixed prop="companyPhone" label="联系电话" width="200"></el-table-column>
          <el-table-column fixed prop="expirationDate" label="截至时间" width="200"></el-table-column>
          <el-table-column fixed prop="companyAddress" label="所在地区" width="300"></el-table-column>
          <el-table-column fixed prop="state" label="状态" width="150">
            <!--scope:传递当前行的所有数据 -->
            <template slot-scope="scope">
              <!-- 开关组件 
                 active-value : 激的数据值；1表示激
                 active-color:激活的颜色；
                 inactive-value: 未激的数据值；0表示激
                 inactive-color： 未激活的颜色；
               -->
              <el-switch 
                v-model="scope.row.status" 
                active-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949"
                 disabled ></el-switch>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <!-- 注意拼接地址 to 前加 ：-->
              <router-link :to="'/saas-clients/details/'+scope.row.id">查看</router-link>
    
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
import { list } from "@/api/base/saasClient";

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
