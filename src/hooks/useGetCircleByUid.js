import { getCircleById } from "../fire_base/circleController/circleController";
export const useGetCircleByUid = (uid) => {
  return getCircleById(uid);
};
