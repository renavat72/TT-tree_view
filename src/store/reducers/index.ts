import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";

export const rootReduser = combineReducers({
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReduser>;
