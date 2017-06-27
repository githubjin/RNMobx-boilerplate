/**
 * react-navigation reset 
 * @flow
 */

import { NavigationActions } from "react-navigation";

import { ROUTE_MAIN } from "../constants/routes";

export function navigationReset(
  navigation: Object,
  routeName: string = ROUTE_MAIN
): void {
  navigation.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
  );
}
