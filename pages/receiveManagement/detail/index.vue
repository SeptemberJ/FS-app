<template>
	<view class="Detail">
		<view class="TopInfo">
			<text>送货单号：{{songhuono}}</text>
			<text style="text-align: right;padding-right: 20upx;">送货日期：{{dateTxt}}</text>
			<text>供应商：{{supplier}}</text>
		</view>
		<view class="ListColumn">
			<text>状态</text>
			<text>物料代码</text>
			<text>代码</text>
			<text>规格</text>
			<text>到货货数量</text>
			<text>收料数量</text>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx">
					<text :class="{'ColorRed': item.receive_status == 1, 'ColorBlue': item.receive_status == 2, 'ColorGreen': item.receive_status == 0}">{{item.receive_statusTXT}}</text>
					<text>{{item.matname}}</text>
					<text>{{item.matcode}}</text>
					<text>{{item.stuff}}</text>
					<text>{{item.shnum}}</text>
					<input class="uni-input" v-model="item.receivenum" style="border-bottom: 1px solid #EEEEEE;"/>
				</view>
			</view>
		</view>
		<button v-if="fstatus != 2" class="SubmitBt" :disabled="ifNoWork"  @click="save">保 存</button>
		<!-- <button v-if="fstatus == 2" class="SubmitBt" style="background: #387DB3;">收料完成</button> -->
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	export default {
		data() {
			return {
				ifNoWork: false,
				fstatus: '',
				songhuoId: '',
				songhuono: '',
				supplier: '',
				dateTxt: '',
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
			this.fstatus = Info.fstatus
			this.songhuono = Info.songhuono
			this.supplier = Info.providerfullname
			this.dateTxt = Info.dateTxt
			this.songhuoId = Info.id
			this.getDetail(Info.id)
		},
		methods: {
			getDetail (Id) {
				uni.showLoading({
					title: '加载中'
				})
				uni.request({
					url: this.urlPre + '/serReceiveDetailList?id=' + Id,
					data: {},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								this.listData = res.data.receiveDetail.map(item => {
									item.receive_statusTXT = item.receive_status == 0 ? '待收料' : (item.receive_status == 1 ? '收料已审核' : '收料待审核')
									return item
								})
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
			save () {
				if (this.ifNoWork) {
					return false
				}
				let data = []
				this.listData.map(item => {
					data.push({
						id: item.id,
						receivenum: item.receivenum
					})
				})
				this.submit(data)
			},
			submit (Data) {
				this.ifNoWork = true
				uni.showLoading({
					title: '提交中'
				})
				uni.request({
					url: this.urlPre + '/updateReceivenum',
					method: 'POST',
					data: {
						receivedetaillist: Data
					},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								uni.hideLoading()
								uni.showToast({
								    icon: 'success',
								    title: '收料成功!'
								})
								setTimeout(() => {
									this.getDetail(this.songhuoId)
									this.ifNoWork = false
								}, 1500)
								break
							  default:
								uni.hideLoading()
								this.ifNoWork = false
								uni.showToast({
								    image: '/static/images/attention.png',
								    title: '服务器繁忙!'
								})
						}
					},
					fail: (err) => {
						console.log('request fail', err)
						// this.listData = []
						uni.hideLoading()
						this.ifNoWork = false
						uni.showModal({
							content: '接口报错!',
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
	.ColorRed{
		color: red !important;
	}
	.ColorBlue{
		color: blue !important;
	}
	.ColorGreen{
		color: green !important;
	}
	.Detail{
		width: 100vw;
		min-height: 100vh;
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
		width: calc(50% - 40upx);
		padding-left: 20upx;
		text-align: left;
		float: left;
		font-size: 22upx;
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
		width: 16.66%;
		text-align: center;
		font-size: 22upx;
	}
	.ListBlock{
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 80upx;
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
		border-bottom: 1px dashed #79B2D8;
	}
	.ListItem text{
		width: 16.66%;
		text-align: center;
		font-size: 22upx;
		color: #333333;
	}
	.ListItem input{
		text-align: center;
		font-size: 22upx;
		color: #777;
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
</style>
