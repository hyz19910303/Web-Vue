<template>
	<el-menu
        default-active="1"
        class="el-menu-demo"
        text-color="#FFF"
        mode="horizontal"
        background-color="#0A3155"
        active-text-color="#ffd04b">
		<submenus  v-for="menu in menus" :key="menu.code" :menuitem="menu"></submenus>
 	</el-menu>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	import submenus from '@/components/menus/SubMenus'
	Vue.use(ElementUI)
	export default{
		data(){
			return{

			}
		},
		props:{
			menus:{
				type: Array,
				required: true
			}
		},
		components:{
			submenus
		}
	}
</script>

<style type="text/css">
	

</style>