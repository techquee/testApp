import {SEND_FEEDBACK} from '../actions/actionTypes';

/*const sendFeedback = (state,action) => {
    return {
        ...state,
        feedback:''
    }
}

const reducers = (state,action) => {
    switch(action.type){
        case actionType.SEND_FEEDBACK:return sendFeedback(state,action)
        default:return state
    }
}
*/

const reducers = {
    // ... your other reducers here ...
    form: formReducer.plugin({
      Feedback: (state, action) => { // <------ 'Feedback' is name of form given to reduxForm()
        switch(action.type) {
          case SEND_FEEDBACK:
            return {
              ...state,
              feedback:{}        // <----- clear field
            };
          default:
            return state;
        }
      }
    })
  }
export default reducers