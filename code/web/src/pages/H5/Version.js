import React, { Component } from 'react';
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Upload,
} from 'antd';
import { connect } from 'dva';
import { getAccessToken } from '@/utils/authority';
import { request_post } from '@/utils/request_tool';
import { Link } from 'dva/router';

@connect(({ api, loading }) => ({
  api,
  _loading: loading.effects['api/getProjectVersionList'],
}))
class Index extends Component {
  state = {
    params: {
      page: 1,
      page_rows: 10,
      search: '',
      project_id: 0,
    },
    confirmLoading: false,
    visible: false,
    del_project_version_id: 0,
    fixed_link: '',
  };

  componentDidMount() {
    const project_id = this.props.match.params.project_id;
    this.setState(
      {
        params: {
          ...this.state.params,
          project_id: project_id,
        },
      },
      () => {
        this.fetch(this.state.params);
      }
    );
  }

  handleTableChange = pagination => {
    this.setState(
      {
        params: {
          ...this.state.params,
          page: pagination.current,
          page_rows: pagination.pageSize,
        },
      },
      () => {
        this.fetch(this.state.params);
      }
    );
  };

  fetch(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'api/getProjectVersionList',
      payload: params,
    });
  }

  showFixedLink = e => {
    e.stopPropagation(); // 防止触发上传
    const { dispatch } = this.props;
    dispatch({
      type: 'api/getFixedLink',
      payload: { project_id: this.state.params.project_id },
    }).then(() => {
      const { api } = this.props;
      Modal.info({
        title: '固定访问链接',
        okText: '确定',
        content: (
          <p>
            {api.fixed_link ? (
              <a target="_blank" href={api.fixed_link}>
                {api.fixed_link}
              </a>
            ) : (
              <span>暂无,请尝试上传项目</span>
            )}
          </p>
        ),
        onOk() {},
      });
    });
  };

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '文件名称',
        render: (text, record) => <a href={record.zip_file_url}>{record.file_name}</a>,
      },
      {
        title: '所属项目',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '访问链接',
        dataIndex: 'url',
        key: 'url',
        render: text => (
          <a target="_blank" href={text}>
            {text}
          </a>
        ),
      },
      {
        title: '创建人',
        dataIndex: 'appid',
        key: 'appid',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title="您确定要删除吗？"
              onConfirm={() => {
                request_post('/api/delProjectVersion', { project_version_id: record.id }).then(
                  res => {
                    if (res.code === 200) {
                      this.fetch(this.state.params);
                    }
                  }
                );
              }}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];

    const props = {
      showUploadList: true,
      name: 'file',
      action: '/api/uploadProject',
      headers: {
        authorization: getAccessToken(),
      },
      data: {
        project_id: this.state.params.project_id,
      },
      onChange: res => {
        // eslint-disable-next-line default-case
        switch (res.file.status) {
          case 'done':
            this.setState(
              {
                params: {
                  ...this.state.params,
                  page: 1,
                  search: '',
                },
              },
              () => {
                this.fetch(this.state.params);
              }
            );
            // this.setState({upload_loading: false});
            break;
          case 'error':
            Modal.error({
              title: '错误提示',
              content: res.file.response.message,
              okText: '确定',
            });
            // this.setState({upload_loading: false});
            break;
          case 'uploading':
            // this.setState({upload_loading: true});
            break;
        }
      },
    };
    const { _loading, api } = this.props;

    const pagination = {
      current: api.getProjectVersionList.page,
      total: api.getProjectVersionList.total,
      pageSize: this.state.params.page_rows,
      showTotal: (total, range) => `总共 ${total} 条数据`,
    };

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/h5/index">H5项目列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>H5项目详情</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ backgroundColor: 'white', padding: '10px 20px', marginTop: 20 }}>
          <div style={{ padding: '20px 0' }}>
            <Row>
              <Col span={8}>
                <Upload {...props}>
                  <Tooltip
                    placement="top"
                    title="选择zip压缩文件，压缩文件必须包含index.html,且样式文件、资源文件都是相对地址"
                  >
                    <Button
                      loading={this.state.upload_loading || false}
                      icon="upload"
                      type="primary"
                    >
                      上传
                    </Button>
                  </Tooltip>
                  &nbsp; &nbsp; &nbsp;
                  <Tooltip
                    placement="top"
                    title="此链接为本项目的固定链接，且始终访问项目最新版本内容"
                  >
                    <Button onClick={this.showFixedLink} type="dashed">
                      固定访问链接
                    </Button>
                  </Tooltip>
                </Upload>
              </Col>
              <Col span={8} offset={8}>
                <Input.Search
                  allowClear
                  style={{ float: 'right' }}
                  onSearch={value => {
                    this.setState(
                      { params: { ...this.state.params, page: 1, search: value } },
                      () => {
                        this.fetch(this.state.params);
                      }
                    );
                  }}
                  placeholder="请输入搜索关键字"
                />
              </Col>
            </Row>
          </div>
          <Table
            tableLayout="fixed"
            dataSource={api.getProjectVersionList.list}
            rowKey={record => record.id}
            pagination={pagination}
            columns={columns}
            loading={_loading}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

export default Index;
