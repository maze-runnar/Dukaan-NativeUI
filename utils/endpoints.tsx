const ENDPOINTS = {
    LOGIN: "/api/v1/login",
    REGISTER: "/api/v1/auth",
    USER_DETAIL: "/api/v1/user/",
    NEAR_BY_SHOPS: "/api/v1/nearby/",
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
    MERCHANT_LOGIN: "/api/v1/merchant/login",
    MERCHANT_REGISTER: "/api/v1/merchant/auth",
    MERCHANT_PROFILE: "/merchant/profile",
    MERCHANT_PROFILE_UPDATE: "/api/v1/merchant/",
    MERCHANT_DETAIL: "/api/v1/merchant/",
    NEW_ITEM: "/api/v1/item"
};

export default ENDPOINTS;