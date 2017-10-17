import {DashboardComponent} from "./dashboard/Dashboard";
import {ShoppingListComponent} from "./shopping-list/ShoppingList";
import NotFound from "./NotFound";

export const routes = [
    {path: '/', exact: true, component: DashboardComponent, display: 'Dashboard'},
    {path: '/list/:id', component: ShoppingListComponent, display: 'Shopping list'},
    {path: '/dashboard', component: DashboardComponent, display: 'Dashboard'},
    {path: '/*', component: NotFound, display: 'Not found'}
];
