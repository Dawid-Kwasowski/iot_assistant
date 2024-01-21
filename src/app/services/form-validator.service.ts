import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

constructor(private translate: TranslateService) { }

private ngUnsubscribe = new Subject<void>();

public errors = new Map<string, Observable<any>>([
  ['required', this.translate.get('validations.required')],
  ['email', this.translate.get('validations.email')],
  ['minLength', this.translate.get('validations.minLength', { number: 6 })]
]);

public getError(errorType: string): string | undefined {
  let result: string | undefined;
  this.errors.get(errorType)?.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
    next: (value: string | undefined): void => {
      result = value;
    },
  });

  return result;
}
ngOnDestroy(): void {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}
}
