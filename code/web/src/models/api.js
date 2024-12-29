import {
  getAccessToken,
  getH5List,
  getProjectVersionList,
  delProjectVersion,
  addH5List,
  delProject,
  editH5List,
  getUserList,
  addUser,
  editUser,
  getFixedLink,
} from '../services/api';
import { setAccessToken, setAuthority, setUserInfo } from '../utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'api',
  state: {
    getH5List: {
      list: [],
      total: 0,
      page: 1,
    },
    getProjectVersionList: {
      list: [],
      total: 0,
      page: 1,
    },
    getUserList: {
      list: [],
      total: 0,
      page: 1,
    },
    projectNameList: [],
    baseConfig: {},
    fixed_link: '',
  },

  effects: {
    *getAccessToken({ payload }, { call, put }) {
      const response = yield call(getAccessToken, payload);
      if (response.code === 200) {
        setUserInfo({ appid: payload.appid }, response.info.expires_in);
        yield put({
          type: 'login',
          payload: response.info,
        });

        reloadAuthorized();
        location.href = '/';
      }
    },

    *getH5List({ payload }, { call, put }) {
      const response = yield call(getH5List, payload);
      yield put({
        type: 'putH5List',
        payload: response.info,
      });
    },

    *getFixedLink({ payload }, { call, put }) {
      const response = yield call(getFixedLink, payload);
      yield put({
        type: 'putFixedLink',
        payload: response.info.fixed_link,
      });
    },

    *getUserList({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      yield put({
        type: 'putUserList',
        payload: response.info,
      });
    },

    *addH5List({ payload }, { call, put }) {
      const response = yield call(addH5List, payload);
      if (response.code == 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      return;
    },

    *addUser({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      if (response.code == 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      return;
    },

    *editH5List({ payload }, { call, put }) {
      const response = yield call(editH5List, payload);
      if (response.code == 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      return;
    },

    *editUser({ payload }, { call, put }) {
      const response = yield call(editUser, payload);
      if (response.code == 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      return;
    },

    *getProjectVersionList({ payload }, { call, put }) {
      const response = yield call(getProjectVersionList, payload);
      yield put({
        type: 'putProjectVersionList',
        payload: response.info,
      });
    },

    *delProjectVersion({ payload }, { call, put }) {
      const response = yield call(delProjectVersion, payload);
      if (response.code == 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      return;
    },

    *delProject({ payload }, { call, put }) {
      const response = yield call(delProject, payload);
      if (response.code == 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      return;
    },
  },

  reducers: {
    login(state, { payload }) {
      if (payload.is_super_admin == 1) {
        setAuthority('super_admin');
      } else {
        setAuthority('admin');
      }
      setAccessToken(payload.access_token);
      return {
        ...state,
      };
    },

    putH5List(state, { payload }) {
      return {
        ...state,
        getH5List: payload,
      };
    },

    putFixedLink(state, { payload }) {
      return {
        ...state,
        fixed_link: payload,
      };
    },

    putUserList(state, { payload }) {
      return {
        ...state,
        getUserList: payload,
      };
    },

    putProjectVersionList(state, { payload }) {
      return {
        ...state,
        getProjectVersionList: payload,
      };
    },
  },
};
