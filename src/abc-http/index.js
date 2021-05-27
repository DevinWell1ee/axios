import Axios from './axios';

export default class Http {
    constructor({
        options,
        requestInterceptor,
        responseFailInterceptor,
        responseSuccessInterceptor
    }) {
        this.http = Axios.create(options,
            { requestInterceptor,
            responseFailInterceptor,
            responseSuccessInterceptor })
    }

    get({ url, data, config }) {
        return Axios.fetch({ url, data, method: 'get', ...config });
    }

    post({ url, data, config }) {
        return Axios.fetch({ url, data, method: 'post', ...config });
    }

    put({url, data, config}) {
        return Axios.fetch({ url, data, method: 'put', ...config });
    }

    patch({url, data, config}) {
        return Axios.fetch({ url, data, method: 'patch', ...config });
    }

    delete({url, data, config}) {
        return Axios.fetch({ url, data, method: 'delete', ...config });
    }
}