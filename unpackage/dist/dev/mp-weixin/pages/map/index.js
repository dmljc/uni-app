"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const allYData = common_vendor.ref([]);
    const yMax = common_vendor.computed(() => {
      return Math.max(...allYData.value);
    });
    const opts = common_vendor.ref({
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
    const chartData = common_vendor.ref({
      categories: [],
      series: []
    });
    const steelEnum = {
      0: "方坯",
      1: "刚坯",
      2: "废钢"
    };
    common_vendor.onMounted(() => {
      getList();
    });
    const getList = () => {
      common_vendor.index.showLoading({
        title: "加载中......"
      });
      common_vendor.Ls.callFunction({
        name: "home",
        data: {
          type: "list"
        }
      }).then((res) => {
        var _a;
        const dataSource = (_a = res == null ? void 0 : res.result) == null ? void 0 : _a.data;
        if (dataSource == null ? void 0 : dataSource.length) {
          const xTimes = [];
          dataSource == null ? void 0 : dataSource.forEach((item) => {
            xTimes.push(item == null ? void 0 : item.time);
          });
          const _xTimes = [...new Set(xTimes)];
          chartData.value.categories = _xTimes;
          const map = /* @__PURE__ */ new Map();
          const arr = [];
          dataSource == null ? void 0 : dataSource.forEach((item) => {
            const data = map.get(item.steelType);
            allYData.value.push(Number(item.price));
            if (!data) {
              map.set(item.steelType, [item.price]);
            } else {
              data.push(item.price);
              map.set(item.steelType, data);
            }
          });
          map.forEach((val, key) => {
            arr.push({
              name: steelEnum[key],
              data: val
            });
          });
          chartData.value.series = arr;
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "列表数据异常！"
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "line",
          opts: opts.value,
          chartData: chartData.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangfangchao/projects/uni-app/pages/map/index.vue"]]);
wx.createPage(MiniProgramPage);
