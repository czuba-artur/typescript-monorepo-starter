import {random} from 'lodash';

export class SharedClass {
    sayHello() {
        return `Random number: ${random(0, 100)}`;
    }
}
