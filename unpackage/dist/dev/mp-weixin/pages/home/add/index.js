"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_select = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let formRef = common_vendor.ref(null);
    const currentType = common_vendor.ref("add");
    const currentId = common_vendor.ref(null);
    const loading = common_vendor.ref(false);
    const model = common_vendor.ref({
      steelType: "",
      price: "",
      time: "",
      remarks: ""
    });
    const steelTypes = common_vendor.ref([
      {
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
      }
    ]);
    const rules = common_vendor.reactive({
      steelType: {
        rules: [{
          required: true,
          errorMessage: "请选择钢材类型"
        }]
      },
      price: {
        rules: [{
          required: true,
          errorMessage: "请输入今日报价"
        }]
      },
      time: {
        rules: [{
          required: true,
          errorMessage: "请选择当前时间"
        }]
      }
    });
    common_vendor.onLoad((option) => {
      const id = option == null ? void 0 : option.id;
      const type = option == null ? void 0 : option.type;
      currentType.value = type;
      currentId.value = id;
      if (type == "update") {
        onGetDetail(id);
      }
      common_vendor.index.setNavigationBarTitle({
        title: type === "add" ? "新增" : "编辑"
      });
    });
    const onChangeSteelType = (data) => {
      console.log("select", data);
    };
    const onChangeTime = (data) => {
      console.log("data--time", data);
    };
    const onGetDetail = (id) => {
      common_vendor.Ls.callFunction({
        name: "home",
        data: {
          id,
          type: "detail"
        }
      }).then((resp) => {
        var _a, _b;
        if (((_a = resp == null ? void 0 : resp.result) == null ? void 0 : _a.affectedDocs) === 1) {
          model.value = (_b = resp == null ? void 0 : resp.result) == null ? void 0 : _b.data[0];
        } else {
          common_vendor.index.showToast({
            title: "详情数据异常！"
          });
        }
      });
    };
    const onAdd = (formVal) => {
      loading.value = true;
      common_vendor.Ls.callFunction({
        name: "home",
        data: {
          ...formVal,
          type: "add"
        }
      }).then((res) => {
        if (res.result.id) {
          common_vendor.index.showToast({
            title: "添加成功！"
          });
          loading.value = true;
        }
      });
    };
    const onUpdate = (formVal) => {
      common_vendor.Ls.callFunction({
        name: "home",
        data: {
          id: currentId.value,
          ...formVal,
          type: "update"
        }
      }).then((res) => {
        if (res.result.updated === 1) {
          common_vendor.index.showToast({
            title: "编辑成功！"
          });
        } else {
          common_vendor.index.showToast({
            title: "未修改数据！"
          });
        }
      });
    };
    const onSubmit = () => {
      formRef.value.validate().then((formVal) => {
        if (currentType.value === "add") {
          onAdd(formVal);
        } else {
          onUpdate(formVal);
        }
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    };
    const onReset = () => {
      formRef.value.clearValidate();
      model.value.steelType = "";
      model.value.time = "";
      model.value.remarks = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onChangeSteelType),
        b: common_vendor.o(($event) => model.value.steelType = $event),
        c: common_vendor.p({
          localdata: steelTypes.value,
          modelValue: model.value.steelType
        }),
        d: common_vendor.p({
          label: "钢材类型",
          name: "steelType",
          required: true
        }),
        e: common_vendor.o(($event) => model.value.price = $event),
        f: common_vendor.p({
          placeholder: "请输入今日报价",
          modelValue: model.value.price
        }),
        g: common_vendor.p({
          label: "今日报价",
          name: "price",
          required: true
        }),
        h: common_vendor.o(onChangeTime),
        i: common_vendor.o(($event) => model.value.time = $event),
        j: common_vendor.p({
          type: "date",
          ["clear-icon"]: false,
          modelValue: model.value.time
        }),
        k: common_vendor.p({
          label: "当前时间",
          name: "time",
          required: true
        }),
        l: common_vendor.o(($event) => model.value.remarks = $event),
        m: common_vendor.p({
          type: "textarea",
          placeholder: "请输入备注",
          modelValue: model.value.remarks
        }),
        n: common_vendor.p({
          label: "备注",
          name: "remarks"
        }),
        o: common_vendor.sr(formRef, "93291a41-0", {
          "k": "formRef"
        }),
        p: common_vendor.p({
          model: model.value,
          rules
        }),
        q: loading.value,
        r: common_vendor.o(onSubmit),
        s: common_vendor.o(onReset)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93291a41"], ["__file", "/Users/zhangfangchao/projects/uni-app/pages/home/add/index.vue"]]);
wx.createPage(MiniProgramPage);
