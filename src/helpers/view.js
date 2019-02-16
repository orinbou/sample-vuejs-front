import _ from 'lodash';

export const createView = (data, setting) => {
  const view = Object.keys(data)
                            .map(key => {
                              const item = setting.find(list=>list.key === key);
                              return { ...item, value: data[key] }
                            })
                            .filter(item => !item.ignore);
  return _.orderBy(view, 'orderBy');
}