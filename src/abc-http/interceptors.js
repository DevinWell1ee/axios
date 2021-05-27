import qs from 'qs';
import { statusCode } from './base-config'

const requestTypeTransform = (config) => {
    console.log('req: ---- 2');

    let { data, headers, contentType, ...res } = config

    if (contentType === 'formData') {
      data = transformToFormData(data)
    } else if (contentType === 'text') {
      headers = Object.assign(headers || {}, {
        'Content-Type': 'text/plain;charset=UTF-8'
      })
    } else if (contentType === 'json') {
      headers = Object.assign(headers || {}, {
        'Content-Type': 'application/json'
      })
    } else if (contentType === 'form') {
      headers = Object.assign(headers || {}, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })

      data = qs.stringify(data)
    }

    return { data, headers, contentType, ...res };
}

const customHeader = config => {
  console.log('req: ---- 1');
  const { header } = config // 自定义的header

    if (header) {
      config.headers = { ...config.headers, ...header }
    }

    return config
}

function transformToFormData(data) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    })

    return formData;
}

const formatData = (response) => {
    console.log('res: ---2')

    return response.data.data
}

const DEFAULT_RES_ERROR = '加载异常，请稍后再试'

const httpStatusError = (error) => {
  console.log('res: ---1')
  const { status } = error;

  error.msg = statusCode[status] || DEFAULT_RES_ERROR;

  return  Promise.reject(error);
}

const interceptors = {
    requestInterceptors: [requestTypeTransform, customHeader],
    responseSuccessInterceptors: [formatData],
    responseFailInterceptors: [httpStatusError]
}

export default interceptors
