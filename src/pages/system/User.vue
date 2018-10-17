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
		    		<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        			<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		    	</template>
		    </el-table-column>
		  </el-table>
		<el-pagination style="float: right"
		  background
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[3, 20, 50, 100]"
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
	import remove from '../../util/util'
	Vue.use(vueResource)
	export default{
		data(){
			return {
				userList:[]
				,currentPage:1
				,pageSize:3
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
				
			},
			addUserCallBack:function(obj){
				this.userList.push(obj);
			},
			handleEdit:function(scope,obj, row){
				var addOrUpdateUser=this.$refs.addOrUpdateUser
				addOrUpdateUser.dialogUserFormVisible=true
				addOrUpdateUser.title='修改用户信息'
				addOrUpdateUser.userform=obj
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
			         		debugger
			         		remove(this.userList,obj);
			         		this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
			         	}
			         });
		        }).catch((e) => {
		        	debugger
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			handleSizeChange:function(pagesize){
				const url='/api/user/list/?pageSize='+pagesize+'&pageNum='+(this.currentPage==1?0:this.currentPage)
				this.$http.get(url).then(response=>{
					if(response.ok){
						const data=response.body;
						this.userList=data.content
						this.pagecount=data.totalPages
					}
				})
			},
			handleCurrentChange:function(pagenum){
				const url='/api/user/list/?pageSize='+this.pageSize+'&pageNum='+(pagenum-1)
				this.$http.get(url).then(response=>{
					if(response.ok){
						const data=response.body;
						this.userList=data.content
						this.pagecount=data.totalPages
					}
				})	
			}
		},
		mounted:function(){
			this.$http.get('/api/user/list/').then(response=>{
				
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