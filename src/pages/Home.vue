<template>
	<div>
		<el-row>
			<el-col >
       	 		<navmenus :menus="menus"></navmenus>
			</el-col>
		</el-row>
		<router-view/>
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
			return{
				data:[],
				menus:menu
			}
		},
		components:{
			navmenus
		},
		methods:{
			test(){
				alert(1)
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
    background: #99a9bf;
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

</style>