<template>
	<view class="Login">
		<!-- Logo -->
		<view class="Logo">
			<image src="../../static/images/logo.png"></image>
		</view>
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
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.Login{
		width: 100vw;
		height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.Logo{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Logo image{
		width: 150upx;
		height: 150upx;
		display: block;
		margin-top: 150upx;
	}
	.InputGroup{
		width: 70%;
		margin: 100upx auto 0 auto;
		padding: 0 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.InputBarBlock{
		border-bottom: 1px solid #8a8a8a;
		/* padding: 10upx 20upx;
		background: pink;
		border-radius: 50upx; */
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
		height: 80upx;
		text-align: center;
		font-size: 32upx;
		line-height: 80upx;
		background: #79B2D8;
		color: #FFFFFF;
		border-radius: 0;
		margin-top: 80upx;
	}
</style>
