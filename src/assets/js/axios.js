/**
 * desc: ajax promise模块
 * author: H_MZ
 **/
import axios from 'axios';
import qs from 'qs';

const ajax = function (url, method, data) {
    let initPar = {};
    initPar = Object.assign(initPar, data);
    let promise = new Promise((resolve, reject) => {
        let instance = axios.create({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true,
            timeout: 6000
        });
        instance[method](url, qs.stringify(initPar)).then(function (res) {
            resolve(res.data);
        }, function (err) {
            reject(err);
        }).catch(function (err) {
            console.log('ajax catch:', err);
        });
    });
    return promise;
};

export default ajax;