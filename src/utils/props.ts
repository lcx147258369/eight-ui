/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import type { PropType } from "vue";

export const unknownProp = null as unknown as PropType<unknown>;

// 针对数值和字符串props
export const numericProp = [Number, String];

export const truthProp = {
    type: Boolean,
    default: true as const,
}

// 针对必传的props
export const makeRequiredProp = <T>(type: T) => ({
    type,
    required: true as const
})

// 针对数组的props
export const makeArrayProp = <T>() => ({
    type: Array as PropType<T[]>,
    default: () => []
})

export const makeNumberProp = <T>(defaultVal: T) => ({
    type: Number,
    default: defaultVal
})

export const makeNumericProp = <T>(defaultVal: T) => ({
    type: numericProp,
    default: defaultVal
})


export const makeStringProp = <T>(defaultVal: T) => ({
    type: String as unknown as PropType<T>,
    default: defaultVal
})


