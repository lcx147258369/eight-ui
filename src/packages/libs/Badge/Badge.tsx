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
    CSSProperties,
    ExtractPropTypes,
} from 'vue';
import {
    isDef,
    addUnit,
    isNumeric,
    truthProp,
    numericProp,
    makeStringProp,
    createNamespace,
    Numeric
} from '../../../utils/index'
import './index.scss'


const [name, bem] = createNamespace('badge');

export type BadgePosition = 
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

const badgeProps = {
    dot: Boolean,
    max: numericProp,
    tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
    color: String,
    offset: Array as unknown as PropType<[Numeric, Numeric]>,
    content: numericProp,
    showZero: truthProp,
    position: makeStringProp<BadgePosition>('top-right')
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;

export default defineComponent({
    name,
    props: badgeProps,
    setup(props, { slots}) {

        // 判断content的内容是否显示
        const hasContent = () => {
            if(slots.content) {
                return true;
            }
            const { content, showZero} = props;
            return isDef(content) && content !== '' && (showZero || content !== 0)
        }


        // 这里判断如果不需要展示为小红点就显示content
        const renderContent = () => {
            const { dot, max, content } = props;
            if(!dot && hasContent()) {
                if(slots.content) {  // 判断是否有自定义的slots.content
                    return slots.content()
                }

                // 判断max的类型
                if(isDef(max) && isNumeric(content!)) {
                    return `${max}+`;
                }
                return content;
            }
        }

        const style = computed(() => {
            const style:CSSProperties = {
                background: props.color
            }
            if(props.offset) {
                const [x, y] = props.offset;
                if(slots.default) {

                }
            }
            return style
        })

        const renderBadge = () => {
            if(hasContent() || props.dot) {
                return (
                    <div
                        class={bem([
                            props.position,
                            {dot: props.dot, fixed: !!slots.default}
                        ])}
                        style={style.value}
                    >
                         {renderContent()}
                    </div>
                )
            }
        }

        return () => {
            if(slots.default) {
                const { tag } = props;
                return (
                    <tag class={bem('wrapper')}>
                        {slots.default()}
                        {renderBadge()}
                    </tag>
                )
            }

            return renderBadge();
        }
 
    }
})