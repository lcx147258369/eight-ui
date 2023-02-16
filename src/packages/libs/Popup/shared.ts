import { truthProp, unknownProp, numericProp } from "../../../utils";
import type { PropType, CSSProperties, Teleport, TeleportProps } from 'vue'
import { Interceptor } from "vant/lib/utils";

/**
 * 这里应该是popup还在其它组件中有调用，抽出了一些公共属性
 */
export const popupSharedProps = {
    show: Boolean, // 显示
    zIndex: numericProp, // 层级
    overlay: truthProp, // 遮罩
    durantion: numericProp, // 动画时间
    teleport: [String, Object] as PropType<TeleportProps['to']>,
    lockScroll: truthProp, // 阻止滚动
    lazyRender: truthProp, // 
    beforeClose: Function as PropType<Interceptor>, // 关闭回调
    overlayStyle: Object as PropType<CSSProperties>, // 遮罩style
    overlayClass: unknownProp, // 遮罩class
    transitionAppear: Boolean, // 是否渲染动画
    closeOnClickOverlay: truthProp  // 点击遮罩是否关闭

}

export type PopupSharedPropKeys = Array<keyof typeof popupSharedProps>;

export const popupSharedPropKeys = Object.keys(popupSharedProps) as PopupSharedPropKeys

