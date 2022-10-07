// 过滤页面路径
// eslint-disable-next-line import/prefer-default-export
export const filterPath = (path:string):string => `/${path.split('/')[1]}` 
