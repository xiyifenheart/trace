import VueRouter from 'vue-router'
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import CallChainTrace from './components/callChainTrace/CallChainTrace.vue'
import PathAnalysed from './components/pathAnalysed/PathAnalysed.vue'
import DirectionAnalysed from './components/DirectionAnalysed.vue'
import SourceAnalysed from './components/SourceAnalysed.vue'
import LogView from './components/LogView.vue'

const routes = [
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'callchaintrace',
                component: CallChainTrace
            },
            {
                path: 'pathanalysed',
                component: PathAnalysed
            },
            {
                path: 'directionanalysed',
                component: DirectionAnalysed
            },
            {
                path: 'sourceanalysed',
                component: SourceAnalysed
            },
            {
                path: 'logview',
                component: LogView
            }
        ]
    },
    { path: '*', redirect: '/login' }
];

const router = new VueRouter({
    routes
});

export default router;