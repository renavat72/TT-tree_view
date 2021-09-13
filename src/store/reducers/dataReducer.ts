import { DataState, DataActionTypes, DataAction } from "../../types";

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const dataReducer = (
  state = initialState,
  action: DataAction
): DataState => {
  switch (action.type) {
    case DataActionTypes.FETCH_DATA:
      return { loading: true, error: null, data: [] };
    case DataActionTypes.FETCH_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case DataActionTypes.FETCH_DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
