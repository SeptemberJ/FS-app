import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		urlPre: 'http://117.131.44.2:8082/fushengJK',
		userInfo: '',
		hasLogin: false,
		loginProvider: "",
		openid: null
	},
	mutations: {
		setUserInfo(state, Info) {
			state.userInfo = Info
			// state.userRole = Info.userRole
			// state.userName = Info.userName
			// state.purchaseUnit = Info.purchaseUnit
		},
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {
		updateUserInfo : function ({commit, state}, Info) {
			commit('setUserInfo', Info)
		},
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
