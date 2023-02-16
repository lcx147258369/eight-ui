/*
 * @Descripttion:
 * @version:
 * @Author: lcx
 * @LastEditors: lcx
 */

import type { ComponentPublicInstance } from 'vue';

export function noop() {

}

export const extend = Object.assign;

export const inBrowser = typeof window !== 'undefined';

export type Numeric = number | string;

export type ComponentInstance = ComponentPublicInstance<{}, any>;

export function get(object: any, path: string): any {
    const keys = path.split('.');
    let result = object;
    keys.forEach((key) => {
        result = result[key] ?? '';
    });
    return result;
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P]}

export function pick<T, U extends keyof T> (
    obj: T,
    keys: ReadonlyArray<U>,
    ignoreUndefined?: boolean
) {
    return keys.reduce((ret, key) => {
        if(!ignoreUndefined || obj[key] !== undefined) {
            ret[key] = obj[key]
        }
        return ret
    }, {} as Writeable<Pick<T, U>>)
}

// 转换成数组
export const toArray = <T>(item: T | T[]): T[] => Array.isArray(item) ? item: [item]



/**
 * @msg: 判断浏览器平台
 * @param {*} string
 * @return {*}
 */
export const browser = (): string => {
    var ua: string | any = navigator.userAgent.toLowerCase()
    var browser: string = ''
    switch (ua) {
        case ua.match(/MicroMessenger/i) == "micromessenger":
            browser = 'wx'
            break
        case ua.match(/MicroMessenger/i) == "aliapp":
            browser = 'aliapp'
            break
    }
    return browser
}

/**
 * @msg: 判断运行环境
 * @param {*}
 * @return {*}
 */
export const isPlatform = () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (isAndroid) {
        return 'android';
    }
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
        return 'ios';
    }
}

/**
 * 微信H5 history分享解决方案
 * @param {*} url 
 * @param {*} param 
 * @returns 
 */
export function createURL(url: string, params: string | any) {
    let urlLink: string = '';
    for (let i in params) {
        let link = '&' + i + "=" + params[i];
        urlLink += link;
    }
    if (urlLink != '') {
        urlLink = url + "?" + urlLink.substr(1);
    } else {
        urlLink = url;
    }
    return urlLink.replace(' ', '');
}

/**
 * @msg: 拨打电话 
 * @param {number} phone
 * @return {*}
 */
export function callPhone(phone: number | string) {
    if (phone) window.location.href = `tel:${phone}`
}


/**
 * @msg: 防抖函数
 * @param {void} this this在ts中的处理
 * @param {any} fn 需要执行的回调方法
 * @param {number} time 等待时间
 * @param {boolean} immediate 是否立即执行
 * @return {*}
 */
export function debounce(this: void, fn: any, time: number, immediate: boolean): any {
    let timeout: any
    return () => {
        const context = this
        const args = [...arguments]
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            const callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, time)
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args)
            }, time)
        }
    }
}


/**
 * @msg: 节流
 * @param {void} this  this在ts中的处理
 * @param {any} func 需要执行的回调方法
 * @param {number} wait 等待时间
 * @return {*}
 */
export function throttle(this: void, func: any, wait: number) {
    let timeout: any
    return () => {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}


/**
 * @msg: 时间戳转换
 * @param {*} date
 * @return {*}
 */
export function formatDate(date: any) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}



