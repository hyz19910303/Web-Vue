<template>
	<div>
		<el-button type="primary" @click="addUser" size="medium" style="margin-left: 100px" icon="el-icon-plus" round>添加</el-button>
		<el-table
		    :data="userList"
		    :highlight-current-row=true
		    :height="450"
		    style="width: 100%">
		    <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
		    <el-table-column prop="real_name" label="真实名称" align="center"></el-table-column>
		    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
		    <el-table-column prop="phono_number" label="联系方式" align="center"></el-table-column>
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
		<addOrUpdateUser ref="addOrUpdateUser"  @addUserCallBack="addUserCallBack"></addOrUpdateUser>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import addOrUpdateUser from './addOrUpdateUser'
	import {remove} from '../../util/util'
	Vue.use(vueResource)
	export default{
		data(){
			return {
				userList:[]
				,currentPage:1
				,pageSize:10
				,pagecount:0
				,dialogFormVisible:false
			}
		},
		components:{
			addOrUpdateUser//tableheader,tablele
		},
		methods:{
			addUser:function(callbackdata){
				var addOrUpdateUser=this.$refs.addOrUpdateUser
				addOrUpdateUser.dialogUserFormVisible=true
				addOrUpdateUser.title="新增用户"
				
			},
			addUserCallBack:function(obj){
				debugger
				var inlist,index;
				for(var i=0;i<this.userList.length;i++){
					if(obj.user_id==this.userList[i].user_id){
						inlist=true;
						index=i;
						break;
					}
				}
				if(inlist){
					this.userList[index]=obj;
				}else{
					this.userList.push(obj);
				}
			},
			handleEdit:function(scope,obj, row){
				let copy = JSON.parse(JSON.stringify(obj));
				var addOrUpdateUser=this.$refs.addOrUpdateUser
				addOrUpdateUser.dialogUserFormVisible=true
				addOrUpdateUser.title='修改用户信息'
				addOrUpdateUser.userform=copy
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
			         const url='/api/user/delete/'+obj.user_id
			         this.$http.post(url).then((response)=>{
			         	if(response.ok && response.body.success){
			         		
			         		remove(this.userList,obj);
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
				const url='/api/user/list/?pageSize='+pagesize+'&pageNum='+(this.currentPage==1?0:this.currentPage)
				this.$http.get(url).then(response=>{
					if(response.ok && response.body.success){
						const userdata=response.body;
						that.userList=userdata.data.content
						that.pagecount=userdata.data.totalPages
					}
				})
			},
			handleCurrentChange:function(pagenum){
				const url='/api/user/list/?pageSize='+this.pageSize+'&pageNum='+(pagenum-1)
				var that=this;
				this.$http.get(url).then(response=>{
					if(response.ok && response.body.success){
						const userdata=response.body;
						that.userList=userdata.data.content
						that.pagecount=userdata.data.totalPages
					}
				})	
			}
		},
		mounted:function(){
			const url='/api/user/list/?pageSize='+this.pageSize+'&pageNum='+(this.currentPage==1?0:this.currentPage)
			this.$http.get(url).then(response=>{
				if(response.ok && response.body.success){
					const data=response.body.data;
					this.userList=data.content
					this.pagecount=data.totalPages
				}
			})
		}
	}
</script>

<style type="text/css">
	
</style>