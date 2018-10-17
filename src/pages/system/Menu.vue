<template>
	<div>
		<tablele :headerData="menuHeader" :tableData="menuList"></tablele>
		
		<el-pagination style="float: right"
		  background
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[3, 20, 50, 100]"
	      :page-size="pageSize"
	      layout="sizes, prev, pager, next"
	      :page-count="pagecount">
		</el-pagination>
		
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import tablele from '@/components/table/Table'
	Vue.use(vueResource)
	export default{
		data(){
			return {
				menuList:[],
				menuHeader:[
					{
						prop:'menu_code',
						label:'代码'
					},
					{
						prop:'menu_name',
						label:'名称'
					},
					{
						prop:'menu_url',
						label:'路径'
					},
					{
						prop:'menu_icon',
						label:'图标'
					},
					{
						prop:'menu_type',
						label:'类型'
					}
				]
				,currentPage:1
				,pageSize:3
				,pagecount:0
			}
		},
		components:{
			tablele
		},
		methods:{
			handleSizeChange:function(pagesize){
				const url='/api/menu/list/?pageSize='+pagesize+'&pageNum='+(this.currentPage==1?0:this.currentPage)
				// debugger
				this.$http.get(url).then(response=>{
					if(response.ok){
						const data=response.body;
						this.menuList=data.content
						this.pagecount=data.totalPages
					}
				})
			},
			handleCurrentChange:function(pagenum){
				// debugger
				const url='/api/menu/list/?pageSize='+this.pageSize+'&pageNum='+(pagenum-1)
				this.$http.get(url).then(response=>{
					if(response.ok){
						const data=response.body;
						this.menuList=data.content
						this.pagecount=data.totalPages
					}
				})	
			}
		},
		mounted:function(){
			this.$http.get('/api/menu/list/').then(response=>{
				if(response.ok){
					const data=response.body;
					this.menuList=data.content
					this.pagecount=data.totalPages
				}
			})
		}
	}
</script>

<style type="text/css">
	
</style>