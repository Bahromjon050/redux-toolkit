import { ActionType } from "./ActionType"


export const Add = (data) => { 
    return{
        type: ActionType.add,
        payload: data
    }
}