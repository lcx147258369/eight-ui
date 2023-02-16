/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import {
    computed,
    defineComponent,
    PropType,
    ExtractPropTypes,
    CSSProperties
} from 'vue';

import { addUnit, unknownProp, numericProp, extend, makeStringProp, createNamespace, BORDER_BOTTOM, isDef } from '../../../utils';
import { routeProps, useRoute } from '../../composables/use-route';
import { Icon } from '../Icon';
import { CellSize, CellDirection } from './types';
import './index.scss';

const [name, bem] = createNamespace('cell');
const cellProps = extend({}, routeProps, {
    title: numericProp,
    value: numericProp,
    label: numericProp,
    size: makeStringProp<CellSize>('normal'),
    icon: String,
    iconPrefix: String,
    border: Boolean,
    clickable: {
        type: Boolean as PropType<boolean | null>,
        default: null
    },
    isLink: Boolean,
    requird: Boolean,
    center: Boolean,
    arrowDirection: makeStringProp<CellDirection>('right'),
    titleStyle: null as unknown as PropType<string | CSSProperties>, 
    titleClass: unknownProp,
    valueClass: unknownProp,
    labelClass: unknownProp
})

export type CellProps = ExtractPropTypes<typeof cellProps>;

export default defineComponent({
    name,
    props: cellProps,
    setup (props, {slots}) {
        const route = useRoute();

        const renderTitle = () => {
            return (
                <>
                    <div 
                        class={[bem('title'), props.titleClass]}
                        style={props.titleStyle}
                    >
                        {slots.title ? slots.title(): <span>{props.title}</span>}
                        {renderLabel()}
                    </div>
                </>
            )
        }

        const renderLeftIcon = () => {
            const showLeftIcon = slots.icon || isDef(props.icon);
            if(showLeftIcon) {
                return (
                    slots.icon ? slots.icon(): <Icon name={props.icon} classPrefix={props.iconPrefix} class={bem('left-icon')}></Icon>
                )
            }
            
        }

        const renderRightIcon = () => {
            if(slots.rightIcon) {
                return slots.rightIcon();
            }
            if(props.isLink) {
                const name = props.arrowDirection ? `arrow-${props.arrowDirection}`: 'arrow'
                return <Icon name={name} class={bem('right-icon')} classPrefix={props.iconPrefix}></Icon>
            }
        }

        const renderValue = () => {
            return(
                <div class={[bem('value'), props.valueClass]}>
                    {
                        slots.value ? slots.value(): <span>{props.value}</span>  
                    }
                </div>
            )
        }

        const renderLabel = () => {
            const showLabel = slots.label || isDef(props.label)
            if(showLabel ) {
                return (
                    <div class={[bem('label'), props.labelClass]}>
                        {slots.label ? slots.label(): props.label}
                    </div>
                )
            }
          
        }

        return() => {
            const { size, center, border, isLink, requird } = props;
            const clickable = props.clickable ?? isLink;
            const classes: Record<string, boolean | undefined> = {
                center,
                borderless: !border,
                clickable
            }
            if(size) {
                classes[size] = true; 
            }
            return (
                <div
                    class={bem(classes)}
                    onClick={route}
                >   
                    {renderLeftIcon()}
                    {renderTitle()}
                    {renderValue()}
                    {renderRightIcon()} 
                </div>
            )
        }
       
    }
})