<template>
	<div>
		<el-menu
        default-active="1"
        class="el-menu-demo"
        text-color="#FFF"
        mode="horizontal"
        @select="handleSelect"
        background-color="#0A3155"
        active-text-color="#ffd04b">
		<submenus  v-for="menu in menus" :key="menu.code" :menuitem="menu"></submenus>
 		</el-menu>
 		
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import Router from 'vue-router'
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
		methods:{
			handleSelect(key, keyPathArr){
				//Router.push(keyPath);
				//debugger
				var router=this.$router;
				const currentpath='/'+key;
				var routes=router['history']['current'];
				if(routes && routes['fullPath']!=currentpath){
					this.$router.push(key);
				}
				//console.log(this.$router);
				
				
				//console.log(keyPath);
			},
			parseMenus(menuparam){
				var navmunu=menuparam;
				for(var i=0;i<navmunu.length;i++){
					if(navmunu[i].urltype=='1' || navmunu[i].urltype==1){
						this.parseMenus(navmunu[i]['submenus']);
					}
					if(navmunu[i].urltype=='2' || navmunu[i].urltype==2){
						this.$router.push(navmunu[i].url);
					}
				}
			}
		},
		components:{
			submenus
		},
		mounted(){
			//this.parseMenus(this.menus);
		}
	}
</script>

<style type="text/css">
	

</style>