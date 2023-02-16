import { PopupPosition } from "vant";
import { makeStringProp } from "vant/lib/utils";
import { defineComponent, ExtractPropTypes } from "vue";
import { extend } from "../../../utils";
import { createBEM } from "../../../utils/bem";
import { popupSharedProps } from "./shared";

const [name, bem] = createBEM('popup');

export const popupProps = extend({}, popupSharedProps, {
    round: Boolean, 
    position: makeStringProp<PopupPosition>('center'),
    closeIcon: makeStringProp('cross'),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
})

export type PopupProps = ExtractPropTypes<typeof popupProps>




export default defineComponent({
    name,
    inheritAttrs: false,
    setup(props, {emit, attrs ,slots}) {
        
        const renderPopup = () => {
            const {round, position, safeAreaInsetBottom,safeAreaInsetTop} = props;
            return (
                <div 
                    class={bem('')}
                >
                    {slots.default?.()}
                </div>
            )
        }

        const renderOverlay = () => {
            if(props?.overlay) {
                return (
                    
                )
            }
        }

        return () => {

        }
    }
})