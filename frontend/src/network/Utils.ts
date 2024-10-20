// WE ARE GONNA NEED THIS LATER
// import { ListPageDesignConfig } from "../models/listModel";
import { clearReducer } from "../redux/actions/listView";

export function getAccessToken(): string {
  return localStorage.getItem("access_token")!;
}

export function getRefreshToken(): string {
  return localStorage.getItem("refresh_token")!;
}

export function existsAccessToken(): boolean {
  return !!getAccessToken();
}

// export function isAccessTokenExpired(): boolean {
//   if (existsAccessToken()) {
//     let expiration = localStorage.getItem("expiration_time")!;
//     const now = new Date();
//     const date = new Date(0);
//     date.setUTCMilliseconds(Number(expiration));
//     if (now > date) {
//       return true;
//     }
//     return false;
//   }
//   return false;
// }

export function storeTokens(data: any) {
  const accessToken = data.value;
  const refreshToken = data.refreshToken.value;
  const expirationTime = data.expiration;
  // setting up tokens in local storage
  if (accessToken && refreshToken && expirationTime) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("expiration_time", expirationTime.toString());
  }
}

export function storeUsers(id: number, businessUnit: boolean) {
  if (id > 0) {
    if (businessUnit) {
      localStorage.setItem("businessUnitId", id.toString());
    } else {
      localStorage.setItem("publisherId", id.toString());
    }
  }
}

export function storeUserInfo(userInfo: any) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function getUserInfo(): { id: number; type: string } | null {
  const businessUnitId = localStorage.getItem("businessUnitId");
  const publisherId = localStorage.getItem("publisherId");
  if (businessUnitId && Number(businessUnitId) > 0) {
    return {
      id: Number(businessUnitId),
      type: "admin",
    };
  } else if (publisherId && Number(publisherId) > 0){
    return {
      id: Number(publisherId),
      type: "publisher",
    };
  } else {
    return null;
  }
}

export function clearTokens(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expiration_time");
  localStorage.removeItem("businessUnitId");
  localStorage.removeItem("publisherId");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("publisher_id");
  localStorage.removeItem("publisher_name");
  clearReducer();
}

export function loginRefreshFormDataCreation(
  refresh: boolean,
  username?: string,
  password?: string
): FormData {
  if (refresh) {
    const refreshToken = getRefreshToken();

    let refreshFormData = new FormData();
    refreshFormData.append("client_id", process.env.REACT_APP_CLIENT_ID!);
    refreshFormData.append(
      "client_secret",
      process.env.REACT_APP_CLIENT_SECRET!
    );
    refreshFormData.append("grant_type", "refresh_token");
    refreshFormData.append("refresh_token", refreshToken!);
    return refreshFormData;
  } else {
    let loginFormData = new FormData();
    loginFormData.append("username", username!);
    loginFormData.append("password", password!);
    loginFormData.append("client_id", process.env.REACT_APP_CLIENT_ID!);
    loginFormData.append("client_secret", process.env.REACT_APP_CLIENT_SECRET!);
    loginFormData.append("grant_type", "password");
    return loginFormData;
  }
}

export function formatForThosandsandMillions(val: string, isRevenue?: boolean){
  const numberVal = Number(val);
  let value: any = Math.abs(numberVal);
  if (value >= 1000 && value <= 99999) {
    value = (value / 1000).toFixed(2) + " k";
  } else if (value >= 100000) {
    value = (value / 1000000).toFixed(2) + " m";
  }
  if (isRevenue) {
    return `$${value}`;
  } else {
    return value;
  }
};

export function parse(strem: any, index: number, length: number) {
  if (!strem) { return ''; }
  let content = JSON.stringify(strem);
  content = content.replace(/[^a-zA-Z0-9:\s+,_]/g, '');
  if (index+1 === length) {
    return content.replace(':', ': ');
  } else {
    return content.replace(':', ': ').concat(', ');
  }
}
