<template>
	<view class="content">
		<uni-forms ref="formRef" :model="model" :rules="rules">
			<uni-forms-item label="钢材类型" name="steelType" required>
				<uni-data-select v-model="model.steelType" :localdata="steelTypes" @change="onChangeSteelType" />
			</uni-forms-item>
			<uni-forms-item label="今日报价" name="price" required>
				<uni-easyinput v-model="model.price" placeholder="请输入今日报价" />
			</uni-forms-item>
			<uni-forms-item label="当前时间" name="time" required>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="model.time" @change="onChangeTime" />
			</uni-forms-item>
			<uni-forms-item label="备注" name="remarks">
				<uni-easyinput type="textarea" v-model="model.remarks" placeholder="请输入备注" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" :disabled="loading" @click="onSubmit">提交</button>
		<button @click="onReset">重置</button>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onLoad,
	} from "@dcloudio/uni-app"

	let formRef = ref(null);
	const currentType = ref('add');
	const currentId = ref(null);
	const loading = ref(false);

	const model = ref({
		steelType: '',
		price: '',
		time: '',
		remarks: '',
	});

	const steelTypes = ref([{
			value: 0,
			text: "方坯"
		},
		{
			value: 1,
			text: "刚坯"
		},
		{
			value: 2,
			text: "废钢"
		},
	]);

	const rules = reactive({
		steelType: {
			rules: [{
				required: true,
				errorMessage: '请选择钢材类型'
			}]
		},
		price: {
			rules: [{
				required: true,
				errorMessage: '请输入今日报价'
			}]
		},
		time: {
			rules: [{
				required: true,
				errorMessage: '请选择当前时间'
			}]
		},
	})

	onLoad((option) => {
		const id = option?.id;
		const type = option?.type;

		currentType.value = type;
		currentId.value = id;

		if (type == 'update') {
			onGetDetail(id);
		}
		uni.setNavigationBarTitle({
			title: type === 'add' ? '新增' : '编辑'
		});
	});

	const onChangeSteelType = (data) => {
		console.log('select', data)
	}

	const onChangeTime = (data) => {
		console.log('data--time', data)
	}

	const onGetDetail = (id) => {
		uniCloud.callFunction({
			name: 'home',
			data: {
				id,
				type: 'detail'
			}
		}).then((resp) => {
			if (resp?.result?.affectedDocs === 1) {
				model.value = resp?.result?.data[0];
			} else {
				uni.showToast({
					title: '详情数据异常！',
				});
			}
		})
	}

	const onAdd = (formVal) => {
		loading.value = true;
		uniCloud.callFunction({
			name: 'home',
			data: {
				...formVal,
				type: 'add',
			},
		}).then((res) => {
			if (res.result.id) {
				uni.showToast({
					title: '添加成功！',
				});
				loading.value = true;
			};
		});
	}

	const onUpdate = (formVal) => {
		uniCloud.callFunction({
			name: 'home',
			data: {
				id: currentId.value,
				...formVal,
				type: 'update'
			},
		}).then((res) => {
			if (res.result.updated === 1) {
				uni.showToast({
					title: '编辑成功！',
				});
			} else {
				uni.showToast({
					title: '未修改数据！',
				});
			}

		});
	}

	const onSubmit = () => {
		formRef.value.validate().then((formVal) => {
			if (currentType.value === 'add') {
				onAdd(formVal);
			} else {
				onUpdate(formVal);
			}
		}).catch(err => {
			console.log('表单错误信息：', err);
		})
	}

	const onReset = () => {
		formRef.value.clearValidate();
		// 为什么重置不生效，需要手动清空数据
		model.value.steelType = '';
		model.value.time = '';
		model.value.remarks = '';
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 24rpx;

		:deep(.uni-forms-item__label) {
			padding: 0;
		}
	}
</style>