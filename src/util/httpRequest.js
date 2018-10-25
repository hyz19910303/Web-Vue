import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)

const http=Vue.http;


// 请求拦截设置
http.interceptors.push(function(request) {
  // modify method
  // request.method = 'POST';
  // modify headers
  // request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  //设置请求token
  request.headers.set('TOKEN', 'Token');

});

http.autoPrefix=function(action){
	return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? process.env.API_HOST : window.SITE_CONFIG.baseUrl) + action
}

export default http;