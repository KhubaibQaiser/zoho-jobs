export interface IConfig {
  zohoClientId: string;
  zohoClientSecret: string;
  zohoRefreshToken: string;
}

export const config: IConfig = {
  zohoClientId:
    process.env.REACT_APP_ZOHO_CLIENT_ID ||
    "1000.ECZON4HJNLJAOYY1VVEPGVAF5CQ9VW",
  zohoClientSecret:
    process.env.REACT_APP_ZOHO_CLIENT_SECRET ||
    "03c6b5b72f7b2959342563eb67a3e56b267479e8ed",
  zohoRefreshToken:
    process.env.REACT_APP_ZOHO_REFRESH_TOKEN ||
    "1000.5ab0419b5f4d13958058cd661584942a.97f186295c3ec07fed503f6b839941b8",
};
