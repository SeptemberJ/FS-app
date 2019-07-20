<template>
	<view class="Detail">
		<view class="TopInfo">
			<text>送货单号：</text>
			<text>送货日期：</text>
			<text>供应商：</text>
		</view>
		<view class="ListColumn">
			<text>物料代码</text>
			<text>代码</text>
			<text>规格</text>
			<text>送货数量</text>
			<text>收料数量</text>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx">
					<text>{{item.name}}</text>
					<text>{{item.code}}</text>
					<text>{{item.model}}</text>
					<text>{{item.shNumber}}</text>
					<input class="uni-input" v-model="item.slNumber" style="border-bottom: 1px solid #EEEEEE;"/>
				</view>
			</view>
		</view>
		<view class="SubmitBt">保 存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [
					{
						name: 'MAT马达',
						code: 'P123545',
						model: '大型',
						shNumber: 35,
						slNumber: 35
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.Detail{
		width: 100vw;
		height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.TopInfo{
		width: 100%;
		padding: 20upx 0;
		height: 100upx;
		border-bottom: 2px dashed #CCCCCC;
		/* border-bottom: 1px dotted #EEEEEE; */
	}
	.TopInfo text{
		width: calc(50% - 20upx);
		padding-left: 20upx;
		text-align: left;
		float: left;
		color: #777;
	}
	.ListColumn{
		width: 100%;
		height: 60upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ListColumn text{
		width: 20%;
		text-align: center;
		font-size: 22upx;
	}
	.ListBlock{
		width: 100%;
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
		width: 20%;
		text-align: center;
		font-size: 22upx;
		color: #777;
	}
	.ListItem input{
		text-align: center;
		font-size: 22upx;
		color: #777;
	}
	.SubmitBt{
		width: 80%;
		height: 60upx;
		text-align: center;
		color: #FFFFFF;
		line-height: 60upx;
		background: #e64340;
		margin: 50upx auto 20upx auto;
	}
</style>
