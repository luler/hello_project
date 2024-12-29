import React, { Component } from 'react';
import { connect } from 'dva';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ api, loading }) => ({
  api,
  submitting: loading.effects['api/getAccessToken'],
}))
class LoginPage extends Component {
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'api/getAccessToken',
        payload: {
          ...values,
        },
      });
    }
  };

  render() {
    const { submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <UserName
            name="appid"
            placeholder="请输入appid"
            rules={[
              {
                required: true,
                message: 'appid不能为空',
              },
            ]}
          />
          <Password
            name="appsecret"
            placeholder="请输入appsecret"
            rules={[
              {
                required: true,
                message: 'appsecret不能为空',
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();
              this.loginForm.validateFields(this.handleSubmit);
            }}
          />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
