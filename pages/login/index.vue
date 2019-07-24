<template>
	<view class="LoginWrap">
		<view class="Login">
			<!-- Logo -->
			<image class="Logo" style="" src="../../static/images/logo.jpg"></image>
			<!-- 信息输入 -->
			<view class="InputGroup">
				<view class="uni-form-item uni-row InputBarBlock">
					<image src="../../static/images/user.png" class="inputIcon"></image>
					<view class="with-fun">
						<input class="uni-input" v-model="username" placeholder="用户名"/>
					</view>
				</view>
				<view class="uni-form-item uni-row InputBarBlock" style="margin-top: 10upx;">
					<image src="../../static/images/password.png" class="inputIcon"></image>
					<view class="with-fun">
						<input class="uni-input" v-model="password" password placeholder="密码"/>
					</view>
				</view>
			</view>
			<view class="loginBt" @click="login">登 陆</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad() {

		},
		computed: {
			...mapState({
			  urlPre: state => state.urlPre
			})
		},
		methods: {
			...mapActions([
			  'updateUserInfo'
			]),
			login () {
				// 校验
				if (this.username == '') {
					uni.showToast({
					    image: '/static/images/attention.png',
					    title: '用户名不能为空!'
					})
					return false
				}
				if (this.password == '') {
					uni.showToast({
					    image: '/static/images/attention.png',
					    title: '密码不能为空!'
					})
					return false
				}
				this.loginRequest()
			},
			loginRequest () {
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: this.urlPre + '/pdalogin?username='+ this.username + '&pwd=' + this.password,
					data: {},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								// 更新用户信息
								this.updateUserInfo(res.data.memberInfo)
								uni.redirectTo({
									url: '/pages/module/index'
								})
								uni.hideLoading()
								break
							  case 0:
								uni.hideLoading()
								uni.showToast({
								    image: '/static/images/attention.png',
								    title: '用户名或密码错误!'
								})
								break
							  default:
								uni.hideLoading()
								uni.showToast({
								    image: '/static/images/attention.png',
								    title: '服务器繁忙!'
								})
						}
					},
					fail: (err) => {
						console.log('request fail', err)
						uni.hideLoading()
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete: () => {
					}
				})
			}
		}
	}
</script>

<style>
	.LoginWrap{
		width: 100vw;
		height: 100vh;
		/* height: calc(100vh - 44px); */
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	.Login{
		width: 100vw;
		margin-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.Logo{
		width: 542upx;
		height: 138upx;
		margin-bottom: 50upx;
	}
	.InputGroup{
		width: 70%;
		padding: 0 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.InputBarBlock{
		border-bottom: 1px solid #8a8a8a;
	}
	.uni-form-item .with-fun{
		background: transparent;
		flex-grow: 1;
	}
	.inputIcon{
		width: 65upx;
		height: 65upx;
		margin-right: 10upx;
	}
	.loginBt{
		width: 70%;
		height: 60upx;
		text-align: center;
		font-size: 30upx;
		line-height: 60upx;
		background: #79B2D8;
		color: #FFFFFF;
		border-radius: 0;
		margin-top: 60upx;
	}
</style>
