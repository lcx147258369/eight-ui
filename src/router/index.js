import { createRouter, createWebHashHistory } from "vue-router";

const componentList = [
    // 'Icon', 
    // 'Button', 
    // 'Cell', 
    // 'CellGroup', 
    // 'Row', 
    // 'Col', 
    // 'TabBar', 
    // 'Poster', 
    // 'Image', 
    'Overlay'
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: componentList.map((name, index) => ({
        name,
        path: `/${name}`,
        component: () => import(`../packages/libs/${name}/demo/index.vue`)
    }))
})


