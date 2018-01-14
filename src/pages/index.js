import DashboardComponent from "./dashboard/Dashboard";
import CreateShoppingListComponent from "./shopping-list/CreateShoppingList";
import EditShoppingListComponent from "./edit-shopping-list/EditShoppingList";
import LoginComponent from "./login/Login";
import RegisterComponent from "./login/Register";
import NotFound from "./NotFound";

export const PATHS = {
    CREATE_LIST: '/list/create',
    VIEW_LIST: '/list/:id',
    DASHBOARD: '/dashboard',
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/'
}

export const routes = [
    {path: PATHS.HOME, exact: true, component: DashboardComponent, display: 'Home', shouldDisplay: true},
    {path: PATHS.LOGIN, exact: true, component: LoginComponent, display: 'Login', shouldDisplay: false},
    {path: PATHS.REGISTER, exact: true, component: RegisterComponent, display: 'Register', shouldDisplay: false},
    {path: PATHS.CREATE_LIST, exact: true, component: CreateShoppingListComponent, display: 'Create new list', shouldDisplay: true},
    {path: PATHS.VIEW_LIST, component: EditShoppingListComponent, display: 'Edit shopping list', shouldDisplay: false},
    {path: PATHS.DASHBOARD, component: DashboardComponent, display: 'Dashboard', shouldDisplay: true},
    {path: '/*', component: NotFound, display: 'Not found', shouldDisplay: false}
];
