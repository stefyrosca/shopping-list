import DashboardComponent from "./dashboard/Dashboard";
import CreateShoppingListComponent from "./shopping-list/CreateShoppingList";
import {ShoppingListComponent} from "./shopping-list/ShoppingList";
import NotFound from "./NotFound";

export const PATHS = {
    CREATE_LIST: '/list/create',
    VIEW_LIST: '/list/:id',
    DASHBOARD: '/dashboard'
}

export const routes = [
    {path: '/', exact: true, component: DashboardComponent, display: 'Dashboard'},
    {path: PATHS.CREATE_LIST, exact: true, component: CreateShoppingListComponent, display: 'Dashboard'},
    {path: PATHS.VIEW_LIST, component: ShoppingListComponent, display: 'Shopping list'},
    {path: PATHS.DASHBOARD, component: DashboardComponent, display: 'Dashboard'},
    {path: '/*', component: NotFound, display: 'Not found'}
];
