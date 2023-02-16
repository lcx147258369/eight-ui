/*
 * @Descripttion: 
 * @version: 
 * @Author: lcx
 * @LastEditors: lcx
 */
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import './app.scss'


const componentList = ['Icon', 'Button', 'Cell', 'CellGroup', 'Row', 'Col', 'TabBar', 'Poster', 'Image', 'Overlay'];
export default defineComponent({
    setup () {
        return () => (
            <RouterView>
            </RouterView>
        )
    },
    
})
