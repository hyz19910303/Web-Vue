<template>
	<div v-html="html">
		
	</div>
	
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import vueResource from 'vue-resource'
	Vue.use(vueResource)
	export default {
		props:{
			
		},
		data(){
			return{
				html:''
			}
		},
		methods:{
			load(url){
				
			    this.$http.get(url).then(response=>{
					debugger
					if(response.ok){
						//this.data=response.body
						this.html=response.data
					}
				},error=>{
					//console.log(error)
				});	
			}
		},
		mounted(){
			this.load('/api/index');
		}
	}

</script>
<style type="text/css">

</style>