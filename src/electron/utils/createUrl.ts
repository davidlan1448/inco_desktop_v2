import { URL_HOST } from "../config";
export function createUrl(...uri: (string | number)[]) {
  let URL = URL_HOST.trim();
  
  uri.forEach(segment => {
    URL += `${segment}/`;
  });

  return URL;
}