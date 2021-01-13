import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const publishers: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/search/publishers`),
};

export default publishers;
