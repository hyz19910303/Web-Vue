<template>
	<el-table
    :data="tableData"
    :highlight-current-row=true
    :height="450"
    style="width: 100%">
    <tableheader :headerData="headerData"></tableheader>
  </el-table>

</template>
<script type="text/javascript">
	import Vue from 'vue'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	import tableheader from '@/components/table/TableHeader'
	Vue.use(ElementUI)
	export default{
		name:'tablele',
		data(){
			return {

			}
		},
		props:{
			tableData:{
				type:Array,
				required:true
			},
			headerData:{
				type:Array,
				required:true
			}
		},
		components:{
			tableheader
		}
	}
	
</script>

<style type="text/css">
	

</style>