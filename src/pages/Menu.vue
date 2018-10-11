<template>
	<tablele :headerData="userHeader" :tableData="userList"></tablele>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import tablele from '@/components/table/Table'
	Vue.use(vueResource)
	export default{
		data(){
			return {
				userList:[],
				userHeader:[
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
			}
		},
		components:{
			tablele
		},
		mounted:function(){
			this.$http.get('/api/menu/list/').then(response=>{
				if(response.ok){
					debugger
					this.userList=response.body
				}
			})
		}
	}
</script>

<style type="text/css">
	
</style>