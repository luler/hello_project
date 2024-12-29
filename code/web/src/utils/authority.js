// use localStorage to store the authority info, which might be sent from server in actual project.
import { getPageQuery, getStorage, removeStorage, setStorage } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { extra_config } from '../../config/extra.config';

export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function delAuthority() {
  return localStorage.removeItem('antd-pro-authority');
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function setAccessToken(access_token) {
  return localStorage.setItem('access_token', access_token);
}

export function delAccessToken() {
  return localStorage.removeItem('access_token');
}

export function setUserInfo(info, timeout = 7200) {
  return setStorage('user_info', info, timeout);
}

export function getUserInfo() {
  return getStorage('user_info');
}

export function removeUserInfo() {
  return removeStorage('user_info');
}

// 退出登录
export function loginOut() {
  delAuthority();
  delAccessToken();
  removeUserInfo();
  reloadAuthorized();
  const { redirect } = getPageQuery();
  let url;
  if (window.location.pathname !== extra_config.url401 && !redirect) {
    url = `${extra_config.url401}?redirect=${window.location.pathname}`;
  } else {
    url = `${extra_config.url401}?redirect=${redirect}`;
  }
  window.location.href = url;
}
