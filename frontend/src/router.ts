import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Meals from "./pages/Meals.vue";
import Meal from "./pages/Meal.vue";
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/repas", component: Meals },
	{ path: "/repas/:id", component: Meal },
	{ path: "/connexion", component: Login },
	{ path: "/admin", component: Admin },
	{ path: "/:pathMatch(.*)*", component: NotFound }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
