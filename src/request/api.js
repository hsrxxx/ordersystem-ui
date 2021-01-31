/**   
 * api接口统一管理
 */
import { get, post, put, deletefn, qspost, qsput, qsdeletefn } from './http'

// ---------------------------------------------------------------------------------------------------------------------
// menu.vue api

/**
 * 分页获取 menu 列表
 * @param { Number } index 页数
 * @param { Number } limit 每页展示数
 * @returns { Promise<unknown> }
 */
export const findAllMenu = (index, limit) => get(`/menu/findAll/${index}/${limit}`);

/**
 * 通过 id 获取 menu
 * @param { Number } id
 * @returns { Promise<unknown> }
 */
export const findByIdMenu = (id) => get(`/menu/findById/${id}`);

/**
 * 获取 menu type 列表
 * @returns {Promise<unknown>}
 */
export const findAllType = () => get('/menu/findAllTypes');

/**
 * 通过 id 删除 menu
 * @param { Number } id
 * @returns { Promise<unknown> }
 */
export const deleteByIdMenu = (id) => deletefn(`/menu/deleteById/${id}`);

/**
 * 通过 data 列表批量删除 menu
 * @param { Object } data = { ids: [...]}
 * @returns {Promise<unknown>}
 */
export const deleteBatchIdsMenu = (data) => qsdeletefn(`/menu/deleteBatchIds`, data);

/**
 * 通过 data 对象修改 menu, id 不为空
 * @param { Object } data = { id: ..., name: ..., price: ..., flavor: ..., tid: ... }
 * @returns {Promise<unknown>}
 */
export const updateByIdMenu = (data) => put('/menu/updateById', data);

/**
 * 通过 data 对象保存 menu, id 为空
 * @param { Object } data = { id: ..., name: ..., price: ..., flavor: ..., tid: ... }
 * @returns {Promise<unknown>}
 */
export const saveMenu = (data) => post('/menu/save', data);

// ---------------------------------------------------------------------------------------------------------------------
// user.vue api

/**
 * 分页获取 user 列表
 * @param { Number } index 页数
 * @param { Number } limit 每页展示数
 * @returns { Promise<unknown> }
 */
export const findAllUser = (index, limit) => get(`/user/findAll/${index}/${limit}`);

/**
 * 通过 id 获取 user
 * @param { Number } id
 * @returns { Promise<unknown> }
 */
export const findByIdUser = (id) => get(`/user/findById/${id}`);

/**
 * 获取 user 数量
 * @returns {Promise<unknown>}
 */
export const countUser = () => get('/user/count');

/**
 * 通过 id 删除 user
 * @param { Number } id
 * @returns { Promise<unknown> }
 */
export const deleteByIdUser = (id) => deletefn(`/user/deleteById/${id}`);

/**
 * 通过 data 列表批量删除 user
 * @param { Object } data = { ids: [...]}
 * @returns {Promise<unknown>}
 */
export const deleteBatchIdsUser = (data) => qsdeletefn(`/user/deleteBatchIds`, data);

/**
 * 通过 data 对象修改 user, id 不为空
 * @param { Object } data = { id: ..., username: ..., nickname: ..., email: ..., telephone: ..., sex: ..., address: ..., remark: ..., status: ... }
 * @returns {Promise<unknown>}
 */
export const updateByIdUser = (data) => put('/user/updateById', data);

/**
 * 通过 data 对象保存 user, id 为空
 * @param { Object } data = { id: ..., username: ..., nickname: ..., email: ..., telephone: ..., sex: ..., address: ..., remark: ..., status: ... }
 * @returns {Promise<unknown>}
 */
export const saveUser = (data) => post('/user/save', data);
