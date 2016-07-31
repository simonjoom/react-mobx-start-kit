import { observable } from 'mobx';
import { toggle } from '~/src/core/decorators';

@toggle('open', 'isOpen')
export default class PostCreateModal {

  @observable isOpen = false;
}
