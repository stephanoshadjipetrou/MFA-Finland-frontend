/* eslint-disable no-param-reassign */
import get from "lodash/get";
// import cryptoJs from "crypto-js";
import { action, thunk } from "easy-peasy";
import axios, { AxiosResponse } from "axios";
import {
  ApiModel,
  Errors,
  RequestValues,
  ResponseData,
} from "app/state/api/interfaces";

export const APIModel = <QueryModel, ResponseModel>(
  url: string
): ApiModel<QueryModel, ResponseModel> => ({
  loading: false,
  success: false,
  data: {
    count: 0,
    data: [],
    vizData: undefined,
  },
  errorData: null,
  onError: action((state, payload: Errors) => {
    state.loading = false;
    state.errorData = payload;
  }),
  onSuccess: action((state, payload: ResponseData<ResponseModel>) => {
    const { addOnData, ...actualPayload } = payload;
    state.loading = false;
    state.success = true;
    if (addOnData) {
      // @ts-ignore
      state.data = {
        ...state.data,
        count: actualPayload.count,
        // @ts-ignore
        data: [...state.data.data, ...actualPayload.data],
      };
    } else {
      state.data = actualPayload;
    }
  }),
  setSuccess: action((state) => {
    state.loading = false;
    state.success = true;
  }),
  onRequest: action((state) => {
    state.loading = true;
    state.success = false;
  }),
  fetch: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    if (query.isCMSfetch) {
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          (resp: AxiosResponse) =>
            actions.onSuccess({ ...resp.data, addOnData: false }),
          (error: any) => actions.onError(error.response)
        );
    } else {
      axios
        .post(url, query.values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          (resp: AxiosResponse) =>
            actions.onSuccess({ ...resp.data, addOnData: query.addOnData }),
          (error: any) => actions.onError(error.response)
        );
    }
  }),
  /*authPostFetch: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    const encodedValues = cryptoJs.AES.encrypt(
      JSON.stringify(query.values),
      process.env.REACT_APP_ENCRYPTION_SECRET as string
    ).toString();
    axios
      .post(
        url,
        {
          payload: encodedValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get(query, "values.token", "")}`,
          },
        }
      )
      .then(
        (resp: AxiosResponse) => {
          actions.onSuccess({ ...resp.data, addOnData: query.addOnData });
        },
        (error: any) => actions.onError(error.response)
      );
  }),
  authGetFetch: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    const encodedValues = cryptoJs.AES.encrypt(
      JSON.stringify(query.values),
      process.env.REACT_APP_ENCRYPTION_SECRET as string
    ).toString();
    axios
      .get(url, {
        params: {
          payload: encodedValues,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get(query, "values.token", "")}`,
        },
      })
      .then(
        (resp: AxiosResponse) =>
          actions.onSuccess({ ...resp.data, addOnData: query.addOnData }),
        (error: any) => actions.onError(error.response)
      );
  }),*/
  setData: action((state, payload: any) => {
    state.data = payload;
  }),
  clear: action((state) => {
    state.loading = false;
    state.success = false;
    state.data = {
      count: 0,
      data: [],
      vizData: undefined,
    };
    state.errorData = null;
  }),
});
