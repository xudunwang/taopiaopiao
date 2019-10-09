export  default {
    path : '/movie',
    component : ()=> import('@/views/Movie'),
    children : [
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'nowPlaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingSoon',
            component : () => import('@/components/ComingSoon')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
        },
        {
            // 配动态路由:movieId,方便跳转详情页
            path : 'detail/1/:movieId',
            // 命名路由为components
            components:{
                // 默认组件
                default :()=> import('@/components/NowPlaying'),
                // 这个detail和命名路由的name是一样的
                detail:()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : 'detail/2/:movieId',
            components:{
                default :()=> import('@/components/ComingSoon'),
                detail:()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : '/movie',
            redirect : '/movie/nowPlaying'
        }
    ]
}
