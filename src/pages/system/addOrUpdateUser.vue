<template>
	<el-dialog :title="title" top="10vh" :visible.sync="dialogUserFormVisible" @close="close('userform')" :before-close="beforeClose">
	  <el-form :model="userform" ref="userform" :rules="userules" size="small" :status-icon="true">
	    <el-form-item prop="user_name" label="用户名" :label-width="formLabelWidth">
	      <el-input v-model="userform.user_name" autocomplete="off" value="userform.user_name"></el-input>
	    </el-form-item>
	    <el-form-item prop="real_name" label="真实名称" :label-width="formLabelWidth">
	       <el-input v-model="userform.real_name" autocomplete="off" value="userform.real_name"></el-input>
	    </el-form-item>
	    <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
	       <el-input type='password' v-model="userform.password" autocomplete="off" value="userform.password"></el-input>
	    </el-form-item>
	    <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
	       <el-input v-model="userform.email" autocomplete="off" value="userform.email"></el-input>
	    </el-form-item>
	    <el-form-item prop="phono_number" label="电话号码" :label-width="formLabelWidth">
	       <el-input v-model="userform.phono_number" autocomplete="off" value="userform.phono_number"></el-input>
	    </el-form-item>
	    <el-form-item prop="expire_time" label="过期时间" :label-width="formLabelWidth">
	       <!-- <el-input v-model="userform.expire_time" autocomplete="off"></el-input> -->
	       <el-date-picker type="date" placeholder="选择日期" value="userform.expire_time" v-model="userform.expire_time" style="width: 100%;"></el-date-picker>
	    </el-form-item>
	    <el-form-item prop="forbid_ips" label="禁止IP" :label-width="formLabelWidth">
	       <el-input v-model="userform.forbid_ips" value="userform.forbid_ips" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogUserFormVisible = false" size="medium">取 消</el-button>
	    <el-button type="primary" @click="handleSaveUser('userform')" size="medium">确 定</el-button>
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
				title:'新增用户',
				 userform: {
			          user_name: '',
			          real_name: '',
			          email: '',
			          phono_number: '',
			          password: '',
			          expire_time: '',
			          forbid_ips: ''
		        },
		        userules:{
		        	user_name: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
			         ],
			        real_name:[
			        	{ required: true, message: '请输入真实姓名', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
			        ],
			        email:[
			        	{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
			        	{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
			        ],
			        phono_number:[
			        	{ required: true, message: '请输入电话号码', trigger: 'blur' },
			        	{ min: 8, max: 11, message: '长度在 4 到 20 个字符', trigger: 'blur' }
			        ],
			        password:[
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
			        	{ min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
			        ]
		        },
		        formLabelWidth: '120px',
		        dialogUserFormVisible:false
			}
		},
		props:{
			//  title:{
			// 	type:String,
			// 	required:true
			// }
		},
		methods:{
			close:function(userform){
				var model=this.$refs[userform].model;
				for(var field in model){
					model[field]='';
				}
			},
			beforeClose:function(done){
				
				this.dialogUserFormVisible=false
				
			},
			//保存新增用户
			handleSaveUser:function(userform){
				var  that=this;
				this.$refs[userform].validate((valid)=>{
					if(valid){
						var userforms=that.$refs[userform]
						var fileds=userforms.model;
						const url='/api/user/add/'
						that.$http.post(url,JSON.stringify(fileds),{emulateJSON:true}).then(response=>{
							var user=response.body.data;
							//回调父组件  将user添加到列表里面 通过addUserCallBack方法
							that.$emit('addUserCallBack',user)
							that.$message({
					          message: '操作成功',
					          type: 'success'
					        });
						},error=>{
							that.$message.error('操作失败');
						});
						this.dialogUserFormVisible=false
					}else{
						return false;
					}
				})
				// this.dialogUserFormVisible=false
			}
		}
	}
</script>
<style type="text/css">
	
</style>