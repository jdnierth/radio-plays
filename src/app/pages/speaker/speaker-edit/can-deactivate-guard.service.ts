import {Observable} from "rxjs";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";

export interface CanComponentDeactivated {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivated>{
  canDeactivate(component: CanComponentDeactivated,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }
}
