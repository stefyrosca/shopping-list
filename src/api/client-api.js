import request from 'request';

class ClientApi {
    config;
    headers;
    baseUrl;

    constructor(config, headers) {
        this.config = config;
        this.headers = headers;
        this.baseUrl = `http://${this.config.url}:${this.config.port}`;
    }

    urlBuilder(path, query) {
        let url = `${this.baseUrl}/${path}`;
        if (query) {
            let keys = Object.keys(query);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let value = query[key];
                if (i === 0) {
                    url = `${url}?`;
                }
                url = `${url}${key}=${value}`;
                if (i !== keys.length - 1) {
                    url = `${url}&`;
                }
            }
        }
        return url;
    }

    callback = (resolve, reject) => (error, response, body) => {
        if (error || response.statusCode < 200 || response.statusCode > 299) {
            return reject(error);
        }
        return resolve(JSON.parse(body));
    };

    get(path = '', query = null, headers = this.headers) {
        return new Promise((resolve, reject) => {
            request.get({url: this.urlBuilder(path, query), headers}, this.callback(resolve, reject));
        });
    }

    post(path = '', query = null, body = {}, headers = this.headers) {
        return new Promise((resolve, reject) => {
            request.post({url: this.urlBuilder(path, query), headers, body}, this.callback(resolve, reject));
        });
    }

    put(path = '', query = null, body = {}, headers = this.headers) {
        return new Promise((resolve, reject) => {
            request.put({url: this.urlBuilder(path, query), headers, body}, this.callback(resolve, reject));
        });
    }

    delete(path = '', query = null, headers = this.headers) {
        return new Promise((resolve, reject) => {
            request.delete({url: this.urlBuilder(path, query), headers}, this.callback(resolve, reject));
        });
    }
}

export const clientApi = new ClientApi({url: 'localhost', port: 8080}, {});
// export const clientApi = new ClientApi({url: 'jsonplaceholder.typicode.com', port: 80}, {});
