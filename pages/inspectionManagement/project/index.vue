<template>
	<view class="Detail">
		<view class="TopInfo">
			<text>检验单号：{{checkno}}</text>
			<text>检验日期：{{dateTxt}}</text>
			<text>供应商：{{supplier}}</text>
		</view>
		<view class="ListColumn">
			<text style="width: 98upx;">检验部位</text>
			<text style="width: 87upx;">技术要求</text>
			<text style="width: 87upx;">1检</text>
			<text style="width: 87upx;">2检</text>
			<text style="width: 87upx;">3检</text>
			<text style="width: 87upx;">4检</text>
			<text style="width: 87upx;">5检</text>
			<text style="width: 80upx;">备注</text>
			<text style="width: 50upx;" class="ColorWhite">删除</text>
		</view>
		<view class="ListBlock">
			<view class="ListMain">
				<view v-for="(item, idx) in listData" :key="idx" style="background: aliceblue;margin-bottom: 0upx;">
					<view class="ListItem">
						<textarea style="width: 98upx;padding: 5upx;font-size: 22upx;" v-model="item.parmname" auto-height placeholder="请输入"/>
						<textarea style="width: 87upx;padding: 5upx;font-size: 22upx;" v-model="item.parmvalueref" auto-height placeholder="请输入"/>
						<picker style="width: 87upx;" @change="changeTest" :data-idx="idx" :data-kind="0" :value="item.test1" :range="testArray">
							<view class="uni-input">{{testArray[item.parmvalue]}}</view>
						</picker>
						<picker style="width: 87upx;" @change="changeTest" :data-idx="idx" :data-kind="1" :value="item.test2" :range="testArray">
							<view class="uni-input">{{testArray[item.parmvalue1]}}</view>
						</picker>
						<picker style="width: 87upx;" @change="changeTest" :data-idx="idx" :data-kind="2" :value="item.test3" :range="testArray">
							<view class="uni-input">{{testArray[item.parmvalue2]}}</view>
						</picker>
						<picker style="width: 87upx;" @change="changeTest" :data-idx="idx" :data-kind="3" :value="item.test4" :range="testArray">
							<view class="uni-input">{{testArray[item.parmvalue3]}}</view>
						</picker>
						<picker style="width: 87upx;" @change="changeTest" :data-idx="idx" :data-kind="4" :value="item.test5" :range="testArray">
							<view class="uni-input">{{testArray[item.parmvalue4]}}</view>
						</picker>
						<textarea style="width: 80upx;padding: 5upx;font-size: 22upx;" v-model="item.memo" auto-height placeholder="请输入"/>
						<view style="width: 50upx;" @click="deleteLine(idx)">
							<image style="width: 40upx;height: 40upx;display: block;margin: 5upx auto;" src="../../../static/images/delete.png"></image>
						</view>
					</view>
				</view>
				<!-- <text class="EmptyData" v-if="listData.length == 0">暂无数据</text> -->
			</view>
		</view>
		<view class="AddLine">
			<image @click="AddLine" style="width: 40upx;height: 40upx;display: block;margin: 10upx auto;" src="../../../static/images/add.png"></image>
		</view>
		<button class="SubmitBt" :disabled="ifNoWork"  @click="save">保 存</button>
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
				Info: '',
				checkno: '',
				dateTxt: '',
				supplier: '',
				testArray: ['合格', '不合格', '请选择'],
				listData: []
			}
		},
		computed: {
			...mapState({
			  urlPre: state => state.urlPre,
			  userInfo: state => state.userInfo
			})
		},
		onLoad: function (option) {
			let Info = JSON.parse(option.Info)
			this.Info = Info
			this.checkno = Info.checkno
			this.supplier = Info.supplier
			this.dateTxt = Info.dateTxt
			// this.jlh = Info.jlh
		},
		methods: {
			AddLine () {
				this.listData.push({
						parmname: '',
						djjlh: this.Info.jlh,
						matjlh: this.Info.matjlh,
						djjlh1: this.Info.matjlh,
						parmvalueref: '',
						parmvalue: 2,
						parmvalue1: 2,
						parmvalue2: 2,
						parmvalue3: 2,
						parmvalue4: 2,
						checkor: this.userInfo.realname,
						memo: ''
					})
			},
			deleteLine (idx) {
				this.listData.splice(idx, 1)
			},
			changeTest (e) {
				var index = e.currentTarget.dataset.idx
				var pro = 'parmvalue' + (e.currentTarget.dataset.kind == 0 ? '' : e.currentTarget.dataset.kind)
				this.listData[index][pro] = e.target.value
			},
			save () {
				if (this.ifNoWork) {
					return false
				}
				if (this.listData.map.length == 0) {
					uni.showToast({
					    image: '/static/images/attention.png',
					    title: '请至少添加一行记录!'
					})
					return false
				}
				let ifHasEmpty = false
				this.listData.map(item => {
					if (item.parmname == '' || item.parmvalueref == '' || item.parmvalue == 2 || item.parmvalue1 == 2 || item.parmvalue2 == 2 || item.parmvalue3 == 2 || item.parmvalue4 == 2) {
						ifHasEmpty = true
						uni.showToast({
						    image: '/static/images/attention.png',
						    title: '请将信息填写完整!'
						})
						return false
					}
				})
				if (!ifHasEmpty) {
					this.submit(this.listData)
				}
			},
			submit (Data) {
				this.ifNoWork = true
				uni.showLoading({
					title: '提交中'
				})
				uni.request({
					url: this.urlPre + '/insertCheckdeParm',
					method: 'POST',
					data: {
						checkdeparmlist: Data
					},
					success: (res) => {
						switch (res.data.code) {
							case 0:
								uni.hideLoading()
								uni.showToast({
								    icon: 'success',
								    title: '检验项目新增成功!'
								})
								setTimeout(() => {
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
		margin-bottom: 80upx;
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
		padding: 0 !important;
		font-size: 22upx !important;
		background: aliceblue;
	}/* 
	.uni-textarea-compute, .uni-textarea-placeholder, .uni-textarea-textarea, .uni-textarea-wrapped{
	width: 80upx;
	} */

</style>
