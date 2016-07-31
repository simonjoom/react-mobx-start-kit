import { observable } from 'mobx';
import { toggle } from '~/src/core/decorators';

@toggle('open', 'isOpen')
@toggle('dock', 'isDocked')
export default class AppNav {

  @observable isOpen = false;
  @observable isDocked = false;
}
