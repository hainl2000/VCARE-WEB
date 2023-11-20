/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRequest } from "ahooks";
import { useRecoilState } from "recoil";
import { deleteCookie } from "cookies-next";
import {
  managerProfileAtom,
  initialManagerProfile,
  userProfileAtom,
  initialUserProfile,
  adminProfileAtom,
  initialAdminProfile,
} from "./profile";
import {
  privateRequestAdmin,
  privateRequestDoctor,
  request,
} from "@/api/request";
import { API_PATH } from "@/utils/constant";
import { useRouter } from "next/router";
export const useProfile = () => {
  const router = useRouter();

  const [profileAdmin, setProfileAdmin] = useRecoilState(
    adminProfileAtom
  );
  const [
    profileHospitalManager,
    setProfileHospitalManager,
  ] = useRecoilState(managerProfileAtom);

  const requestGetProfileAdmin = useRequest(
    async () => {
      const profile = await privateRequestAdmin(
        "GET",
        API_PATH.ADMIN_INFO
      );
      return profile;
    },
    {
      manual: true,
      onSuccess: (res) => {
        setProfileAdmin({
          ...res.data,
        });
      },
      onError: () => {
        setProfileAdmin(initialAdminProfile);
      },
    }
  );

  return {
    profileAdmin,
    setProfileAdmin,
    requestGetProfileAdmin,
    profileHospitalManager,
    setProfileHospitalManager,
  };
};
