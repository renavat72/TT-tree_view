import axios from "axios";
import { Dispatch } from "redux";
import { DataAction, DataActionTypes } from "../../types";

export const fetchData = () => async (dispatch: Dispatch<DataAction>) => {
  try {
    dispatch({ type: DataActionTypes.FETCH_DATA });
    const response = await axios.get(
      "https://recruting-test-api.herokuapp.com/api/v1/brands"
    );
    dispatch({
      type: DataActionTypes.FETCH_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: DataActionTypes.FETCH_DATA_ERROR,
      payload: "Loading is error",
    });
  }
};
