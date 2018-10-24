<template>
	<el-dialog :title="title" top="10vh" :visible.sync="dialogMenuFormVisible" :open="onOpen" :before-close="beforeClose">
	  <el-form :model="menuform" ref="menuform" :rules="userules" size="small" :status-icon="true">
	    <el-form-item prop="menu_name" label="菜单名称" :label-width="formLabelWidth">
	      <el-input v-model="menuform.menu_name" autocomplete="off" value="menuform.menu_name"></el-input>
	    </el-form-item>
	    <el-form-item prop="menu_url" label="菜单URL" :label-width="formLabelWidth">
	       <el-input v-model="menuform.menu_url" autocomplete="off" value="menuform.menu_url"></el-input>
	    </el-form-item>
	    <el-form-item prop="menu_code" label="菜单代码" :label-width="formLabelWidth">
	       <el-input  v-model="menuform.menu_code" autocomplete="off" value="menuform.menu_code"></el-input>
	    </el-form-item>
	    <el-form-item prop="menu_type" label="菜单类型" :label-width="formLabelWidth">
	       <el-input v-model="menuform.menu_type" autocomplete="off" value="menuform.menu_type"></el-input>
	    </el-form-item>
	    <el-form-item prop="order_no" label="序号" :label-width="formLabelWidth">
	       <el-input-number  v-model="menuform.order_no" autocomplete="off" value="menuform.order_no">
	       </el-input-number>
	    </el-form-item>
	    <el-form-item prop="menu_icon" label="图标" :label-width="formLabelWidth">
	       <el-input v-model="menuform.menu_icon" autocomplete="off" value="menuform.menu_icon"></el-input>
	    </el-form-item>
	    <el-form-item prop="description" label="描述" :label-width="formLabelWidth">
	       <el-input v-model="menuform.description" value="menuform.description" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogMenuFormVisible = false" size="medium">取 消</el-button>
	    <el-button type="primary" @click="handleSaveUser('menuform')" size="medium">确 定</el-button>
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
				title:'新增菜单',
				 menuform: {
			          menu_name: '',
			          menu_url: '',
			          menu_code: '',
			          menu_type: '',
			          order_no: '',
			          menu_icon: '',
			          description: ''
		        },
		        userules:{
		        	menu_name: [
			            { required: true, message: '请输入名称', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
			         ],
			        menu_url:[
			        	{ required: true, message: '请输入URL', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
			        ],
			        menu_code:[
			        	{ required: true, message: '请输入代码', trigger: 'blur' },
			        	{ min: 3, max: 20, message: '请输入正确的代码', trigger: ['blur', 'change'] }
			        ],
			        menu_type:[
			        	{ required: true, message: '请输入电话号码', trigger: 'blur' },
			        	{ min: 8, max: 11, message: '长度在 4 到 20 个字符', trigger: 'blur' }
			        ],
			        description:[
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
			        	{ min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
			        ]
		        },
		        formLabelWidth: '120px',
		        dialogMenuFormVisible:false
			}
		},
		props:{
			//  title:{
			// 	type:String,
			// 	required:true
			// }
		},
		methods:{
			onOpen:function(){
				// this.menuform
			},
			beforeClose:function(done){
				
				this.dialogMenuFormVisible=false
				
			},
			//保存新增用户
			handleSaveUser:function(menuform){
				var  that=this;
				this.$refs[menuform].validate((valid)=>{
					if(valid){
						var menuforms=that.$refs[menuform]
						var fileds=menuforms.model;
						const url='/api/user/add/'
						that.$http.post(url,JSON.stringify(fileds),{emulateJSON:true}).then(response=>{
							var user=response.body.data;
							//回调父组件  将user添加到列表里面 通过addUserToList方法
							that.$emit('addUserCallBack',user)
							that.$message({
					          message: '操作成功',
					          type: 'success'
					        });
						},error=>{
							that.$message.error('操作失败');
						});
						this.dialogMenuFormVisible=false
					}else{
						return false;
					}
				})
				// this.dialogMenuFormVisible=false
			}
		}
	}
</script>
<style type="text/css">
	
</style>