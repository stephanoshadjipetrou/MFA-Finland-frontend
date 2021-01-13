import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const sectorsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/sectors`),
};

export default sectorsTable;
