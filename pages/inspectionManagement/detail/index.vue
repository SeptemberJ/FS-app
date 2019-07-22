<template>
	<view class="Detail">
		<view class="TopInfo">
			<text>检验单号：{{checkno}}</text>
			<text>检验日期：{{dateTxt}}</text>
			<text>供应商：{{supplier}}</text>
		</view>
		<view class="ListColumn">
			<text style="width: 150upx;">物料代码</text>
			<text style="width: 150upx;">代码</text>
			<text style="width: 150upx;">型号</text>
			<text style="width: 100upx;">到货数量</text>
			<text style="width: 100upx;">合格</text>
			<text style="width: 100upx;">不合格</text>
			<!-- <text class="ColorWhite" style="width: 150upx;">bt1</text> -->
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view v-for="(item, idx) in listData" :key="idx" style="background: aliceblue;margin-bottom: 0upx;">
					<view class="ListItem">
						<text style="width: 150upx;">{{item.matname}}</text>
						<text style="width: 150upx;">{{item.matcode}}</text>
						<text style="width: 150upx;">{{item.norms}}</text>
						<text style="width: 100upx;">{{item.sendnum}}</text>
						<input class="uni-input" @blur="changeOkNum(item)" v-model="item.oknum" style="width: 100upx;border-bottom: 0px solid #EEEEEE;"/>
						<input class="uni-input" @blur="changeFail(item)" v-model="item.failnum" style="width: 100upx;border-bottom: 0px solid #EEEEEE;"/>
						<!-- <text style="width: 100upx;">{{item.oknum}}</text>
						<text style="width: 100upx;">{{item.failnum}}</text> -->
					</view>
					<view class="OperationBt">
						<text style="background: #FA8888;" @click="GoProject(item)">检验项目管理</text>
						<text style="background: #A4A2E4;" @click="GoSerialNumber(item)">序列号管理</text>
					</view>
				</view>
			</view>
		</view>
		<view class="SubmitBt" @click="save">保 存</view>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	export default {
		data() {
			return {
				Info: '',
				jlh: '',
				checkno: '',
				dateTxt: '',
				supplier: '',
				listData: []
			}
		},
		computed: {
			...mapState({
			  urlPre: state => state.urlPre
			})
		},
		onLoad: function (option) {
			let Info = JSON.parse(option.Info)
			this.Info = Info
			this.checkno = Info.checkno
			this.supplier = Info.providername
			this.dateTxt = Info.dateTxt
			this.jlh = Info.jlh
			this.getDetail(Info.jlh)
		},
		methods: {
			getDetail (Jlh) {
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: this.urlPre + '/serCheckdeList?jlh=' + Jlh,
					data: {},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								this.listData = res.data.checkdelist
								uni.hideLoading()
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
						this.listData = []
						console.log('request fail', err)
						uni.hideLoading()
						uni.showModal({
							content: '接口报错!',
							showCancel: false
						});
					},
					complete: () => {
					}
				})
			},
			GoProject (Info) {
				Info.checkno = this.checkno
				Info.supplier = this.supplier
				Info.dateTxt = this.dateTxt
				uni.navigateTo({
					url: '/pages/inspectionManagement/project/index?Info=' + JSON.stringify(Info) 
				})
			},
			GoSerialNumber (Info) {
				Info.checkno = this.checkno
				uni.navigateTo({
					url: '/pages/inspectionManagement/serialNumber/index?Info=' + JSON.stringify(Info) 
				})
			},
			save () {
				console.log(this.listData)
			},
			changeOkNum (item) {
				
			},
			changeFail (item) {
				if (item.oknum + item.failnum > item.sendnum) {
					uni.showToast({
					    image: '/static/images/attention.png',
					    title: '合格和不合格数量之和不能大于到货数量!'
					})
					return false
				}
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
		color: #777;
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
		margin-bottom: 70upx;
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
		/* color: #777; */
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
		color: #777;
	}
	.SubmitBt{
		width: 100%;
		height: 60upx;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
		color: #FFFFFF;
		line-height: 60upx;
		background: #e64340;
	}
</style>
