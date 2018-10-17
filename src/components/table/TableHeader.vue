<template>
	<div>
		<template v-for=" (head,index) in  headerData">
			<el-table-column 
		      :prop="head.prop"
		      :label="head.label"
		      align="center"
		      >
			  <template v-if="head.subheads && head.subheads.length>0">
			  	<tableheader :headerData="head.subheads"></tableheader>
			  </template>
		    </el-table-column>
		</template> 
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
			}
		},components:{
	      tableheader
	  }
	}

</script>
<style type="text/css">
	
</style>