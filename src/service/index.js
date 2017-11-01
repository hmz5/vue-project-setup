import ajax from '../common/js/axios';

// ------------------ 优惠 ---------------------

export function couponList(paramer) {
    let page = paramer.data.page;
    let pageSize = paramer.data.pageSize;
    page = page == undefined || page == '' ? 1 : page;
    pageSize = pageSize == undefined || pageSize == '' ? 10 : pageSize;
    ajax('/content/preferential-activity-list', 'post', {
        page: page,
        page_size: pageSize
    }).then((res) => {
        var error = res.status.err_code;
        if (error == 0) {
            paramer.success(res.data);
        } else {
            paramer.fail(res);
        }

    });
}

export function couponDetail(paramer) {
    let id = paramer.data.id;
    id = id == undefined || id == '' ? '' : id;
    ajax('/content/preferential-activity-detail', 'post', {
        id: id
    }).then((res) => {
        var error = res.status.err_code;
        if (error == 0) {
            paramer.success(res.data);
        } else {
            paramer.fail(res);
        }

    });
}

export function couponApply(paramer) {
    ajax('/coupon/apply', 'post', paramer.data).then((res) => {
        var error = res.status.err_code;
        if (error == 0) {
            paramer.success(res.data);
        } else {
            paramer.fail(res);
        }

    });
}

//登录注册

//注册
export function register(paramer) {
    ajax('/login/register', 'post', paramer.data).then((res) => {
        var error = res.status.err_code;
        if (error == 0) {
            paramer.success(res.data);
        } else {
            paramer.fail(res);
        }

    });
}

//登录
export function login(paramer) {
    ajax('/login/login', 'post', paramer.data).then((res) => {
        var error = res.status.err_code;
        if (error == 0) {
            paramer.success(res.data);
        } else {
            paramer.fail(res);
        }

    });
}

//验证码
export function verifyCode(paramer) {
    ajax('/login/verify-code', 'post', paramer.data).then((res) => {
        paramer.success(res);
    });
}