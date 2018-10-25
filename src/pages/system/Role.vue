<template>
	<div>
		<el-button type="primary" @click="addRole" size="medium" style="margin-left: 100px" icon="el-icon-plus" round>添加</el-button>
		<el-table
		    :data="roleList"
		    :highlight-current-row=true
		    :height="450"
		    style="width: 100%">
		    <el-table-column prop="role_name" label="角色名称" align="center"></el-table-column>
		    <el-table-column prop="role_code" label="角色代码" align="center"></el-table-column>
		    <el-table-column prop="role_remark" label="备注" align="center"></el-table-column>
		    <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
		    <el-table-column label="操作" align="center">
		    	<template slot-scope="scope">
		    		<!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
        			<!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        			<el-dropdown @click="handleDropDownClick(scope.$index, scope.row)" split-button size="mini"   type="primary">
						编辑
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
		<el-pagination style="float: right"
		  background
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[10, 20, 50, 100]"
	      :page-size="pageSize"
	      layout="sizes, prev, pager, next"
	      :page-count="pagecount">
		</el-pagination>
		<addorUpdateRole ref="addorUpdateRole"  @addRoleCallBack="addRoleCallBack"></addorUpdateRole>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import addorUpdateRole from './addOrUpdateRole'
	import {remove} from '../../util/util'
	Vue.use(vueResource)
	export default{
		data(){
			return {
				roleList:[]
				,currentPage:1
				,pageSize:10
				,pagecount:0
				,dialogFormVisible:false
			}
		},
		components:{
			addorUpdateRole//tableheader,tablele
		},
		methods:{
			addRole:function(callbackdata){

				var addorUpdateRole=this.$refs.addorUpdateRole
				addorUpdateRole.dialogRoleFormVisible=true
				addorUpdateRole.title="新增角色"
			},
			addRoleCallBack:function(obj){
				var inlist,index;
				for(var i=0;i<this.roleList.length;i++){
					if(obj.role_id==this.roleList[i].role_id){
						inlist=true;
						index=i;
						break;
					}
				}
				if(inlist){
					this.roleList[index]=obj;
				}else{
					this.roleList.push(obj);
				}
			},
			handleEdit:function(scope,obj, row){
				// var clone_obj=obj;
				let copy = JSON.parse(JSON.stringify(obj));
				var addorUpdateRole=this.$refs.addorUpdateRole
				addorUpdateRole.dialogRoleFormVisible=true
				addorUpdateRole.title='修改角色信息'
				addorUpdateRole.roleform=copy
			},
			handleDropDownClick:function(scope,obj, row){
				this.handleEdit(scope,obj, row);
			},
			handleDelete:function(scope,obj, row){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	 const url=this.$http.autoPrefix('role/delete/')+obj.role_id
			         this.$http.post(url).then((response)=>{
			         	if(response.ok && response.body.success){
			         		remove(this.roleList,obj);
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
			},
			handleSizeChange:function(pagesize){
				var that=this;
				const url=this.$http.autoPrefix('role/list/')+'?pageSize='+pagesize+'&pageNum='+(this.currentPage==1?0:this.currentPage)
				this.$http.get(url).then(response=>{
					if(response.ok && response.body.success){
						const roledata=response.body;
						that.roleList=roledata.data.content
						that.pagecount=roledata.data.totalPages
					}
				})
			},
			handleCurrentChange:function(pagenum){
				const url=this.$http.autoPrefix('role/list/')+'?pageSize='+this.pageSize+'&pageNum='+(pagenum-1)
				var that=this;
				this.$http.get(url).then(response=>{
					if(response.ok && response.body.success){
						const roledata=response.body;
						that.roleList=roledata.data.content
						that.pagecount=roledata.data.totalPages
					}
				})	
			}
		},
		mounted:function(){
			const url=this.$http.autoPrefix('role/list/')+'?pageSize='+this.pageSize+'&pageNum='+(this.currentPage==1?0:this.currentPage)
			this.$http.get(url).then(response=>{
				if(response.ok && response.body.success){
					const data=response.body.data;
					this.roleList=data.content
					this.pagecount=data.totalPages
				}
			})
		}
	}
</script>

<style type="text/css">
	
</style>