/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

import {
    inject,
    computed,
    defineComponent,
    PropType,
    ExtractPropTypes,
    CSSProperties,
    
} from 'vue'

import {
    addUnit,
    numericProp,
    makeStringProp,
    extend,
    createNamespace,
    BORDER_SURROUND
} from '../../../utils';
import { routeProps, useRoute } from '../../composables/use-route';
import { Icon } from '../Icon';
import { ButtonType, ButtonSize, ButtonNativeType, ButtonIconPosition } from './types';
import './index.scss';

const [name, bem] = createNamespace('button');


const buttonProps = extend({}, routeProps, {
    tag: makeStringProp<keyof HTMLElementTagNameMap>('button'),
    type: makeStringProp<ButtonType>('default'),
    size: makeStringProp<ButtonSize>('normal'),
    text: String,
    color: String,
    icon: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: makeStringProp<ButtonNativeType>('button'),
    loadingSize: numericProp,
    loadingText: String,
    // loadingType: String as PropType<LoadingType>,
    iconPosition: makeStringProp<ButtonIconPosition>('left')
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export default defineComponent({
    name,
    props: buttonProps,
    emit: ['click'],
    setup(props, {slots, emit}) {
        const route = useRoute();
        const renderLoadingIcon = () => {
            if(slots.loading) {
                return slots.loading();
            }
            return (
                <Loading
                    size={props.loadingSize}
                    type={props.loadingType}
                    class={bem('loading')}
                />
            )
        }

        const renderIcon = () => {
            if(props.loading) {
                return renderLoadingIcon();
            }

            if(slots.icon) {
                return <span class={bem('icon')}></span>
            }

            if(props.icon) {
                return (
                    <Icon
                        name={props.icon}
                        class={bem('icon')}
                        classPrefix={props.iconPrefix}
                    />
                )
            }
        }

        const renderText = () => {
            let text;
            if(props.loading) {
                text = props.loadingText
            } else {
                text = slots.default ? slots.default() : props.text
            }

            if(text) {
                return <span class={bem('text')}>{text}</span>
            }
        }

        const getStyle = () => {
            const { color, plain } = props;
            if(color) {
                const style: CSSProperties = {
                    color: plain ? color: 'white'
                }
                if(!plain) {
                    style.background = color;
                }

                if(color.includes('gradient')) {
                    style.border = 0;
                } else {
                    style.borderColor = color;
                }
                return style;
            }
        }

        const onClick = (event: MouseEvent) => {
            if(props.loading) {
                // preventDefault(event)

            } else if(!props.disabled) {
                emit('click', event);
                route()
            }
        }

        return () => {
            const {
                tag,
                type,
                size,
                block,
                round,
                plain,
                square,
                loading,
                disabled,
                hairline,
                nativeType,
                iconPosition
            } = props;

            const classes = [
                bem([
                    type,
                    size,
                    {
                        plain,
                        block,
                        round,
                        square,
                        loading,
                        disabled,
                        hairline
                    }
                ]),
                {[BORDER_SURROUND]: hairline}
            ];

            return (
                <tag
                    type={nativeType}
                    class={classes}
                    style={getStyle()}
                    disabled={disabled}
                    onClick={onClick}
                >
                    <div class={bem('content')}>
                        {/* {iconPosition === 'left' && renderIcon()} */}
                        {renderText()}
                        {/* {iconPosition === 'right' && renderIcon()} */}
                    </div>
                </tag>
            )
        }
    },
})


