import { ButtonHTMLAttributes } from "vue";

/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'default';

export type ButtonSize = 'large' | 'small' | 'mini' | 'normal';

export type ButtonNativeType = NonNullable<ButtonHTMLAttributes['type']>;

export type ButtonIconPosition = 'left' | 'right';
