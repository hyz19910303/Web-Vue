import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import main from '../pages/Main'
import home from '../pages/Home'
import user from '../pages/system/User'
import role from '../pages/system/Role'
import menu from '../pages/system/Menu'

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
					},
					{
						path:'system/org/manager',
						component:hello
					}
				]
			}
		]
export  default  new Router({
	routes:routes
})
