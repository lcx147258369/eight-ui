import { getZIndexStyle } from "vant/lib/utils";
import { CSSProperties, ref, defineComponent, ExtractPropTypes, PropType } from "vue";
import { createNamespace, extend, isDef, numericProp, truthProp, unknownProp } from "../../../utils";


const [name, bem] = createNamespace('overlay');

export const overlayProps = {
    show: Boolean, // 显示
    zIndex: numericProp, // 层级
    duration: numericProp, // 动画时间
    className: unknownProp, // 样式名
    lockScroll: truthProp, // 滚动锁定
    lazyRender: truthProp, // 懒加载
    customStyle: Object as PropType<CSSProperties> // 自定义样式
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>;

export default defineComponent({
    name,
    props: overlayProps,
    setup(props, {slots}) {
        const root = ref<HTMLElement>();
        //懒加载 先没做
        // const lazyRender = useL

        // 渲染下遮罩
        const renderOverlay = () => {
            const style: CSSProperties = extend(
                getZIndexStyle(props.zIndex),
                props.customStyle
            )
            if(isDef(props.duration)) {
                style.animationDuration = `${props.duration}s`;
            }
            return (
                <div>
                    {slots.default?.()}
                </div>
            )
        }

        return () => {
            return (
                <div>
                    
                </div>
            )
        }
    },

})