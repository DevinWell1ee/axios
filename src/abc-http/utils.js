export const applyFun = (fn, params) => (typeof fn === 'function' ? fn(params) : fn);

export const isArray = (item) => Object.prototype.toString.call(item) === '[object Array]';

export const isObject = (item) => Object.prototype.toString.call(item) === '[object object]';
