<template>
	<view class="content">
		<uni-forms ref="formRef" :model="model" :rules="rules">
			<uni-forms-item label="姓名" name="name" required>
				<uni-easyinput v-model="model.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="年龄" name="age" required>
				<uni-easyinput v-model="model.age" placeholder="请输入年龄" />
			</uni-forms-item>
			<uni-forms-item label="自我介绍" name="introduction">
				<uni-easyinput type="textarea" v-model="model.introduction" placeholder="请输入自我介绍" />
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
		name: '',
		age: '',
		introduction: '',
	});

	const rules = reactive({
		name: {
			rules: [{
				required: true,
				errorMessage: '请输入姓名'
			}]
		},
		age: {
			rules: [{
				required: true,
				errorMessage: '请输入年龄'
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
	})

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
		model.value.name = '';
		model.value.age = '';
		model.value.introduction = '';
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