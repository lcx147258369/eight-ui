/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import {withInstall} from '@/utils';
import _ConfigProvider from './ConfigProvider';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
export type { ConfigProviderProps } from './ConfigProvider'

declare module 'vue' {
    export interface GlobalComponents {
        EightConfigProvider: typeof ConfigProvider;
    }
}