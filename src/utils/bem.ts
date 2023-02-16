/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

export type Mod = string | {[key: string]: any}
export type Mods = Mod | Mod[]

function gen(name: string, mods?: Mods): string {
    if(!mods) {
        return ''
    }

    if(typeof mods === 'string') {
        return ` ${name}--${mods}`
    }

    if(Array.isArray(mods)) {
        return mods.reduce<string>((ret, item) => ret + gen(name, item), '')
    }

    return Object.keys(mods).reduce(
        (ret, key) => ret + (mods[key] ? gen(name, key): ''),
        ''
    )

}


export function createBEM(name: string) {
    return function (el?: Mods, mods?: Mods):Mods {
        // el如果不存在或者el不为字符串、因此关键参数为el， mods传不传都无所谓
        if(el && typeof el !== 'string') {
            // 将mods 赋值给 el
            mods = el
            // 将el 赋值 ''
            el = ''
        }
        // 判断el是否为空 为空则将eig-badge_el 不为空则直接使用eig-badge
        el = el ? `${name}__${el}` : name 
        // eig-badge_el + gen(el, mods) || eig-badge + gen(el, mods)
        // 如果 el 不存在,则mods为undefined 直接返回 eig-badge
        // 如果 el 为字符串, 则mods为undefined 返回 eig-badge
        // 如果 el 为数组、或者Object时，递归拼接mods eig-badge eig-badge--mods
        // console.log(`${el}${gen(el, mods)}`)
        return `${el}${gen(el, mods)}`
    }
}