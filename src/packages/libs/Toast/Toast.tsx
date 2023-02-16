/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import {
    watch,
    onMounted,
    onUnmounted,
    defineComponent,
    PropType,
    TeleportProps,
    CSSProperties,
    ExtractPropTypes
} from 'vue'

import {
    pick,
    isDef,
    unknownProp,
    numericProp,
    makeStringProp,
    makeNumberProp,
    createNamespace,
} from '../../../utils';

import {Icon} from '../Icon'

const [name, bem] = createNamespace('toast');

const popupInheritProps = [
    'show',
    'overlay',
    'teleport',
    'transition',
    'overlayClass',
    'overlayStyle',
    'closeOnClickOverlay'
] as const;

const toastProps = {
    icon: String,
    show: Boolean,
    type: makeStringProp,
    overlay: Boolean,
    message: numericProp,
    iconSize: numericProp,
    duration: makeNumberProp(2000),
    position: makeStringProp,
    teleport: [String, Object] as PropType<TeleportProps['to']>,
    className: unknownProp,
    iconPrefix: String,
    
}