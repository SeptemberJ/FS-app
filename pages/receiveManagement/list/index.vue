<template>
	<view class="List">
		<view style="position: fixed;top: 40upx;left: 0;">
			<view class="TopSearchBar">
				<text>单号</text>
				<input class="uni-input" v-model="orderNo"/>
				<text>供应商</text>
				<input class="uni-input" v-model="supplier"/>
				<view type="default" class="searchBt">查 询</view>
			</view>
			<view class="ListColumn">
				<text>送货单号</text>
				<text>送货日期</text>
				<text>供应商</text>
				<text>收料状态</text>
			</view>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx" @click="GoDetail">
					<text>{{item.orderNo}}</text>
					<text>{{item.date}}</text>
					<text>{{item.supplier}}</text>
					<text>{{item.status}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderNo: '',
				supplier: '',
				listData: [
					{
						orderNo: 'SH1907200001',
						date: '',
						supplier: '',
						status: '为收料'
					},
					{
						orderNo: 'SH1907200001',
						date: '',
						supplier: '',
						status: ''
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			GoDetail () {
				uni.navigateTo({
					url: '/pages/receiveManagement/detail/index' 
				})
			}
		}
	}
</script>

<style>
	.List{
		width: 100vw;
		height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.TopSearchBar{
		width: 100vw;
		height: 60upx;
		background: #79B2D8;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.TopSearchBar text{
		padding: 0 10upx;
		color: #FFFFFF;
		font-size: 22upx;
	}
	.searchBt{
		width: 120upx;
		height: 50upx;
		margin: 0 10upx;
		line-height: 50upx;
		text-align: center;
		font-size: 22upx;
		background: #FFFFFF;
	}
	.uni-input{
		padding: 0 10upx;
	}
	.ListColumn{
		width: 100%;
		height: 60upx;
		background: #79B2D8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #79B2D8;
	}
	.ListColumn text{
		padding: 0 15upx;
		font-size: 22upx;
		color: #FFFFFF;
	}
	.ListBlock{
		width: 100%;
		position: relative;
		top: 120upx;
		display: flex;
		flex-direction: column;
	}
	.ListMain{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.ListItem{
		width: 100%;
		padding: 24px 0;
		/* min-height: 60upx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
	}
	.ListItem text{
		padding: 0 15upx;
		font-size: 22upx;
		color: #777;
	}
</style>
