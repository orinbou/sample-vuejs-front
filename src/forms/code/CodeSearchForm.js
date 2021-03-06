import { BaseForm } from '@/lib';
import {
  TextFormItem, SelectFormItem, SortFormItem, FlagFormItem,
} from '@/forms/items';
import { set } from '@/helpers/list';

export class CodeSearchForm extends BaseForm {
  constructor({
    categoryKey = '',
    codeKey = '',
    codeAlias = '',
    isInvalid = '',
    rows = '',
    page = '',
    sort = '',
  } = {},
  codeCategories = [],
  codeSortItems = []) {
    if (codeCategories.length === 0) {
      throw new Error('[CodeSearchForm] codeCategories must not be empty');
    }
    if (codeSortItems.length === 0) {
      throw new Error('[CodeSearchForm] codeSortItems must not be empty');
    }

    super();
    this.addItem('categoryKey', new SelectFormItem(categoryKey, codeCategories));
    this.addItem('codeKey', new TextFormItem(codeKey));
    this.addItem('codeAlias', new TextFormItem(codeAlias));
    this.addItem('isInvalid', new FlagFormItem(isInvalid));

    // for list search
    set(this, rows, page);
    this.addItem('sort', new SortFormItem(sort, codeSortItems));
  }
}
