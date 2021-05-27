import axios from 'axios';
import { httpOptions } from './base-config';
import { isArray } from './utils';
import interceptors from './interceptors'

export default class Axios {
    constructor() {
        this.httpInstance = null;
    }

    static create(opt, itp) {
        const {
            withCredentials = httpOptions.withCredentials,
            headers = httpOptions.headers,
            timeout = httpOptions.timeout,
            baseURL = httpOptions.baseURL,
            ...res
        } = opt;

        const { requestInterceptors, responseSuccessInterceptors, responseFailInterceptors } = itp;

        const options = {
            baseURL,
            withCredentials,
            headers,
            timeout,
            ...res
        }

        const http = axios.create(options);

        // axios.run -> 请求拦截器2 -> 请求拦截器1 -> axios核心方法 -> 响应拦截器1 -> 响应拦截器2 -> response
        for (const interceptor of [...(requestInterceptors || []), ...interceptors.requestInterceptors]) {
            http.interceptors.request.use(interceptor) // parameter : request - config
        }

        for (let interceptor of [...(responseFailInterceptors || []), ...interceptors.responseFailInterceptors]) {
            http.interceptors.response.use(null, interceptor) // parameter :  response - error
        }

        for (let interceptor of [...(responseSuccessInterceptors || []), ...interceptors.responseSuccessInterceptors]) {
            http.interceptors.response.use(interceptor, null) // parameter :  response - success
        }

        this.httpInstance = http;
        return http;
    }

    static fetch({
        url,
        method = httpOptions.method,
        data,
        ...config
    } = {}) {
        const options = {
          url,
          method,
          ...config
        }

        if (method === 'get') {
            options.params = { ...data }
        } else {
            options.data = { ...data }
        }

        return this.httpInstance(options);
    }

    static all(list) {
        if (!isArray(list)) {
            throw Error('必须传入一个数组！');
        }

        return this.httpInstance.all(list);
    }
}