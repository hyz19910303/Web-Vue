// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.userid='8a80e763665bb4b101665cb813550024'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  //,render: h => h(App)
  data:function(){
  	return {
  		
  	}
  }
  ,methods:{
  	menutorouter:function(menus){
  		if(menus && menus.length>0){
  			
  			for(let i=0;i<menus.length;i++){
  				if(menus[i].submenus && menus[i].submenus.length>0){
  					this.menutorouter(menus[i].submenus);
  				}else if(menus[i].component){
  					var route={}
		  			route.path=menus[i].menu_url

		  			route.component=menus[i].component
		  			routes.push(route);
  				}
  			}
  			console.log(user)
  		}else{
  			alert(11)
  		}
  	}
  }
  ,mounted:function(){
  	
  }
})
