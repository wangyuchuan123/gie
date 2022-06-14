import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/layout'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        // 首页
        path: '/home',
        component: Layout,
        redirect: '/home/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ("@/views/Dashboard"),
            meta: {
                title: '首页'
            }
        }]
    }, {
        // 图片上传
        path: '/upload',
        component: Layout,
        redirect: '/upload/upload',
        children: [{
            path: 'upload',
            component: () =>
                import ("@/views/Upload/upload"),
            meta: {
                title: '图片上传'
            }
        }]
    },
    {
        // 图标
        path: '/charts',
        component: Layout,
        children: [{
            path: 'bar',
            component: () =>
                import ('@/views/layout/Charts/bar'),
            meta: {
                title: '柱状图'
            }
        }, {
            path: 'pie',
            component: () =>
                import ('@/views/layout/Charts/pie'),
            meta: {
                title: '饼状图'
            }
        }]
    }, {
        // 学生
        path: '/StuAdmin',
        component: Layout,
        children: [{
                path: 'addNewStu',
                component: () =>
                    import ("@/views/StuAdmin/AddNewStu"),
                meta: {
                    title: '新生报名'
                }
            },
            {
                path: 'adminClass',
                component: () =>
                    import ("@/views/StuAdmin/AdminClass"),
                meta: {
                    title: '班级管理'
                }
            },
            {
                path: 'stuInfo',
                component: () =>
                    import ("@/views/StuAdmin/StuInfo"),
                meta: {
                    title: '学生信息'
                }
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({

    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let token = sessionStorage.getItem("token")
    if (to.fullPath === '/login') {
        next()
    } else {
        if (token) {
            next()
        } else {
            next("/login")
        }
    }
})

export default router