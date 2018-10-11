import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import home from '../pages/Home'
import user from '../pages/User'
import role from '../pages/Role'
import menu from '../pages/Menu'
import main from '../pages/Main'
import hello from '@/components/HelloWorld'

Vue.use(Router)

const routes=
		[
			{
				path:'/',
				component:home,
				children:[
					{
						path:'system/user/manager',
						component:user
					},
					{
						path:'system/role/manager',
						component:role
					},
					{
						path:'system/menu/manager',
						component:menu
					}
				]
			}
		]
export  default  new Router({
	routes:routes
})
