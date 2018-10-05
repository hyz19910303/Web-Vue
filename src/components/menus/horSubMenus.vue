<template>
      <el-submenu :index="menuitem.menu_url?menuitem.menu_url:menuitem.menu_code" v-if="menuitem.submenus&&menuitem.submenus.length>0">
       <template slot="title" >
          <i v-if="menuitem.menu_type==='1'&& menuitem.menu_icon  && mode=='vertical'" :class="menuitem.menu_icon"></i>
          <span slot="title">{{menuitem.menu_name}}</span>
      </template>
       <el-menu-item :index="submenu.menu_url" v-if="!submenu.submenus" v-for=" submenu in menuitem.submenus" :key="submenu.menu_code" >    {{submenu.menu_name}}
       </el-menu-item>
        <submenus :menuitem="submenu" v-if="submenu.submenus" v-for=" submenu in menuitem.submenus" :key="submenu.menu_code">
       </submenus>
    </el-submenu>
    <!-- <el-menu-item  :index="menuitem.menu_url?menuitem.menu_url:menuitem.menu_code"  v-else>{{menuitem.menu_name}}</el-menu-item> -->
</template>

<script type="text/javascript">
	import Vue from 'vue'
 //    import ElementUI from 'element-ui'
	// import 'element-ui/lib/theme-chalk/index.css'
	import submenus from '@/components/menus/horSubMenus'
	//Vue.use(ElementUI)
	export default{
		name:'submenus',
		data(){
			return {

			}
		},
		props:['menuitem','mode'],
		components: {
	      submenus
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