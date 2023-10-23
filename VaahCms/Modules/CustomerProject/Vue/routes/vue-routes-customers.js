let routes= [];
let routes_list= [];

import List from '../pages/customers/List.vue'
import Form from '../pages/customers/Form.vue'
import Item from '../pages/customers/Item.vue'


routes_list = {

    path: '/customers',
    name: 'customers.index',
    component: List,
    props: true,
    children:[
        {
            path: 'form/:id?',
            name: 'customers.form',
            component: Form,
            props: true,
        },
        {
            path: 'view/:id?',
            name: 'customers.view',
            component: Item,
            props: true,
        },




    ]


};

routes.push(routes_list);

export default routes;

