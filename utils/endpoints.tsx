const ENDPOINTS = {
    LOGIN: "/api/v1/login",
    REGISTER: "/api/v1/auth",
    USER_DETAIL: "/api/v1/user/",
    USER_PROFILE: "/user/profile",
    USER_PROFILE_UPDATE: "/user/profile/update",
    USER_PROFILE_UPDATE_PASSWORD: "/user/profile/update/password",
    USER_PROFILE_UPDATE_EMAIL: "/user/profile/update/email",
    USER_PROFILE_UPDATE_PHONE: "/user/profile/update/phone",
    USER_PROFILE_UPDATE_AVATAR: "/user/profile/update/avatar",
    USER_PROFILE_UPDATE_AVATAR_DELETE: "/user/profile/update/avatar/delete",
    USER_PROFILE_UPDATE_AVATAR_DELETE_ALL: "/user/profile/update/avatar/delete/all",
    USER_PROFILE_UPDATE_AVATAR_DELETE_ALL_CONFIRM: "/user/profile/update/avatar/delete/all/confirm",
    USER_PROFILE_UPDATE_AVATAR_DELETE_ALL_CANCEL: "/user/profile/update/avatar/delete/all/cancel",
    USER_PROFILE_UPDATE_AVATAR_DELETE_ALL_CONFIRM_ALL: "/user/profile/update/avatar/delete/all/confirm/all",
    USER_PROFILE_UPDATE_AVATAR_DELETE_ALL_CANCEL_ALL: "/user/profile/update/avatar/delete/all/cancel/all",
    MERCHANT_LOGIN: "/merchant/login",
    MERCHANT_REGISTER: "/merchant/register",
    MERCHANT_PROFILE: "/merchant/profile",
    MERCHANT_PROFILE_UPDATE: "/merchant/profile/update",
    MERCHANT_PROFILE_UPDATE_PASSWORD: "/merchant/profile/update/password",
};

export default ENDPOINTS;