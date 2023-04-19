"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_icons2 + _easycom_uni_table2)();
}
const _easycom_uni_th = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-td/uni-td.js";
const _easycom_uni_icons = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_table = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-table/uni-table.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_icons + _easycom_uni_table)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const tableData = common_vendor.ref([]);
    common_vendor.ref(null);
    const steelEnum = {
      0: "方坯",
      1: "刚坯",
      2: "废钢"
    };
    common_vendor.onShow(() => getList());
    const getList = () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.Ls.callFunction({
        name: "home",
        data: {
          type: "list"
        }
      }).then((res) => {
        var _a, _b;
        if ((_a = res == null ? void 0 : res.result) == null ? void 0 : _a.data) {
          tableData.value = (_b = res == null ? void 0 : res.result) == null ? void 0 : _b.data;
        } else {
          common_vendor.index.showToast({
            title: "列表数据异常！"
          });
        }
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    };
    const onAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/home/add/index?type=add"
      });
    };
    const onUpdate = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/home/add/index?type=update&id=${item._id}`
      });
    };
    const onRemove = (item) => {
      const iconEnum = {
        0: "error",
        1: "success"
      };
      const titleEnum = {
        0: "删除失败！",
        1: "删除成功！"
      };
      common_vendor.Ls.callFunction({
        name: "home",
        data: {
          id: item == null ? void 0 : item._id,
          type: "remove"
        }
      }).then((resp) => {
        const {
          deleted
        } = resp == null ? void 0 : resp.result;
        common_vendor.index.showToast({
          icon: iconEnum[deleted],
          title: titleEnum[deleted]
        });
        deleted === 1 && getList();
      });
    };
    const selectionChange = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: "60",
          align: "center"
        }),
        b: common_vendor.p({
          width: "60",
          align: "center"
        }),
        c: common_vendor.p({
          width: "120",
          align: "center"
        }),
        d: common_vendor.p({
          width: "100",
          align: "center"
        }),
        e: common_vendor.p({
          width: "80",
          align: "center"
        }),
        f: common_vendor.f(tableData.value, (item, index, i0) => {
          return {
            a: common_vendor.t(steelEnum[item.steelType]),
            b: "02c63c4c-8-" + i0 + "," + ("02c63c4c-7-" + i0),
            c: common_vendor.t(item.price),
            d: "02c63c4c-9-" + i0 + "," + ("02c63c4c-7-" + i0),
            e: common_vendor.t(item.time),
            f: "02c63c4c-10-" + i0 + "," + ("02c63c4c-7-" + i0),
            g: common_vendor.t(item.remarks),
            h: "02c63c4c-11-" + i0 + "," + ("02c63c4c-7-" + i0),
            i: common_vendor.o(() => onUpdate(item), index),
            j: "02c63c4c-13-" + i0 + "," + ("02c63c4c-12-" + i0),
            k: common_vendor.o(() => onRemove(item), index),
            l: "02c63c4c-14-" + i0 + "," + ("02c63c4c-12-" + i0),
            m: "02c63c4c-12-" + i0 + "," + ("02c63c4c-7-" + i0),
            n: index,
            o: "02c63c4c-7-" + i0 + ",02c63c4c-0"
          };
        }),
        g: common_vendor.p({
          align: "center"
        }),
        h: common_vendor.p({
          align: "center"
        }),
        i: common_vendor.p({
          type: "compose",
          size: "30"
        }),
        j: common_vendor.p({
          type: "trash-filled",
          size: "30"
        }),
        k: common_vendor.sr("table", "02c63c4c-0"),
        l: common_vendor.o(selectionChange),
        m: common_vendor.p({
          loading: loading.value,
          border: true,
          stripe: true,
          type: "selection",
          emptyText: "暂无更多数据"
        }),
        n: common_vendor.o(onAdd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zhangfangchao/projects/uni-app/pages/home/list/index.vue"]]);
wx.createPage(MiniProgramPage);
