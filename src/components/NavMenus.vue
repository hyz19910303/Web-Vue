<template>
	<el-submenu :index="menuitem.url?menuitem.url:menuitem.code" v-if="menuitem.submenus&&menuitem.submenus.length>0">
	<template slot="title" >{{menuitem.name}}</template>
	<el-menu-item  :index="submenu.url"   v-if="!submenu.submenus" v-for=" submenu in menuitem.submenus" :key="submenu.code" >{{submenu.name}}
	</el-menu-item>
		<navmenus :menuitem="submenu" v-if="submenu.submenus" v-for=" submenu in menuitem.submenus" :key="submenu.code"> </navmenus>
	</el-submenu>
	<el-menu-item  :index="menuitem.url?menuitem.url:menuitem.code"  v-else >{{menuitem.name}}</el-menu-item>
</template>

<script type="text/javascript">
	import Vue from 'vue'
    import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	import navmenus from '@/components/NavMenus'
	Vue.use(ElementUI)
	export default{
		name:'navmenus',
		data(){
			return {

			}
		},
		props:['menuitem'],
		components: {
	      navmenus
	    }
	}
	
</script>

<style type="text/css">
.el-row {
  margin-bottom: 20px;
  &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  
 .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>