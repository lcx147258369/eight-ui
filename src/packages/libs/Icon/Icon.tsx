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
    ExtractPropTypes
} from 'vue';
import {
    addUnit,
    numericProp,
    makeStringProp,
    createNamespace
} from '../../../utils';
import { Badge, BadgeProps } from '../Badge';
import { CONFIG_PROVIDER_KEY } from '../ConfigProvider/ConfigProvider';
import './index.scss';

const [name, bem] = createNamespace('icon');

const isImage = (name?: string) => name?.includes('/');

const iconProps = {
    dot: Boolean,
    tag: makeStringProp<keyof HTMLElementTagNameMap>('i'),
    name: String,
    size: numericProp,
    badge: numericProp,
    color: String,
    badgeProps: Object as PropType<Partial<BadgeProps>>,
    classPrefix: String,
}

export type IconProps = ExtractPropTypes<typeof iconProps>;

export default defineComponent({
    name,
    props: iconProps,
    setup(props, {slots}) {
        const config = inject(CONFIG_PROVIDER_KEY, null)
        const classPrefix = computed(
            () => props.classPrefix || config?.iconPrefix || bem()
        );

        return () => {
            const {tag, dot, name, size, badge, color} = props;
            const isImageIcon = isImage(name);
            return (
                <Badge
                    dot={dot}
                    tag={tag}
                    class={[
                        classPrefix.value,
                        isImageIcon? '': `${classPrefix.value}-${name}`,
                    ]}
                    style={{
                        color,
                        fontSize: addUnit(size)
                    }}
                    content={badge}
                    {...props.badgeProps}
                >

                    {slots.default?.()}
                    {isImageIcon && <img class={bem('image')}  src={name}/>}
                </Badge>
            )
        }

        
    }
})
