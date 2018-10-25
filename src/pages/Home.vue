<template>
	<div>
		<el-container style=" border: 1px solid #fff">
			<el-header style="text-align: right; font-size: 12px;height: auto">
		      <el-container direction="horizontal">
		      	<span style="font-family: Helvetica Neue;font-size:20px">后台管理系统</span>
		      	<span style="cursor:pointer;">
		      		<i v-if="mode=='vertical'" @click="showOrhideSubmenu" class="el-icon-view" style="font-size:16px;margin-left:10px;vertical-align: middle"></i>
		      	</span>
		      	<navmenus v-if="mode=='horizontal'" :menus="menus" :mode="mode" backgroundcolor="#409EFF"></navmenus>
		      	<div @click="test()" class="changemenustyle">
		      		<i style="font-size: 14px;vertical-align: middle" class="el-icon-menu" ></i>
		      	</div>
		      	<div  class="setting">
		      		<el-dropdown @command="handleCommand">
				        <i class="el-icon-setting" style="margin-right: 15px"></i>
				        <el-dropdown-menu slot="dropdown">
				          <el-dropdown-item >查看</el-dropdown-item>
				          <el-dropdown-item>新增</el-dropdown-item>
				          <el-dropdown-item>删除</el-dropdown-item>
				        </el-dropdown-menu>
			      	</el-dropdown>
			      <span  style="cursor: pointer">王小虎</span>	
		      	</div>
		      </el-container >
		    </el-header>
		    <el-container>
		    	 <el-container v-if="mode=='vertical'">
			    	<el-aside :width="width" :height="height" >
			    		<navmenus v-if="mode=='vertical'" :menus="menus" :mode="mode" :isCollapse="isCollapse"></navmenus>
				  	</el-aside>
			   </el-container>
			  <el-container>
				    <el-main>
				      <router-view/>
				    </el-main>
				  </el-container>
				</el-container>
		    </el-container>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	// import vueResource from 'vue-resource'
	import navmenus from '@/components/menus/NavMenus'
	import tablele from '@/components/table/Table'
	//模拟数据
	import { menu } from '../data/menudata.js'
	// Vue.use(vueResource)
	
	export default{
		data(){
			
			return{
				menus:[],
				mode:'vertical'//horizontal || vertical
				,isCollapse:false,
				height:'400px',
				width:'200px',
			}
		},
		// props:{
		// 	'userid':{
		// 		type: String,
		// 		required: true
		// 	}
		// },
		components:{
			navmenus,tablele
		},
		methods:{
			test(){
				if(this.mode=='vertical'){
					this.mode='horizontal'
				}else{
					this.mode='vertical'
				}
				
			},
			handleCommand(){
				// debugger
			},
			showOrhideSubmenu(){
				this.isCollapse=this.isCollapse?false:true;
				
				if(this.isCollapse){
					//console.log(this.width);
					this.width='100px';
				}else{
					this.width='200px'
				}
			}
			
		},
		mounted(){
			var url=this.$http.autoPrefix('user/menus/');
			this.$http.get(url+this.userid).then(response=>{
				if(response.ok && response.body.success){
					this.menus=response.body.data.submenus
				}else{
					this.menus=menu
				}
			},error=>{
				//console.log(error)
			});	
		}

	}
</script>
<style >
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
    color: #6B89A6;
  }
  .setting{
  	float: right;
  	right: 0px;
  	margin-right: 30px;
  	position: absolute;

  }
  .changemenustyle{
  	position: absolute;
    float: right;
    right: 120px;
    cursor:pointer;
  }
</style>