export interface Dictionary {
  [key: number]: any
}

export const add = (dict:Dictionary, key:number, value:any):void=> {
  dict[key] = value
};


