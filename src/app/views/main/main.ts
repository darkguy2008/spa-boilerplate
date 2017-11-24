import * as app from '@app/root/imports';
import * as svc from '@app/root/services';
import constants from '@app/root/constants';
import * as _ from 'lodash';

@app.Component({
    selector: 'main',
    templateUrl: './main.html'
})
export class MainView {

    private constants: any = constants;

    constructor() {
    };

}
