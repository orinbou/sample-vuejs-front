/**
 * 画面表示設定
 */
const Staff = [
  {key: 'id', value: 'ID', orderBy: 1, type: 'label'},
  {key: 'firstName', value: '名前', orderBy: 2},
  {key: 'lastName', value: '苗字', orderBy: 3},
  {key: 'email', value: 'Email', orderBy: 4},
  {key: 'tel', value: 'Tel', orderBy: 5},
  {key: 'password', value: 'パスワード', orderBy: 6, type: 'sercret'},
  {key: 'version', value: '改訂番号', orderBy: 0, type: 'ignore'},
]

const find = (key, mapping) => mapping.find(list=>list.key === key)
const decode = (key, mappings) => find(key, mappings).value

const createFeed = (key, results, mappings) => ({
  key: key,
  value: results[key],
  orderBy: find(key, mappings).orderBy,
  type: find(key, mappings).type,
})

const createFeedWithDecode = (key, results, mappings) => ({
  key: find(key, mappings).value,
  value: results[key],
  orderBy: find(key, mappings).orderBy,
  type: find(key, mappings).type,
})

export default {
  decode,
  createFeed,
  createFeedWithDecode,
  Staff,
}
