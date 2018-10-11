<template>
	<div>
		<el-table-column v-for=" head in  headerData" :key=head.label
	      :prop="head.prop"
	      :label="head.label"
	      align="center"
	      :formatter="formatter"
	      >
		  <template v-if="head.subheads && head.subheads.length>0">
		  	<tableheader :headerData="head.subheads"></tableheader>
		  </template>
	    </el-table-column>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	import tableheader from '@/components/table/TableHeader'
	Vue.use(ElementUI)
	export default{
		name:'tableheader',
		data(){
			return {

			}
		},props:{
			headerData:{
				type:Array,
				required:true
			},
			formatter:{
				type:Function,
				required:false
			}
		},components:{
	      tableheader
	  }
	}

</script>
<style type="text/css">
	
</style>