// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import home from './pages/Home'
import main from './pages/Main'
import baidu from './pages/baidu'
import hello from '@/components/HelloWorld'

Vue.config.productionTip = false
Vue.use(Router)

//var baidu ={}
const routes=
		[
			{
				path:'/',
				component:home
			},
			{
				path:'/system/user/manager',
				component:home,
				children:[
					{
						path:'list',component:hello
					},{
						path:'druid/sql.html',component:baidu
					}
				]
			},
			{
			  path:'/main',
			  component:main
			}
		]
const router = new Router({
	routes:routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  //,render: h => h(App)
})
