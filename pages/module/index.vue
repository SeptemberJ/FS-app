<template>
	<view class="Module">
		<view class="ModuleWarp">
			<view class="ModuleItem" style="background: #9BE3A2;" @click="GoMuduleR">
				<view class="IconWrap">
					<image src="../../static/images/cangku.png" class="inputIcon"></image>
				</view>
				<text>收料管理</text>
			</view>
			<view class="ModuleItem"  style="background: #FFB47C;" @click="GoMuduleI">
				<view class="IconWrap">
					<image src="../../static/images/checklist.png" class="inputIcon"></image>
				</view>
				<text>检验管理</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			GoMuduleR () {
				uni.navigateTo({
					url: '/pages/receiveManagement/list/index' 
				})
			},
			GoMuduleI () {
				uni.navigateTo({
					url: '/pages/inspectionManagement/list/index' 
				})
			}
		}
	}
</script>

<style>
	.Module{
		width: 100vw;
		height: 100vh;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
	}
	.ModuleWarp{
		width: calc(100% - 40upx);
		padding: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.ModuleItem{
		width: 345upx;
		height: 345upx;
		display: flex;
		flex-direction: column;
	}
	.ModuleItem text{
		margin-top: 60upx;
		margin-left: 20upx;
		font-size: 42upx;
		color: #FFFFFF;
	}
	.IconWrap{
		width: 120upx;
		height: 120upx;
		margin-top: 20upx;
		margin-left: 20upx;
		background: #FFFFFF;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.IconWrap image{
		width: 80upx;
		height: 80upx;
		background: #FFFFFF;
		display: block;
		margin: 20upx auto;
	}
	
</style>
