<template>
	<el-dialog :title="title" top="10vh" :visible.sync="dialogMenuFormVisible" @open="onOpen" :before-close="beforeClose">
	  <el-form :model="menuform" ref="menuform" :rules="menurules" size="small" :status-icon="true">
	    <el-form-item prop="menu_name" label="菜单名称" :label-width="formLabelWidth">
	      <el-input v-model="menuform.menu_name" autocomplete="off" value="menuform.menu_name"></el-input>
	    </el-form-item>
	    <el-form-item prop="menu_type" label="菜单类型" :label-width="formLabelWidth">
	    	<el-radio-group v-model="menuform.menu_type">
		      <el-radio label="1">目录</el-radio>
		      <el-radio label="2">菜单</el-radio>
		      <el-radio label="3">按钮</el-radio>
		    </el-radio-group>
	    </el-form-item>
		<el-form-item prop="parent_menu_name" label="上级菜单" :label-width="formLabelWidth">
			<el-popover
		    placement="top-start"
		    ref="parentMenuPopover"
		    width="450"
		    trigger="click"
		    >
	    	<el-tree 
				default-expand-all
				node-key="menu_id"
				ref="menuTree"
				:data="menuTreeData" 
				:props="menuTreeProps"
				:highlight-current="true"
				:expand-on-click-node="false" 
				@node-click="handleNodeClick">
			</el-tree>
		  	</el-popover>
			<el-input v-model="menuform.parent_menu_name"  
			   		autocomplete="off" 
			   		v-popover:parentMenuPopover
			   		:readonly="true"
			   		value="menuform.parent_menu_name">
			</el-input>
		</el-form-item>
	    <el-form-item v-if="menuform.menu_type!='1'" prop="menu_url" label="菜单URL" :label-width="formLabelWidth">
	       <el-input v-model="menuform.menu_url" autocomplete="off" value="menuform.menu_url"></el-input>
	    </el-form-item>
	    <el-form-item prop="menu_code" label="菜单代码" :label-width="formLabelWidth">
	       <el-input  v-model="menuform.menu_code" autocomplete="off" value="menuform.menu_code"></el-input>
	    </el-form-item>
	    <el-form-item prop="order_no" label="序号" :label-width="formLabelWidth">
	       <el-input-number  v-model.number="menuform.order_no" autocomplete="off" value="menuform.order_no">
	       </el-input-number>
	    </el-form-item>
	    <el-form-item v-if="menuform.menu_icon!=3" prop="menu_icon" label="图标" :label-width="formLabelWidth">
	       <el-popover
		    placement="top-start"
		    ref="iconPopover"
		    width="450"
		    trigger="click"
		    >
	    	<div>
	    		<el-button v-for="(icon,index) in iconList "
	    	  		  @click="handleSelectedIcon(icon)"
	    	  		  :class="{ 'is-active': icon === menuform.menu_icon }"
	    	  		  :key="index">
	    			<i  :class="icon" ></i>
	    		</el-button>
	    	</div>
		  </el-popover>
		   <el-input v-model="menuform.menu_icon"  
		   		autocomplete="off" 
		   		v-popover:iconPopover
		   		:readonly="true"
		   		value="menuform.menu_icon">
		   </el-input>
	    </el-form-item>
	    <el-form-item prop="description" label="描述" :label-width="formLabelWidth">
	       <el-input v-model="menuform.description" value="menuform.description" autocomplete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogMenuFormVisible = false" size="medium">取 消</el-button>
	    <el-button type="primary" @click="handleSaveMenu('menuform')" size="medium">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	// import vueResource from 'vue-resource'
	import ElementUI from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css'
	//图标库
	import iconList from '@/util/icon'
	Vue.use(ElementUI);

	export default {
		name:'addOrUpdateMenu',
		data(){
			return {
				title:'新增菜单',
				iconList:iconList,
				 menuform: {
			          menu_name: '',
			          menu_url: '',
			          menu_code: '',
			          menu_type: '2',
			          order_no: 1,
			          menu_icon: '',
			          description: ''
		        },
		        menuTreeData:[],
		        menuTreeProps:{
		        	label: 'menu_name',
          			children: 'submenus'
		        },
		        menurules:{
		        	menu_name: [
			            { required: true, message: '请输入名称', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
			         ],
			        parent_menu_id:[
			        	{ required: true, message: '上级菜单不能为空', trigger: 'blur' },
			        ],
			        menu_url:[
			        	{ required: true, message: '请输入URL', trigger: 'blur' },
			            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
			        ],
			        menu_code:[
			        	{ required: true, message: '请输入代码', trigger: 'blur' },
			        	{ min: 3, max: 20, message: '请输入正确的代码', trigger: ['blur', 'change'] }
			        ],
			        order_no:[
			        	{ required: true, message: '请输入序号', trigger: 'blur' },
			        	{type:'number', min: 1, max: 100, message: '请输入1 到100 之间的序号', trigger: ['blur', 'change'] }
			        ],
			        menu_icon:[
			        	// { required: false, message: '请输入电话号码', trigger: 'blur' },
			        	{ min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
			        ],
			        description:[
			        	{ required: true, message: '请输入描述', trigger: 'blur' },
			        	{ min: 2, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
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
				debugger
				var e=this.$refs.parentMenuPopover
				var a=this.$refs.menuTree
				var c=this.$children[0].$refs['parentMenuPopover']
			},
			beforeClose:function(done){
				this.parent_menu_id=''
				this.dialogMenuFormVisible=false
				var model=this.$refs['menuform'].model;
				for(var field in model){
					if(field=='menu_type'){
						model[field]='2'
						continue;
					}
					model[field]='';
				}
			},
			handleSelectedIcon:function(icon){
				this.menuform.menu_icon=icon
			},
			handleNodeClick:function(obj,node,nodeArr){
				// this.
			},
			//保存新增菜单
			handleSaveMenu:function(menuform){
				var  that=this;
				this.$refs[menuform].validate((valid)=>{
					if(valid){
						var menuforms=that.$refs[menuform]
						var fileds=menuforms.model;
						const url=this.$http.autoPrefix('menu/add/');
						that.$http.post(url,JSON.stringify(fileds),{emulateJSON:true}).then(response=>{
							var menu=response.body.data;
							//回调父组件  将user添加到列表里面 通过addMenuCallBack方法
							that.$emit('addMenuCallBack',menu)
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
			}
		},
		mounted:function(){
		}
	}
</script>
<style type="text/css">
	.el-button+.el-button{
		margin-left:0px;
	}
</style>