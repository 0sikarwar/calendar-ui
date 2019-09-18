export const getData = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}`).then((response) => {
            if (res.status >= 400) {
                reject({});
                return;
            }
            response.json().then((data) => {
                resolve(data);
            });
        }).catch((e) => {
            console.log('ERROR', e);
            reject(e);
        });
    });
};

export const postCall = (url, data, contentType = 'application/json') => {
    console.log('postCall', url, data, contentType)
    return new Promise((resolve, reject) => {
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': contentType
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log('response', res)
            if (res.status >= 400) {
                reject({res});
                return;
            }
            res.json().then((data) => {
                resolve(data);
            });
        }).catch((e) => {
            console.log('ERROR', e);
            reject(e);
        });
    });
}