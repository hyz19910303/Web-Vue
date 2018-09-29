<template>
	<div>
		<el-container style=" border: 1px solid #fff">
			<el-header style="text-align: right; font-size: 12px">
		      <el-container direction="horizontal">
		      	<navmenus v-if="mode=='horizontal'" :menus="menus" :mode="mode"></navmenus>
		      	<div  class="setting">
		      		<el-dropdown>
				        <i class="el-icon-setting" style="margin-right: 15px"></i>
				        <el-dropdown-menu slot="dropdown">
				          <el-dropdown-item >查看</el-dropdown-item>
				          <el-dropdown-item>新增</el-dropdown-item>
				          <el-dropdown-item>删除</el-dropdown-item>
				        </el-dropdown-menu>
			      	</el-dropdown>
			      <span @click="test()" style="cursor: pointer">王小虎</span>	
		      	</div>
		      </el-container >
		         
		    </el-header>
		    <el-container>
		    	 <el-container>
		    	<el-aside width="200px" height="500px" style="background-color: rgb(238, 241, 246)">
		    		<navmenus v-if="mode=='vertical'" :menus="menus" :mode="mode"></navmenus>
			  	</el-aside>
			   </el-container>
			  <el-container>
				    <el-main>
				      <!-- <el-table :data="tableData">
				        <el-table-column prop="date" label="日期" width="140">
				        </el-table-column>
				        <el-table-column prop="name" label="姓名" width="120">
				        </el-table-column>
				        <el-table-column prop="address" label="地址">
				        </el-table-column>
				      </el-table> -->
				      <router-view/>
				    </el-main>
				  </el-container>
				</el-container>
		    </el-container>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import navmenus from '@/components/menus/NavMenus'
	//模拟数据
	import { menu } from '../data/menudata.js'
	Vue.use(vueResource)
	
	export default{
		data(){
			const item = {
			        date: '2016-05-02',
			        name: '王小虎',
			        address: '上海市普陀区金沙江路 1518 弄'
				}
			return{
				tableData:Array(10).fill(item),
				menus:menu,
				mode:'vertical'//horizontal || vertical
			}
		},
		components:{
			navmenus
		},
		methods:{
			test(){
				debugger
				if(this.mode=='vertical'){
					this.mode='horizontal'
				}else{
					this.mode='vertical'
				}
				
			}
			
		},
		mounted(){
			//this.menus=menu
			// this.$http.get('/api/list?time=111').then(response=>{
			// 	//console.log(response)
			// 	if(response.ok){
			// 		this.data=response.body
			// 	}
			// },error=>{
			// 	//console.log(error)
			// });	//alert(2)
		}

	}
</script>
<style type="text/css">
.el-row {
  margin-bottom: 20px;
  &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #fff;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  
 .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }


.el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #409EFF;
  }
  .setting{
  	float: right;
  	right: 0px;
  	margin-right: 30px;
  	position: fixed;

  }
</style>