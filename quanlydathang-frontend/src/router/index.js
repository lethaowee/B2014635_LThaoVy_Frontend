import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/",
        name: "home_page",
        component: () => import("@/views/UserHomePage.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/hanghoa",
        name: "hang hos",
        component: () => import("@/views/HangHoa.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;