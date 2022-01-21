const ENDPOINTS = {
    LOGIN: "/api/v1/user/login",
    REGISTER: "/api/v1/user/auth",
    USER_DETAIL: "/api/v1/user/", // takes userid <userid>
    NEW_NOTIFICATION_ADD: "/api/v1/notification/new/",
    NOTIFICATION_LIST: "/api/v1/notification/", //<merchantid>
    NEAR_BY_SHOPS: "/api/v1/shop/nearby/", //<userid>
    NEW_SHOP: "/api/v1/merchant/shop/new",
    SHOP_DETAIL: "/api/v1/shop/", //<shopid> complete api /api/v1/shop/shopid
    SHOP_LIST: "/api/v1/merchant/shops/", //<merchantid>
    MERCHANT_LOGIN: "/api/v1/merchant/login",
    MERCHANT_REGISTER: "/api/v1/merchant/auth",
    MERCHANT_DETAIL: "/api/v1/merchant/", //<merchantid>
    NEW_ITEM: "/api/v1/shop/item/new",
    ITEM_LIST: "/api/v1/shop/items/", //<shopid>
    ITEM_DETAIL: "/api/v1/item/", //<itemid>
    UPLOAD_IMAGE: "/api/v1/upload/image",
    NEW_KHATA_RECORD: "/api/v1/khata/new",
    KHATA_LIST: "/api/v1/shop/khata/", // <shopid> /api/v1/shop/khata/<shopid>
    KHATA_DETAIL: "/api/v1/khata/", //<khataid>  /api/v1/khata/<khataid>
    ITEM_FILTER_BY_NAME: "/api/v1/item/name/filter?itemname="
};

export default ENDPOINTS;