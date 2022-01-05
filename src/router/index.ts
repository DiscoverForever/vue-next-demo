import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Modal from '../components/modal/index.vue'
import Button from '../components/button/index.vue'
import InputNumber from '../components/input-number/index.vue'
import Home from '../views/Home.vue'
import Example from '../views/example.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/input-number',
    name: 'InputNumber',
    component: InputNumber,
  },
  {
    path: '/example',
    name: 'Example',
    component: Example,
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/components/test/index.vue'),
  },
  {
    path: '/button',
    name: 'Button',
    component: Button,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
