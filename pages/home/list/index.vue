<template>
	<view>
		<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
			@selection-change="selectionChange">
			<uni-tr>
				<uni-th width="60" align="center">钢材类型</uni-th>
				<uni-th width="60" align="center">今日报价</uni-th>
				<uni-th width="120" align="center">当前时间</uni-th>
				<uni-th width="100" align="center">备注</uni-th>
				<uni-th width="80" align="center">设置</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td>{{ steelEnum[item.steelType] }}</uni-td>
				<uni-td>
					<view class="name">{{ item.price }}</view>
				</uni-td>
				<uni-td align="center">{{ item.time }}</uni-td>
				<uni-td align="center">{{ item.remarks }}</uni-td>
				<uni-td>
					<view class="uni-group">
						<uni-icons type="compose" size="30" @click="() => onUpdate(item)" />
						<uni-icons type="trash-filled" size="30" @click="() => onRemove(item)" />
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
	</view>
	<button @click="onAdd">+新增</button>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		onShow
	} from '@dcloudio/uni-app';

	const loading = ref(false);
	const tableData = ref([]);
	const record = ref(null);
	const steelEnum = {
		0:"方坯",
		1:"刚坯",
		2:"废钢",
	}

	onShow(() => getList());

	// 列表
	const getList = () => {
		uni.showLoading({
			title: '加载中'
		});
		
		uniCloud.callFunction({
			name: 'home',
			data: {
				type: 'list',
			}
		}).then((res) => {
			if (res?.result?.data) {
				tableData.value = res?.result?.data;
			} else {
				uni.showToast({
					title: '列表数据异常！',
				});
			}
		}).finally(() => {
			uni.hideLoading();
		});
	};

	// 新增按钮
	const onAdd = () => {
		uni.navigateTo({
			url: "/pages/home/add/index?type=add"
		})
	};

	// 编辑按钮
	const onUpdate = (item) => {
		uni.navigateTo({
			url: `/pages/home/add/index?type=update&id=${item._id}`,
		})
	};

	// 删除按钮
	const onRemove = (item) => {
		const iconEnum = {
			0: 'error',
			1: 'success',
		};
		const titleEnum = {
			0: '删除失败！',
			1: '删除成功！',
		};

		uniCloud.callFunction({
			name: 'home',
			data: {
				id: item?._id,
				type: 'remove',
			}
		}).then((resp) => {
			const {
				deleted
			} = resp?.result;

			uni.showToast({
				icon: iconEnum[deleted],
				title: titleEnum[deleted],
			});
			deleted === 1 && getList();
		})
	}

	const selectionChange = () => {

	}
</script>

<style>

</style>