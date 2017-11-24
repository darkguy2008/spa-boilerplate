import * as app from '@app/root/imports';
import * as svc from '@app/root/services';
import constants from '@app/root/constants';

@app.Injectable()
export class CustomCompileService {

    private appRef: app.ApplicationRef;

    constructor(
        private injector: app.Injector,
        private resolver: app.ComponentFactoryResolver
    ) { }

    configure(appRef) {
        this.appRef = appRef;
    }

    compile(component, onAttach = undefined) {
        const compFactory = this.resolver.resolveComponentFactory(component);
        let compRef = compFactory.create(this.injector);

        if (onAttach)
            onAttach(compRef.instance);

        this.appRef.attachView(compRef.hostView);
        compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

        return compRef.location.nativeElement;
    }

}