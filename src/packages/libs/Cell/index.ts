/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { withInstall } from '../../../utils';
import _Cell from './Cell';

export const Cell = withInstall(_Cell);

export default Cell;

export type { CellProps } from './Cell';

declare module 'vue' {
    export interface GlobalComponents{
        EigCell: typeof Cell
    }
}






