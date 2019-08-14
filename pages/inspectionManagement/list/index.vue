<template>
	<view class="List">
		<!-- 44px -->
		<view style="position: fixed;top: 0px;left: 0;z-index: 999;;">
			<view class="TopSearchWrap">
				<view class="TopSearchBar">
					<view class="InputItem" style="width: 30%;">
						<text>单号</text>
						<input class="uni-input" v-model="checkno"/>
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
						<image class="searchBt" style="" src="../../../static/images/search.png" @click="search"></image>
					</view>
				</view>
				<view class="ListColumn">
					<text style="width: 20%;">检验单号</text>
					<text style="width: 17%;">检验日期</text>
					<text style="width: 20%;">供应商</text>
					<text style="width: 23%;">检验状态</text>
				</view>
			</view>
			<!-- <view class="TopSearchBar">
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
			</view> -->
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<view class="ListItem" v-for="(item, idx) in listData" :key="idx" @click="GoDetail(item)">
					<text style="width: 20%;">{{item.checkno}}</text>
					<text style="width: 17%;">{{item.dateTxt}}</text>
					<text style="width: 20%;">{{item.providername}}</text>
					<text style="width: 23%;">{{item.fstatus}}</text>
				</view>
			</view>
			<text class="EmptyData" v-if="listData.length == 0">暂无数据</text>
		</view>
		<view style="width: 100%;height:60upx;padding: 10upx 0;position: fixed;bottom: 0;left: 0;background: #FFFFFF;border-top: 1px solid #EEEEEE;">
			<uni-pagination :show-icon="true" title="标题文字" :pageSize="pageSize" :current="curPage" :total="total" @change="changePage"></uni-pagination>	
		</view>
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import {
	    mapState
	} from 'vuex'
	export default {
		components: {
			uniPagination
		},
		data() {
			return {
				checkno: '',
				supplier: '',
				status: 0,
				curPage: 1,
				pageSize: 10,
				total: 0,
				listData: [],
				statusArray: ['全部']
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
			this.getStatus()
		},
		methods: {
			changeStatus (e) {
				this.status = e.detail.value
			},
			GoDetail (Info) {
				uni.navigateTo({
					url: '/pages/inspectionManagement/detail/index?Info=' + JSON.stringify(Info)
				})
			},
			search () {
				this.curPage = 1
				this.getList()
			},
			getStatus () {
				uni.request({
					url: this.urlPre + '/serStatusList',
					data: {},
					success: (res) => {
						this.statusArray = ['全部']
						res.data.statuslist.map(item => {
							this.statusArray.push(item.jlzt)
						})
					},
					fail: (err) => {
					},
					complete: () => {
					}
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
				if (this.status != 0) {
					url = url + '&fstatus=' + this.statusArray[this.status]
				}
				uni.request({
					url: this.urlPre + url,
					data: {},
					success: (res) => {
						switch (res.data.code) {
							case 1:
								this.listData = res.data.checkmalist.map(item => {
									// item.statusTxt = item.fstatus == 0 ? '待收料' : (item.fstatus == 1 ? '部分已审' : (item.fstatus == 2 ? '全部已审' : '其它'))
									item.dateTxt = this.formatToString(item.sheetdate.time, 'Simple', '-')
									return item
								})
								this.total = res.data.checkmaCount
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
		margin-bottom: 80upx;
	}
	.ListMain{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.ListItem{
		width: 100%;
		padding: 10px 0;
		/* min-height: 60upx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
	}
	.ListItem text{
		text-align: center;
		padding: 0 15upx;
		font-size: 22upx;
		color: #333333;
	}
</style>
