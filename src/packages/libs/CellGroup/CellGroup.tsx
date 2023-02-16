/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

import {
    defineComponent,
    PropType,
    computed,
    ExtractPropTypes,
} from 'vue';

import { 
    createNamespace,
    truthProp,
    BORDER_TOP_BOTTOM
} from '../../../utils';


import './index.scss';
const [name, bem] = createNamespace('cell-group');
const cellGroupProps = {
    title: String,
    inset: Boolean,
    border: truthProp
}

export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>;

export default defineComponent({
    name,
    props: cellGroupProps,
    setup (props, { slots, attrs }) {
        const renderTitle = () => {
            return(
                <div class={bem('title')} {...attrs}>
                    {
                        slots.title ? slots.title(): props.title 
                    }
                </div> 
             )
        }

        const renderGroup = () => (
            
            <div
                class={[bem({inset: props.inset}), {[BORDER_TOP_BOTTOM]: props.border && !props.inset}]}
            >
                {
                    slots.default?.()
                }
            </div>
        )

        return() => {
            if(props.title || slots.title) {
                return (
                    <>
                        { renderTitle() }
                        { renderGroup()}
                    </>
                )
            }
            return renderGroup();
        }
    }
})