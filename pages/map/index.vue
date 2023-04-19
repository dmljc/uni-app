<template>
	<div class="charts-box">
		<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
	</div>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted,
	} from 'vue';
	import qiunVueUcharts from '@qiun/vue-ucharts';

	// y轴所有的数据
	const allYData = ref([]);
	
	// y 轴最大的值
	const yMax = computed(() => {
		return Math.max(...allYData.value)
	});

	const opts = ref({
		canvas2d: true,
		color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
		padding: [15, 10, 0, 15],
		dataLabel: false,
		dataPointShape: false,
		enableScroll: false,
		legend: {},
		xAxis: {
			disableGrid: true
		},
		yAxis: {
			gridType: "dash",
			dashLength: 2,
			data: [{
				min: 0,
				max: yMax.value
			}]
		},
		extra: {
			line: {
				type: "curve",
				width: 2,
				activeType: "hollow",
				linearType: "custom"
			}
		}
	});

	const chartData = ref({
		categories: [],
		series: []
	});

	const steelEnum = {
		0: "方坯",
		1: "刚坯",
		2: "废钢",
	};

	onMounted(() => {
		getList();
	});
	// 列表
	const getList = () => {
		uni.showLoading({
			title: '加载中......'
		});
		uniCloud.callFunction({
			name: 'home',
			data: {
				type: 'list',
			}
		}).then((res) => {
			const dataSource = res?.result?.data;

			if (dataSource?.length) {
				// x 轴 时间数据处理逻辑
				const xTimes = [];
				dataSource?.forEach((item) => {
					xTimes.push(item?.time)
				});
				const _xTimes = [...new Set(xTimes)];
				chartData.value.categories = _xTimes;

				// y 轴 各类型 数据
				const map = new Map();
				const arr = [];

				dataSource?.forEach((item) => {
					const data = map.get(item.steelType);
					allYData.value.push(Number(item.price));

					if (!data) {
						map.set(item.steelType, [item.price])
					} else {
						data.push(item.price);
						map.set(item.steelType, data)
					}
				});

				map.forEach((val, key) => {
					arr.push({
						name: steelEnum[key],
						data: val,
					})
				});

				chartData.value.series = arr;
			}
		}).catch(() => {
			uni.showToast({
				title: '列表数据异常！',
			});
		}).finally(() => {
			uni.hideLoading();
		});
	};
</script>