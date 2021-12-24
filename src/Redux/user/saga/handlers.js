import { call, put } from "@redux-saga/core/effects";
import Cookies from "js-cookie";
import { loginTypes } from "../actions";
import { loginReq } from "./requests";

export function* loginHandler(action) {
  try {
    let response = yield call(loginReq, action);
    const { data } = response;

    if (!data) {
      //
      return;
    }

    Cookies.set("user", response.data, { expires: 7 });
    yield put(loginTypes.login_success(data));
  } catch (e) {
    console.log(e);
  }
}
