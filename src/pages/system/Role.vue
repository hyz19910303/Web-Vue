<template>
	<tablele :headerData="roleHeader" :tableData="roleList"></tablele>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import tablele from '@/components/table/Table'
	Vue.use(vueResource)
	export default{
		data(){
			return {
				roleList:[],
				roleHeader:[
					{
						prop:'role_name',
						label:'角色名称'
					},
					{
						prop:'role_code',
						label:'角色代码'
					},
					{
						prop:'role_remark',
						label:'备注'
					},
					{
						prop:'create_time',
						label:'创建时间'
					}
				]
			}
		},
		components:{
			tablele
		},
		mounted:function(){
			this.$http.get('/api/role/list/').then(response=>{
				if(response.ok){
					
					this.roleList=response.body
				}
			})
		}
	}
</script>

<style type="text/css">
	
</style>