import React, { Component } from 'react';
import { Spin } from 'antd';
import { getQueryString } from '@/utils/utils';
import { setAccessToken, setAuthority, setUserInfo } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default class CasLogin extends Component {
  constructor() {
    super();
    const userInfo = JSON.parse(getQueryString('user_info'));
    setUserInfo(userInfo, getQueryString('expires_in'));
    if (userInfo.is_super_admin === 1) {
      setAuthority(['super_admin']);
    } else {
      setAuthority(['admin']);
    }
    reloadAuthorized();
    setAccessToken(getQueryString('access_token').replace('+', ' '));
    window.location.href = '/';
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }
}
