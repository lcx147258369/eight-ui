/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import {
    computed,
    defineComponent,
    ExtractPropTypes,   
    PropType
} from 'vue'
import { createNamespace, makeNumericProp, makeStringProp, numericProp } from '../../../utils'
import { useParent } from '../../use';
import { ROW_KEY } from '../Row/Row';

const [name, bem] = createNamespace('col');

const colProps = {
    span: makeNumericProp(0),
    offset: numericProp,
    tag: makeStringProp<keyof HTMLElementTagNameMap>('div')
}

export type ColProps = ExtractPropTypes<typeof colProps>;

export default defineComponent({
    name,
    props: colProps,
    setup(props, {slots}) {
        const {parent, index} = useParent(ROW_KEY);
        
        const style = computed(() => {
            if(!parent) {
                return
            }
            const {spaces} = parent;
            if(spaces && spaces.value && spaces.value[index.value]) {
                const {left, right} = spaces.value[index.value];
                return {
                    paddingLeft: left ? `${left}px`: null,
                    paddingRight: right ? `${right}px`: null
                }
            }
        })

        return () => {
            const {tag, span, offset} = props;
            return (
                <tag
                    style={style.value}
                    class={bem({[span]: span, [`offset-${offset}`]: offset})}
                >
                    {slots.default?.()}
                </tag>
            )
        }
    }
})