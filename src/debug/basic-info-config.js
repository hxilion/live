/*
 * @Description: Basic information configuration for TUILiveKit applications
 */

import LibGenerateTestUserSig from "./lib-generate-test-usersig-es.min";

/**
 * Tencent Cloud SDKAppID, which should be replaced with user's SDKAppID.
 * Enter Tencent Cloud TRTC [Console] (https://console.cloud.tencent.com/trtc ) to create an application,
 * and you will see the SDKAppID.
 * It is a unique identifier used by Tencent Cloud to identify users.
 */

export const SDKAppID = 20014692;

/**
 * Encryption key for calculating signature, which can be obtained in the following steps:
 *
 * Step1. Enter Tencent Cloud TRTC [Console](https://console.cloud.tencent.com/rav ),
 * and create an application if you don't have one.
 * Step2. Click your application to find "Quick Start".
 * Step3. Click "View Secret Key" to see the encryption key for calculating UserSig,
 * and copy it to the following variable.
 *
 * Notes: this method is only applicable for debugging Demo. Before official launch,
 * please migrate the UserSig calculation code and key to your backend server to avoid
 * unauthorized traffic use caused by the leakage of encryption key.
 * Document: https://intl.cloud.tencent.com/document/product/647/35166#Server
 */
export const SDKSecretKey =
  "95d93be40bfcd84683ee7787061d878dca5e4b34178daa0e62dee239dc370d4f";

/**
 * Signature expiration time, which should not be too short
 * Time unit: second
 * Default time: 7 * 24 * 60 * 60 = 604800 = 7days
 */
export const EXPIRETIME = 604800;

/**
 * Set user information on the push side
 */
export const userInfo = {
  // User ID
  userId: `user_${Math.ceil(Math.random() * 100000)}`,
  // User Name
  userName: "myName",
  // User Avatar
  avatarUrl: "./avatar.png",
};

export function getBasicInfo() {
  if (SDKAppID === Number(0) || SDKSecretKey === String("")) {
    alert(
      'Please configure your "SDKAppID" and "SDKSecretKey" in src/debug/basic-info-config.js'
    );
    return;
  }
  const generator = new LibGenerateTestUserSig(
    SDKAppID,
    SDKSecretKey,
    EXPIRETIME
  );
  const userSig = generator.genTestUserSig(userInfo.userId);
  const { userId, userName, avatarUrl } = userInfo;
  return {
    sdkAppId: SDKAppID,
    userId,
    userSig,
    userName,
    avatarUrl,
  };
}
