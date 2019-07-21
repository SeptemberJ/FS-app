<template>
	<view class="Detail">
		<view class="TopInfo">
			<text>送货单号：{{songhuono}}</text>
			<text style="text-align: right;padding-right: 20upx;">送货日期：{{dateTxt}}</text>
			<text>供应商：{{supplier}}</text>
		</view>
		<view class="ListColumn">
			<text>物料代码</text>
			<text>代码</text>
			<text>规格</text>
			<text>收货数量</text>
			<text>收料数量</text>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx">
					<text>{{item.matname}}</text>
					<text>{{item.matcode}}</text>
					<text>{{item.stuff}}</text>
					<text>{{item.shnum}}</text>
					<input class="uni-input" v-model="item.receivenum" style="border-bottom: 1px solid #EEEEEE;"/>
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
								this.listData = res.data.receiveDetail
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
				let data = []
				this.listData.map(item => {
					data.push({
						id: item.id,
						receivenum: item.receivenum
					})
				})
				uni.request({
					url: this.urlPre + '/updateReceivenum',
					method: 'POST',
					data: {
						receivedetaillist: data
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
								}, 1500)
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
				console.log(data)
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
		border-bottom: 2px dashed #CCCCCC;
		/* border-bottom: 1px dotted #EEEEEE; */
	}
	.TopInfo text{
		width: calc(50% - 40upx);
		padding-left: 20upx;
		text-align: left;
		float: left;
		font-size: 22upx;
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
