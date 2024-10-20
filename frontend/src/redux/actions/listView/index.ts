import {
    LIST_TEMPLATE_API_GET_CALL,
    LIST_TEMPLATE_REDUCER
} from "../../constants/listView";


export function getListTemplate(params: number) {
  return {
    type: LIST_TEMPLATE_API_GET_CALL.GET_REQUEST,
    params,
  };
}

export function clearReducer() {
  return {
    type: LIST_TEMPLATE_REDUCER.CLEAR_REDUCER,
  };
}
