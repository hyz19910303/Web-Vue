<template>
	<div>
		<!-- <el-button type="primary" @click="addMenu" size="medium" style="margin-left: 100px" icon="el-icon-plus" round>添加</el-button> -->
		<el-table
		    :data="menuList"
		    :highlight-current-row=true
		    :height="600"
		    style="width: 100%">
		    <el-table-column  label="序号" align="center">
		    	<template slot-scope="scope">
		    		{{ scope.$index+1 }}
		    	</template>
		    </el-table-column>
		    <treeTableColum
				prop="menu_name"
		        header-align="center"
		        treeKey="menu_id"
		        width="150"
		        label="名称">
		    </treeTableColum>
		    <el-table-column prop="menu_url" label="URL" align="center"></el-table-column>
		    <el-table-column  prop="menu_icon" label="图标" align="center">
		    	<template slot-scope="scope">
		          <el-button  size="mini" :icon="scope.row.menu_icon || ''" circle></el-button>
		        </template>
		    </el-table-column>
		    <el-table-column prop="menu_type" label="类型" align="center" >
		    	<template slot-scope="scope">
		          <el-tag v-if="scope.row.menu_type === '1'" size="small">目录</el-tag>
		          <el-tag v-else-if="scope.row.menu_type === '2'" size="small" type="success">菜单</el-tag>
		          <el-tag v-else-if="scope.row.menu_type === '3'" size="small" type="info">按钮</el-tag>
		        </template>
		    </el-table-column>
		    <el-table-column prop="order_no" label="序号" align="center"></el-table-column>
		    <el-table-column label="操作" align="center">
		    	<template slot-scope="scope">
        			<el-dropdown @click="handleDropDownClick(scope.$index, scope.row)" split-button size="mini"   type="primary">
						添加
						<el-dropdown-menu slot="dropdown">
					     <el-dropdown-item command="edit">
					     	<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					     </el-dropdown-item>
					     <el-dropdown-item command="delete">
					     	<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					     </el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
		    	</template>
		    </el-table-column>
		  </el-table>
		<addOrUpdateMenu ref="addOrUpdateMenu"  @addMenuCallBack="addMenuCallBack"></addOrUpdateMenu>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import treeTableColum from '@/components/table/TreeTableColumn'
	import addOrUpdateMenu from './addOrUpdateMenu'
	import {remove} from '../../util/util'
	export default{
		data(){
			return {
				menuList:[]
				,currentPage:1
				,pageSize:3
				,pagecount:0
				,dialogFormVisible:false
			}
		},
		components:{
			addOrUpdateMenu,treeTableColum//tableheader,tablele
		},
		methods:{
			addMenu:function(menu){
				var addOrUpdateMenu=this.$refs.addOrUpdateMenu
				addOrUpdateMenu.dialogMenuFormVisible=true
				addOrUpdateMenu.title="新增菜单"
				addOrUpdateMenu.menuTreeData=this.menuList
			},
			addMenuCallBack:function(obj){
				//TODO
				this.menuList.push(obj);
			},
			handleEdit:function(scope,obj, row){
				let copy = JSON.parse(JSON.stringify(obj));
				var addOrUpdateMenu=this.$refs.addOrUpdateMenu
				addOrUpdateMenu.dialogMenuFormVisible=true
				addOrUpdateMenu.title='修改菜单信息'
				addOrUpdateMenu.menuform=copy
				addOrUpdateMenu.menuTreeData=this.menuList
			},
			handleDropDownClick:function(scope,obj, row){
				// this.handleEdit(scope,obj, row);
				this.addMenu(obj);
			},
			handleDelete:function(scope,obj, row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	 const url=this.$http.autoPrefix('menu/delete/')+obj.user_id;
			         this.$http.post(url).then((response)=>{
			         	if(response.ok && response.body.success){
			         		remove(this.menuList,obj);
			         		this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
			         	}
			         });
		        }).catch((e) => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			}
			
		},
		mounted:function(){
			var url=this.$http.autoPrefix('user/menus/');
			this.$http.get(url+this.userid).then(response=>{
				if(response.ok && response.body.success){
					this.menuList=[response.body.data]
					// this.menuList=response.body.data.submenus
				}
			})
		}
	}
</script>

<style type="text/css">
	
</style>