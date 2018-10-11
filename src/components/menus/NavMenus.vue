<template>
		<el-menu

        default-active="1"
        class="el-menu-demo "
        text-color="#000000"
        style="border-bottom: inherit"
        :mode="mode?mode:horizontal"
        
        @select="handleSelect"
        :background-color="backgroundcolor?backgroundcolor:'#fff'"
        :collapse="mode=='vertical'?isCollapse:false"
        active-text-color="#ffd04b">
		<submenus :mode='mode' v-for="menu in menus" :key="menu.code" :menuitem="menu"></submenus>
 		</el-menu>
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
				router:true
			}
		},
		props:{
			menus:{
				type: Array,
				required: true
			},mode:{
				type:String
			},isCollapse:{
				type:Boolean
			},backgroundcolor:{
				type:String
			}
		},
		methods:{
			handleSelect(selectpath, keyPathArr){
				//Router.push(keyPath);
				// debugger
				var router=this.$router;
				var routes=router['history']['current'];
				var currentPath=routes['fullPath'];

				this.$router.push('/'+selectpath);
				// if(routes && currentPath.indexOf(selectpath)==-1){
				// 	this.$router.push(this.parseMenus(selectpath));
				// }
				//this.$router.push(this.parseMenus(selectpath));
				console.log(this.parseMenus(selectpath));
				
			},
			parseMenus(selectpath){
				var routes=this.$router.options.routes;
				return this.getRoutePath(routes,selectpath);
			},
			getRoutePath(routes,selectpath){
				for(var i=0;i<routes.length;i++){
					var parentPath=routes[i]['path'];
					var childrenPath=routes[i]['children'];
					if(parentPath && parentPath==selectpath){
						return parentPath;
					}else if(childrenPath && childrenPath.length>0){
						var children=this.getRoutePath(childrenPath,selectpath);
						if(children){
							return parentPath+'/'+children;
						}
						return selectpath;
					}
				}
				return null;
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
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  


</style>