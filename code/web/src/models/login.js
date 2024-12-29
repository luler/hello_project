import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { delAccessToken, delAuthority, removeUserInfo } from '@/utils/authority';

export default {
  namespace: 'login',

  state: {},

  effects: {
    *logout(_, { put }) {
      delAuthority();
      delAccessToken();
      removeUserInfo();
      reloadAuthorized();
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {},
};
