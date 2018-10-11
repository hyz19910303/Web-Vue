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
						prop:'user_name',
						label:'用户名'
					},
					{
						prop:'real_name',
						label:'真实名称'
					},
					{
						prop:'email',
						label:'邮箱'
					},
					{
						prop:'phono_number',
						label:'联系方式'
					}
				]
			}
		},
		components:{
			tablele
		},
		mounted:function(){
			this.$http.get('/api/user/list/').then(response=>{
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