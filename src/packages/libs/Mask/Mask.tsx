/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { defineComponent } from "@vue/runtime-core"
import './index.scss'
const props = {
    show: {
        type: Boolean
    }
}

export default defineComponent({
    props,
    setup(props, { slots }){
        return () => (
            props.show &&
            <div class="eight-mask">
                {
                    slots.default && slots.default()
                }
            </div>
        )
    }
})