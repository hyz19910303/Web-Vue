<template>
	<el-dialog :title="title" top="10vh" :visible.sync="dialogRoleFormVisible" @close="close('roleform')" :before-close="beforeClose">
	  <el-form :model="roleform" ref="roleform" :rules="rolerules" size="small" :status-icon="true">
	    <el-form-item prop="role_name" label="角色名" :label-width="formLabelWidth">
	      <el-input v-model="roleform.role_name" autocomplete="off" value="roleform.role_name"></el-input>
	    </el-form-item>
	    <el-form-item prop="role_code" label="角色代码" :label-width="formLabelWidth">
	       <el-input v-model="roleform.role_code" autocomplete="off" value="roleform.role_code"></el-input>
	    </el-form-item>
	    <el-form-item prop="role_remark" label="备注" :label-width="formLabelWidth">
	       <el-input v-model="roleform.role_remark" autocomplete="off" value="roleform.role_remark"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogRoleFormVisible = false" size="medium">取 消</el-button>
	    <el-button type="primary" @click="handleSaveRole('roleform')" size="medium">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	Vue.use(ElementUI);

	export default {
		name:'addOrUpdateUser',
		data(){
			return {
				title:'新增角色',
				 roleform: {
			          role_name: '',
			          role_code: '',
			          role_remark: ''
		        },
		        rolerules:{
		        	role_name: [
			            { required: true, message: '请输入角色名', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
			         ],
			        role_code:[
			        	{ required: true, message: '请输入角色代码', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
			        ],
			        role_remark:[
			        	{ required: true, message: '请输入角色备注', trigger: 'blur' },
			        	{ min:2,max:20,message: '长度在2 到 20 个字符', trigger: ['blur', 'change'] }
			        ]
		        },
		        formLabelWidth: '120px',
		        dialogRoleFormVisible:false
			}
		},
		props:{
			//  title:{
			// 	type:String,
			// 	required:true
			// }
		},
		methods:{
			close:function(roleform){
				//清除内容
				
				var model=this.$refs[roleform].model;
				for(var field in model){
					model[field]='';
				}
				
			},
			beforeClose:function(done){
				this.dialogRoleFormVisible=false
			},
			//保存新增角色或者修改角色信息
			handleSaveRole:function(roleform){
				var  that=this;
				this.$refs[roleform].validate((valid)=>{
					if(valid){
						var roleforms=that.$refs[roleform]
						var fileds=roleforms.model;
						const url=this.$http.autoPrefix('role/add/')
						that.$http.post(url,JSON.stringify(fileds),{emulateJSON:true}).then(response=>{
							var role=response.body.data;
							//回调父组件  将user添加到列表里面 通过addUserToList方法
							that.$emit('addRoleCallBack',role)
							that.$message({
					          message: '操作成功',
					          type: 'success'
					        });
						},error=>{
							that.$message.error('操作失败');
						});
						this.dialogRoleFormVisible=false
					}else{
						return false;
					}
				})
				
			}
		}
	}
</script>
<style type="text/css">
	
</style>