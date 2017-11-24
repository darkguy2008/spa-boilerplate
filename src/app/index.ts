import * as app from './imports';
import * as views from './views';
import * as modules from './modules';
import * as services from './services';
import * as components from './components';
// import * as directives from './directives';
import './styles/styles.scss';
import './debug';

let imports = Object.values(modules);
let providers = Object.values(services);
let declarations = Object.values(components);
let entryComponents = []; // Object.values(dynamics);
declarations.push.apply(declarations, Object.values(views));

imports.push(modules.RouterModule.forRoot([
    { component: views.MainView, path: '' }
]) as any);

@app.NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    bootstrap: [components.AppComponent],
    entryComponents: entryComponents
})
class AppModule { }
app.platformBrowserDynamic().bootstrapModule(AppModule);
