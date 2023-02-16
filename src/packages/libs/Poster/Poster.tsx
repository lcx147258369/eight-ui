/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { defineComponent, ref, nextTick, onMounted, watchEffect } from "@vue/runtime-core"
import Mask from "../Mask/Mask"
import './index.scss'
import html2canvas from "html2canvas"

const props = {
    currentIndex: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        require: true
    },
    styles: {
        type: Object,
        default: {
            width: '300px',
            height: '450px'
        }
    },
    show: {
        type: Boolean
    }
}

const emits = ['update:show']

export default defineComponent({
    props,
    setup(props, { slots, emit }){
        let src = ref<string>()
        onMounted(() => {
            nextTick(() => {
                // canvasCutScreen()
            })
        })

        watchEffect(() => {
            console.log(props.currentIndex)
        })

        const canvasCutScreen = () => {
            let clientWidth = document.documentElement.clientWidth
            let scale: number= (clientWidth / 375)* 0.8
            const shareContent: HTMLElement = document.getElementById("canvas")
            const width = shareContent.offsetWidth * scale; // 获取dom 宽度
            const height = shareContent.offsetHeight * scale; // 获取dom 高度
            const rect = shareContent.getBoundingClientRect(); // 获取元素相对于视口的位置
            html2canvas(shareContent, {
                x: rect.left, // 绘制的dom元素相对于视口的位置
                y: rect.top,
                width: width,
                height: height,
                useCORS: true,
                scrollY: 0,
                scrollX: 0,
                backgroundColor: null
            })
            .then(canvas => {
                src.value =  canvas.toDataURL("image/png");
            })
            .catch(err => {
                console.log("canvasErr: " + err);
            });
        } 

        const renderCover = () => (
            slots.cover ? (
                <div class="eight_poster-cover flex justify-between pl-30 pr-30">
                    {
                        slots.cover()
                    }
                </div>
            ): null         
        )

        const updateShow = () => {
            emit('update:show', false)
            
        }

        return () => (
            <Mask show={props.show}>
                <div style={props.styles} class="eight_poster-content text-center">
                    {
                        src.value ? 
                        <img src={src.value}/> : 
                        <div id="canvas"  style={{backgroundImage: `url(${props.url})`}}>
                            {
                                slots.default && slots.default()
                            }
                        </div>
                        
                    }
                    <div class="text-center save-text">长按图片，保存你的海报</div>
                    <span class="text-center van-icon van-icon-close text-4xl eight_close" onClick={updateShow }></span>
                </div>
                {
                    renderCover()
                }
            </Mask>
        )
    }
})