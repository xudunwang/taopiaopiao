export default {
    path: '/cinema',
    component: () => import('@/views/Cinema'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'wholeCity',
            component: () => import('@/components/WholeCity')
        },
        {
            path: 'brand',
            component: () => import('@/components/Brand')
        },
        {
            path: '/cinema',
            redirect: '/cinema/wholeCity'
        }
    ]
}