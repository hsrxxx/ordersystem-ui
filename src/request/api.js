/**   
 * api接口统一管理
 */
import { get, post, put, deletefn, qspost, qsput, qsdeletefn } from './http'

/**
 * 分页获取 menu 列表
 * @param { Number } index 页数
 * @param { Number } limit 每页展示数
 */
export const findAllMenu = (index, limit) => get(`/menu/findAll/${index}/${limit}`);
