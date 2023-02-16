
/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { 
    defineComponent, 
    PropType, 
    computed,
    CSSProperties,
    ref,
    getCurrentInstance,
    // ComponentInstance
} from "vue";
import { isDef, addUnit, createNamespace, ComponentInstance } from '../../../utils'

import './index.scss'
export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

const props = {
    src: String,
    alt: String,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    round: Boolean,
    fit: String as PropType<ImageFit>,
    showLoading: Boolean,
    showError: Boolean,
    lazyload: Boolean
}

const [name, bem] = createNamespace('image')
export default defineComponent({
    props,
    setup(props, { emit, slots }) {
        const loading = ref(true)
        const error = ref(false)
        const imageRef = ref<HTMLElement>();
        const { $Lazyload } = getCurrentInstance()!.proxy as ComponentInstance;

        const style = computed(() => {
            const style:CSSProperties = {};
            if(isDef(props.width)) {
                style.width = addUnit(props.width)
            }

            if(isDef(props.height)) {
                style.height = addUnit(props.height)
            }
            
            if(isDef(props.radius)) {
                style.overflow = 'hiddden'
                style.borderRadius = addUnit(props.radius)
            }
            return style
        })

        const onLoad = (event?: Event) => {
            loading.value = false
            emit('load', event)
        }

        const onError = (event?: Event) => {
            error.value = true
            loading.value = false
            emit('error', event)
        }

        const renderLoadingIcon = () => {
            if(slots.loading) {
                return slots.loading()
            }
        }

        const renderErrorIcon = () => {
            if(slots.error) {
                return slots.error();
            }
        }

        const renderPlaceholder = () => {
            if(loading.value && props.showLoading) {
                return <div class={bem('loading')}>{renderLoadingIcon()}</div>
            }

            if(error.value && props.showError) {
                return <div class={bem('error')}>{renderErrorIcon()}</div>
            }
        }

        const lazyloaded = ({el}: {el: HTMLElement}) => {
            if(el === imageRef.value && loading.value) {
                onLoad()
            }
        }

        const lazyloadError = ({el}: {el: HTMLElement}) => {
            if(el === imageRef.value && error.value) {
                onError()
            }
        }

        const renderImage = () => {
            if(error.value || !props.src) return
            const attrs = {
                alt: props.alt,
                class: bem('img'),
                style: {
                    objectFit: props.fit
                }
            }
            
            if(props.lazyload) {
                return (
                    <img ref={imageRef} {...attrs} v-lazy={props.src}/>
                )
            }

            return (
                <img src={props.src} {...attrs} onLoad={onLoad} onError={onError}/>
            )
        }

        return () => (
            <div class={bem({round: props.round})} style={style.value}>
                {
                     renderImage()
                }
            </div>
           
        )
    }
    
})