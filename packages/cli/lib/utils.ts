import { camelCase, upperFirst } from "lodash"

export const bigCamelCase = (str:string) =>  upperFirst(camelCase(str));
