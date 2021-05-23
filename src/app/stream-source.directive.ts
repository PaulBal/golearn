import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[streamSource]'
})
export class StreamSourceDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
