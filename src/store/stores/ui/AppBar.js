import { observable } from 'mobx';
import { toggle } from '~/src/core/decorators';

@toggle('toggleAccountMenu', 'accountMenuIsOpen')
export default class AppBar {

  @observable accountMenuIsOpen = false;
}
