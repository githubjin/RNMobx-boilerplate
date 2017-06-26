/**
 ** This provides a dump of every public repository, in the order that they were created.
 ** Note: Pagination is powered exclusively by the since parameter. Use the Link header to get the URL for the next page of repositories.
 ** GET /repositories
 * @flow
 * @param {*} since The integer ID of the last Repository that you've seen.
 */
import { apiUrl } from "../services/api";
import _fetch from "../services/_fetch";

export function repositories(since: string): void {
  fetch(apiUrl(`repositories?since=${since}`))
    .then((response: Response) => response.json())
    .then((data: any) => {
      console.log("data", data.length, data[0], JSON.stringify(data[0]));
    })
    .catch((reason: any) => {
      console.log("repositories error ", reason);
    });
}
