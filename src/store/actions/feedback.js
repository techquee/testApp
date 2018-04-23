import {database,storage} from '../../Config/config';
import * as firebase from 'firebase';
import * as types from './actionTypes'

export function sendFeedback(feedback){

    return (dispatch,event)=>{
        firebase.database().ref().push(feedback).set(
            {
                feedback:feedback
            },
            (error)=>{
            if(error){
                dispatch(dispatchFeedback("E_R_R"));
            }else{
                dispatch(dispatchFeedback(feedback));
            }
        });
    }
}



export function dispatchFeedback(feedback){
    return {
        type:types.SEND_FEEDBACK
    }
}

