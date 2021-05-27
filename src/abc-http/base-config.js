export const httpOptions = {
    baseURL: '/',
    retryDelay: 1000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json,charset:UTF-8"
    },
    timeout: 5000,
    method: 'get' // default method
}

export const statusCode = {
    400: '请求无效',
    401: '由于长时间未操作，登录已超时，请重新登录',
    403: '拒绝访问',
    405: '未授权',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持',
}


