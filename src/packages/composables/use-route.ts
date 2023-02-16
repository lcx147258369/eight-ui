/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import {
    getCurrentInstance,
    PropType,
    ExtractPropTypes,
    ComponentPublicInstance
} from 'vue';    

import { RouteLocationRaw } from 'vue-router';


export const routeProps = {
    to: [String, Object] as PropType<RouteLocationRaw>,
    url: String,
    replace: Boolean
};

export type RouteProps = ExtractPropTypes<typeof routeProps>;

/**
 *  重写了router方法
 * @param param0 
 */
export function route({
    to,
    url,
    replace,
    $router: router
}: ComponentPublicInstance<RouteProps>) {
    if(to && router) {
        router[replace ? 'replace': 'push'](to);
    } else if(url) {
        replace ? location.replace(url): (location.href = url)
    }
}

export function useRoute () {
    const vm = getCurrentInstance()!.proxy as ComponentPublicInstance<RouteProps>;
    return () => route(vm);
}