<template>
	<view class="Detail">
		<view class="TopInfo">
			<text>检验单号：{{checkno}}</text>
			<text>物料代码：{{matcode}}</text>
			<text style="width: 100%;">物料名称：{{matname}}</text>
		</view>
		<view class="ListColumn">
			<text style="width: 150upx;">物料代码</text>
			<text style="width: 150upx;">代码</text>
			<text style="width: 150upx;">规格</text>
			<text style="width: 100upx;">到货数量</text>
			<text style="width: 100upx;">合格</text>
			<text style="width: 100upx;">不合格</text>
			<!-- <text class="ColorWhite" style="width: 150upx;">bt1</text> -->
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view v-for="(item, idx) in listData" :key="idx"  style="background: aliceblue;margin-bottom: 0upx;">
					<view class="ListItem">
						<text style="width: 150upx;">{{item.matname}}</text>
						<text style="width: 150upx;">{{item.matcode}}</text>
						<text style="width: 150upx;">{{item.norms}}</text>
						<text style="width: 100upx;">{{item.sendnum}}</text>
						<input class="uni-input" style="width: 100upx;">{{item.oknum}}</input>
						<input class="uni-input" style="width: 100upx;">{{item.failnum}}</input>
					</view>
				</view>
			</view>
		</view>
		<view class="AddLine">
			<image @click="AddLine" style="width: 40upx;height: 40upx;display: block;margin: 10upx auto;" src="../../../static/images/add.png"></image>
		</view>
		<button class="SubmitBt"  @click="save">保 存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Info: '',
				checkno: '',
				matname: '',
				matcode: '',
				listData: [
					// {
					// 	name: 'MAT马达马达马达',
					// 	code: 'P123545',
					// 	model: '大型',
					// 	shNumber: 3555,
					// 	slNumber: 35
					// },
					// {
					// 	name: 'MAT马达',
					// 	code: 'P123545',
					// 	model: '大型',
					// 	shNumber: 3555,
					// 	slNumber: 35
					// }
				]
			}
		},
		onLoad: function (option) {
			let Info = JSON.parse(option.Info)
			this.Info = Info
			console.log(Info)
			this.checkno = Info.checkno
			this.matname = Info.matname
			this.matcode = Info.matcode
		},
		methods: {
			AddLine () {
				this.listData.push({
						matname: this.Info.matname,
						matcode: this.Info.matcode,
						norms: this.Info.norms,
						sendnum: this.Info.sendnum,
						oknum: '',
						failnum: ''
					})
			},
			save () {
				
			}
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
		/* border-bottom: 2px dashed #CCCCCC; */
	}
	.TopInfo text{
		width: calc(50% - 20upx);
		padding-left: 20upx;
		text-align: left;
		float: left;
		color: #333333;
	}
	.ListColumn{
		width: 100%;
		height: 60upx;
		background: #79B2D8;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ListColumn text{
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
		/* padding: 24px 0; */
		min-height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ListItem text{
		text-align: center;
		font-size: 22upx;
	}
	.OperationBt{
		width: 750upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 1px solid #CCCCCC; */
	}
	.OperationBt text{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		display: block;
		font-size: 22upx;
		color: #FFFFFF;
	}
	.ListItem input{
		text-align: center;
		font-size: 22upx;
		color: #333333;
	}
.AddLine{
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		text-align: center;
		color: #0e932e;
		line-height: 60upx;
		border: 1px solid #0e932e;
		margin: 50upx auto 120upx auto;
	}
	.SubmitBt{
		width: 100%;
		height: 80upx;
		position: fixed;
		left: 0;
		bottom: 0;
		border-radius: 0;
		text-align: center;
		color: #FFFFFF;
		line-height: 80upx;
		background: #e64340;
	}
	.uni-input{
		text-align: center;
		font-size: 22upx !important;
	}
</style>
