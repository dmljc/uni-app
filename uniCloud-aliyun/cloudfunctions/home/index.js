'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	switch (event?.type) {
		case 'list':
			return getList(event);
		case 'detail':
			return getDetail(event);
		case 'add':
			return onAdd(event);
		case 'update':
			return onUpdate(event);
		case 'remove':
			return onRemove(event);
		default:
			break;
	}
};

// 列表
const getList = async (event) => {
	const resp = await db.collection('home_list').get();
	return resp;
}

// 详情
const getDetail = async (event) => {
	const resp = await db.collection('home_list').where({
		_id: event.id
	}).get();
	return resp;
}

// 新增
const onAdd = async (event) => {
	const resp = await db.collection('home_list').add(event);
	return resp;
}

// 编辑
const onUpdate = async (event) => {
	const {
		steelType,
		price,
		time,
		remarks,
	} = event;
	const resp = await db.collection('home_list').doc(event.id).update({
		steelType,
		price,
		time,
		remarks,
	});
	return resp;
}

// 删除
const onRemove = async (event) => {
	const resp = await db.collection('home_list').doc(event.id).remove();
	return resp;
}