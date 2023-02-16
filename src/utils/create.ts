/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

import { camelize } from "./format"
import { createBEM } from "./bem"
import { isFunction } from "./validate"

export function createTranslate (name: string) {
    const prefix = camelize(name) + '.'
    return function (path: string, ...args: any[]): any {
        const messages = locale.messages()
        const message = get(messages, prefix + path) || get(message, path)
        return isFunction(message) ? message(...args): message
    }
}


// 创建一个命民空间
export function createNamespace(name: string) {
    const prefixedName = `eig-${name}`
    return [
        prefixedName,
        createBEM(prefixedName),
        // cr
    ] as const
}

export type BEM = ReturnType<typeof createBEM>;