/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { 
    provide,
    computed,
    defineComponent,
    PropType,
    InjectionKey,
    CSSProperties,
    ExtractPropTypes
} from 'vue'
import {
    kebabCase,
    makeStringProp,
    createNamespace,
    Numeric
} from '../../../utils'
import { config } from 'process';

const [name, bem] = createNamespace('config-provider');

export type ConfigProviderProvide = {
    iconPrefix?: string
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide> = Symbol(name);

const configProviderProps = {
    tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
    themeVars: Object as PropType<Record<string, Numeric>>,
    iconPrefix: String,
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

// 主题变量转换CSS变量
function mapThemeVarsToCSSVars(themeVars:Record<string, Numeric>) {
    const  cssVars: Record<string, Numeric> = {}
    Object.keys(themeVars).forEach((key) => {
        cssVars[`--eig-${kebabCase(key)}`] = themeVars[key];
    })
    return cssVars
}


export default defineComponent({
    name,
    props: configProviderProps,
    setup(props, {slots}) {
        const style = computed<CSSProperties | undefined>(() => {
            if(props.themeVars) {
                return mapThemeVarsToCSSVars(props.themeVars);
            }
        })

        provide(CONFIG_PROVIDER_KEY, props);

        return () => (
            <props.tag class={bem()} style={style.value}>
                {slots.default?.()}
            </props.tag>
        )
    }
    
})