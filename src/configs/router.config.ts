
//All the api urls list can be managed in one place
export enum RouterConfig {
    HOME = "/",
    //ACCOUNT LOGIN WITHOUT AUTHENTICATION TOKEN
    LOGIN = "/login", //POST
    REGISTER = "/register", //POST
    FORGOT_PASSWORD = "/forgot-password", //POST
    RESET_PASSWORD = "/reset-password", //POST
    ACTIVATE_EMAIL = "/activate-email", //GET
    AUTH_FACEBOOK = "/auth/facebook", //GET
    AUTH_FACEBOOK_CALLBACK = "/auth/facebook/callback", //GET
    AUTH_TWITTER = "/auth/twitter", //GET
    AUTH_TWITTER_CALLBACK = "/auth/twitter/callback", //GET
    AUTH_MICROSOFT = "/auth/microsoft", //GET
    AUTH_MICROSOFT_CALLBACK = "/auth/microsoft/callback", //GET
    AUTH_SLACK = "/auth/slack", //GET
    AUTH_SLACK_CALLBACK = "/auth/slack/callback", //GET
    AUTH_SALES_FORCE = "/auth/salesforce", //GET
    AUTH_SALES_FORCE_CALLBACK = "/auth/salesforce/callback", //GET
}