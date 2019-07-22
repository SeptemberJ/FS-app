<template>
	<view class="List">
		<view style="position: fixed;top: 0px;left: 0;z-index: 999;;">
			<view class="TopSearchWrap">
				<view class="TopSearchBar">
					<view class="InputItem" style="width: 30%;">
						<text>单号</text>
						<input class="uni-input" v-model="songhuono"/>
					</view>
					<view class="InputItem" style="width: 30%;">
						<text>供应商</text>
						<input class="uni-input" v-model="supplier"/>
					</view>
					<view class="InputItem" style="width: 30%;">
						<text>状态</text>
						<picker style="width: 70%;" :value="status" :range="statusArray" @change="changeStatus">
							<view class="uni-input">{{statusArray[status]}}</view>
						</picker>
					</view>
					<view class="InputItem" style="width: 10%;">
						<image class="searchBt" style="" src="../../../static/images/search.png" @click="getList"></image>
					</view>
				</view>
				<view class="ListColumn">
					<text>送货单号</text>
					<text>送货日期</text>
					<text>供应商</text>
					<text>收料状态</text>
				</view>
			</view>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx" @click="GoDetail(item)">
					<text>{{item.songhuono}}</text>
					<text>{{item.dateTxt}}</text>
					<text>{{item.providerfullname}}</text>
					<text>{{item.statusTxt}}</text>
				</view>
			</view>
			<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
		</view>
		<view class="MarginT_20" style="width: 100%;height:60upx;padding: 10upx 0;position: fixed;bottom: 0;left: 0;background: #FFFFFF;border-top: 1px solid #EEEEEE;">
			<uni-pagination :show-icon="true" title="标题文字" :pageSize="pageSize" :current="curPage" :total="total" @change="changePage"></uni-pagination>	
		</view>
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {
	    mapState,
	    mapActions
	} from 'vuex'
	export default {
		components: {
			uniPagination
		},
		data() {
			return {
				songhuono: '',
				supplier: '',
				status: 3,
				curPage: 1,
				pageSize: 10,
				total: 0,
				listData: [],
				statusArray: ['待收料', '部分已审', '全部已审', '全部']
			}
		},
		onLoad() {
		},
		onShow: function() {
			this.getList()
		},
		computed: {
			...mapState({
			  urlPre: state => state.urlPre
			})
		},
		methods: {
			changeStatus (e) {
				this.status = e.detail.value
			},
			GoDetail (Info) {
				uni.navigateTo({
					url: '/pages/receiveManagement/detail/index?Info=' + JSON.stringify(Info)
				})
			},
			getList () {
				let url = '/receivelist?number=' + this.pageSize + '&page_num=' + this.curPage
				uni.showLoading({
					title: '加载中'
				})
				if (this.songhuono) {
					url = url + '&songhuono=' + this.songhuono
				}
				if (this.supplier) {
					url = url + '&providerfullname=' + this.supplier
				}
				if (this.status != 3) {
					url = url + '&fstatus=' + this.status
				}
				uni.request({
					url: this.urlPre + url,
					data: {},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								this.listData = res.data.receivelist.map(item => {
									item.statusTxt = item.fstatus == 0 ? '待收料' : (item.fstatus == 1 ? '部分已审' : (item.fstatus == 2 ? '全部已审' : '其它'))
									item.dateTxt = this.formatToString(item.songhuodate.time, 'Simple', '-')
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
			},
			changePage(e) {
				this.curPage = e.current
				this.getList()
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
	.TopSearchWrap{
		width: 100%;
		height: 120upx;
		display: flex;
		flex-direction: column;
	}
	.TopSearchBar{
		width: 100vw;
		height: 60upx;
		padding: 10upx 0;
		background: #387DB3;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.InputItem{
		display: flex;
		align-items: center;
	}
	.InputItem text{
		padding: 0 10upx;
		color: #FFFFFF;
		font-size: 22upx;
	}
	.searchBt{
		width: 50upx;
		height: 50upx;
		margin: 0 auto;
		/* line-height: 50upx;
		text-align: center;
		font-size: 22upx;
		background: #387DB3;
		color: #FFFFFF; */
	}
	.uni-input{
		padding: 0 10upx;
		font-size: 22upx;
	}
	.ListColumn{
		width: 100%;
		height: 60upx;
		background: #FFFFFF;
		/* background: #79B2D8; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px dashed #ccc;
	}
	.ListColumn text{
		width: 20%;
		text-align: center;
		padding: 0 15upx;
		font-size: 22upx;
	}
	.ListBlock{
		width: 100%;
		background: #FFFFFF;
		position: relative;
		top: 120upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 60upx;
	}
	.ListMain{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.ListItem{
		width: 100%;
		padding: 5px 0;
		/* min-height: 60upx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
	}
	.ListItem text{
		width: 20%;
		text-align: center;
		padding: 0 15upx;
		font-size: 22upx;
		color: #777;
	}
</style>
