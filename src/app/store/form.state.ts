import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  StateRepository,
  DataAction,
  Payload,
  Computed,
  Persistence
} from '@angular-ru/ngxs/decorators'
import { NewForm } from 'src/app/types';


@Persistence([{
  path: 'formData',
  existingEngine: localStorage,
  ttl: 4000
}])
@StateRepository()
@State<NewForm>({
  name: 'formData',
  defaults: {
    title: '',
    body: ''
  }
})

@Injectable()
export class FormState extends NgxsDataRepository<NewForm>{

  /**
   * get form data from current state.
   */
  @Computed()
  get getFormData(): NewForm {
    return this.ctx.getState();
  }

  /**
   * Store form data in state.
   * @param formData 
   */
  @DataAction()
  addFormData(@Payload('formData') formData: NewForm): void {
    this.ctx.patchState({
      title: formData.title,
      body: formData.body
    });
  }
 
  /**
   * Reset form data state
   */
  @DataAction()
  resetStoredFormData(): void {
    this.reset();
  }

}