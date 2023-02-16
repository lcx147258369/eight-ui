/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { withInstall } from "../../../utils";
import _Icon from './Icon';
export const Icon = withInstall(_Icon);
export default Icon;
export type { IconProps } from './Icon'
declare module 'vue' {
    export interface GloabalComponens{
        EigIcon: typeof Icon;
    }
}


