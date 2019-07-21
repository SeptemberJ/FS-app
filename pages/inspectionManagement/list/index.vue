<template>
	<view class="List">
		<view style="position: fixed;top: 44px;left: 0;z-index: 999;">
			<view class="TopSearchBar">
				<text>单号</text>
				<input class="uni-input" v-model="checkno"/>
				<text>供应商</text>
				<input class="uni-input" v-model="supplier"/>
				<view type="default" class="searchBt" @click="getList">查 询</view>
			</view>
			<view class="ListColumn">
				<text>检验单号</text>
				<text>检验日期</text>
				<text>供应商</text>
				<text>检验状态</text>
			</view>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx" @click="GoDetail(item)">
					<text>{{item.checkno}}</text>
					<text>{{item.dateTxt}}</text>
					<text>{{item.providername}}</text>
					<text>{{item.providername}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	export default {
		data() {
			return {
				checkno: '',
				supplier: '',
				curPage: 1,
				pageSize: 10,
				total: 0,
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
		computed: {
			...mapState({
			  urlPre: state => state.urlPre
			})
		},
		onLoad() {

		},
		onShow: function() {
			this.getList()
		},
		methods: {
			GoDetail (Info) {
				uni.navigateTo({
					url: '/pages/inspectionManagement/detail/index?Info=' + JSON.stringify(Info)
				})
			},
			getList () {
				let url = '/serCheckmalist?number=' + this.pageSize + '&page_num=' + this.curPage
				uni.showLoading({
					title: '加载中'
				})
				if (this.checkno) {
					url = url + '&checkno=' + this.checkno
				}
				if (this.supplier) {
					url = url + '&providername=' + this.supplier
				}
				uni.request({
					url: this.urlPre + url,
					data: {},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								this.listData = res.data.checkmalist.map(item => {
									item.dateTxt = this.formatToString(item.sheetdate.time, 'Simple', '-')
									return item
								})
								this.total = res.data.receiveCount
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
						this.total = 0
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
			formatToString (parameter,  formatType, splitType) {
				var oDate
				if (typeof parameter === 'object') {
				// 传递的是Date
				oDate = parameter
				} else {
				// 传递的是秒数则转换为Date类型
				oDate = new Date(parameter)
				}
				var oYear = oDate.getFullYear()
				var oMonth = oDate.getMonth() + 1
				var oDay = oDate.getDate()
				var oHour = oDate.getHours()
				var oMin = oDate.getMinutes()
				var oSen = oDate.getSeconds()
				switch (formatType) {
					case 'Complete':
						return (oYear + splitType + this.getzf(oMonth) + splitType + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen))
						break
					case 'Simple':
						return (oYear + splitType + this.getzf(oMonth) + splitType + this.getzf(oDay))
						break
					case 'NotSecond':
						return (oYear + splitType + this.getzf(oMonth) + splitType + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin))
						break
				}
			},
			getzf (num) {
				if (parseInt(num) < 10) {
					num = '0' + num
				}
				return num
			}
		}
	}
</script>

<style>
	.List{
		width: 100vw;
		min-height: 100vh;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.TopSearchBar{
		width: 100vw;
		/* height: 60upx; */
		padding: 10upx 0;
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
		background: #FFFFFF;
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
