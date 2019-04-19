export const getData = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        fetch(`${url}`).then((response) => {
            response.json().then((data) => {
                resolve(data);
            });
        }).catch((e) => {
            console.log('ERROR', e);
            reject(e);
        });
    });
};

export const postCall = (url, data, contentType = 'any') => {
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
            res.json().then((data) => {
                resolve(data);
            });
        }).catch((e) => {
            console.log('ERROR', e);
            reject(e);
        });
    });
}