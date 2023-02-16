/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */

import { defineComponent } from "vue"
import './index.scss'

const props = {
    routes: {
        type: Array,
        default: () => [
            {
                title: '首页',
                route: '',
                icon: '',
            },
            {
                title: '附近',
                route: '',
                icon: '',
            },
            {
                title: '优惠中心',
                route: '',
                icon: '',
            },
            {
                title: '我的',
                route: '',
                icon: '',
            }
        ]
    },
    currentIndex: {
        type: Number,
        default: 0
    },
    select: {
        type: Function,
        default: null
    },
    backgroundColor: {
        type: String,
        default: '#fff'
    },
    customIcon: {
        type: Boolean,
        default: true 
    },
    border: {
        type: Boolean,
        default: true
    }
}

export default defineComponent({
    props,
    setup(props, { emit }) {
        
        const renderItem = () => (
            props.routes.map((item: any, index: number) => {
                return (
                    <div class={`eight_bottom-tab-item flex flex-col justify-center items-center`} onClick={() => props.select(index ) }>
                        {
                            props.customIcon ? <img src={item.icon}/> : <span class="eight-icon"></span>
                        }
                        <span class={`item-title ${props.currentIndex == index && 'active'}`} >{item.title}</span>
                    </div>
                )
            })
        )
        

        return () => (
            <div class={`eight_bottom-tab flex justify-around ${props.border && 'border-t-2  border-gray-100 border-solid '}`} style={{backgroundColor: props.backgroundColor}}>
                {renderItem()}
            </div>
        )
    }

})