import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import getPageTitle from '@/utils/getPageTitle';

const links = [
  // {
  //   key: 'help',
  //   title: formatMessage({ id: 'layout.user.link.help' }),
  //   href: '',
  // },
  // {
  //   key: 'privacy',
  //   title: formatMessage({ id: 'layout.user.link.privacy' }),
  //   href: '',
  // },
  // {
  //   key: 'terms',
  //   title: formatMessage({ id: 'layout.user.link.terms' }),
  //   href: '',
  // },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 Designed by 1207032539@qq.com
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    // console.log(this.props);
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          <div className={styles.lang}>{/*<SelectLang/>*/}</div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>H5项目发布系统</span>
                </Link>
              </div>
              <div className={styles.desc}>该系统主要用于简单H5项目的发布和管理</div>
            </div>
            {children}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
