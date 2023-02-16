/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

import { isDef, isNumeric } from "./validate";


/**
 * 判断传入的值是否为数字，如果是数字就添加px
 * @param value 单位
 * @returns 
 */
export function addUnit(value?: string | number): string | undefined {
    if(!isDef(value)) {
        return undefined
    }
    console.log(value)
    return isNumeric(value) ? `${value}px`: String(value)
}



const camelizeRE = /-(\w)/g;
export function camelize(str: string): string {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export const kebabCase = (str: string) =>
    str.replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');

