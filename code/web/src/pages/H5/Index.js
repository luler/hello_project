import React, { Component } from 'react';
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Table,
} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { request_post } from '@/utils/request_tool';

const { confirm } = Modal;

@connect(({ api, loading }) => ({
  api,
  _loading: loading.effects['api/getH5List'],
}))
class Index extends Component {
  state = {
    params: {
      page: 1,
      page_rows: 10,
      search: '',
    },
    visible: false,
    data: {},
  };

  componentDidMount() {
    this.fetch(this.state.params);
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
      type: 'api/getH5List',
      payload: params,
    });
  }

  showEditModel = (id, title, desc, auth_code) => {
    this.setState(
      {
        visible: true,
        data: {
          id,
          title,
          desc,
          auth_code,
        },
      },
      () => {
        //
      }
    );
  };

  showConfirm = id => {
    const that = this;
    confirm({
      title: '你确定要删除该项目吗?',
      content: '注意：点击确认，将删除该项目，以及该项目的项目发布版本',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          const { dispatch } = that.props;
          dispatch({
            type: 'api/delProject',
            payload: { project_id: id },
          }).then(() => {
            that.setState(
              {
                params: {
                  ...that.state.params,
                  page: 1,
                },
              },
              () => {
                that.fetch(that.state.params);
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              }
            );
          });
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        //
      },
    });
  };

  onEditFormFieldChange = e => {
    switch (e.target.name) {
      case 'title':
        this.setState({
          data: {
            ...this.state.data,
            title: e.target.value,
          },
        });
        break;
      case 'desc':
        this.setState({
          data: {
            ...this.state.data,
            desc: e.target.value,
          },
        });
        break;
      case 'auth_code':
        this.setState({
          data: {
            ...this.state.data,
            auth_code: e.target.value,
          },
        });
        break;
    }
  };

  handleEditOk = () => {
    this.setState({ confirmLoading: true }, () => {
      request_post('/api/editH5List', this.state.data).then(res => {
        this.setState({ confirmLoading: false });
        if (res.code === 200) {
          this.setState(
            {
              visible: false,
              params: {
                ...this.state.params,
                page: 1,
              },
            },
            () => {
              this.fetch(this.state.params);
            }
          );
        }
      });
    });
  };

  render() {
    const columns = [
      {
        title: '项目标识',
        dataIndex: 'code',
        key: 'code',
        render: (value, record) => (
          <span>
            {value}
            <Popconfirm
              title="确定要刷新项目标识吗？"
              onConfirm={() => {
                request_post('/api/refreshProjectCode', { id: record.id }).then(res => {
                  if (res.code === 200) {
                    this.fetch(this.state.params);
                  }
                });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ marginLeft: 2 }}>🔄</a>
            </Popconfirm>
          </span>
        ),
      },
      {
        title: '项目名称',
        dataIndex: 'title',
        render: (value, record) => {
          return <Link to={`/h5/index/version/${record.id}`}>{value}</Link>;
        },
      },
      {
        title: '项目简介',
        dataIndex: 'desc',
        key: 'desc',
        // width: 400,
        render: text => (
          <div>
            <Popover content={text}>{text.substr(0, 150)}</Popover>
          </div>
        ),
      },
      {
        title: '授权码',
        dataIndex: 'auth_code',
        key: 'auth_code',
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
            <a
              onClick={() => {
                this.showEditModel(record.id, record.title, record.desc, record.auth_code);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              style={{ color: 'red' }}
              onClick={() => {
                this.showConfirm(record.id);
              }}
            >
              删除
            </a>
          </span>
        ),
      },
    ];

    const { _loading, api } = this.props;

    const pagination = {
      current: api.getH5List.page,
      total: api.getH5List.total,
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
        </Breadcrumb>

        <div style={{ backgroundColor: 'white', padding: '10px 20px', marginTop: 20 }}>
          <Modal
            title={this.state.data.id ? '编辑项目' : '新增项目'}
            visible={this.state.visible}
            onOk={() => {
              this.setState({ confirmLoading: true }, () => {
                let url = this.state.data.id ? '/api/editH5List' : '/api/addH5List';
                request_post(url, this.state.data).then(res => {
                  this.setState({ confirmLoading: false });
                  if (res.code === 200) {
                    this.setState(
                      { visible: false, params: { ...this.state.params, page: 1 } },
                      () => {
                        this.fetch(this.state.params);
                      }
                    );
                  }
                });
              });
            }}
            confirmLoading={this.state.confirmLoading || false}
            okText="保存"
            onCancel={() => {
              this.setState({
                visible: false,
                confirmLoading: false,
              });
            }}
          >
            <Form
              labelCol={{
                xs: { span: 24 },
                sm: { span: 4 },
              }}
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 20 },
              }}
            >
              <Form.Item required label="项目名称">
                <Input
                  autoComplete="off"
                  onInput={this.onEditFormFieldChange}
                  name="title"
                  value={this.state.data.title}
                  placeholder="请输入"
                />
              </Form.Item>
              <Form.Item label="项目简介">
                <Input.TextArea
                  onInput={this.onEditFormFieldChange}
                  name="desc"
                  rows={4}
                  value={this.state.data.desc}
                  placeholder="请输入"
                />
              </Form.Item>
              <Form.Item label="授权码">
                <Input
                  autoComplete="off"
                  onInput={this.onEditFormFieldChange}
                  name="auth_code"
                  rows={4}
                  value={this.state.data.auth_code}
                  placeholder="请输入"
                />
              </Form.Item>
            </Form>
          </Modal>

          <div style={{ padding: '20px 0' }}>
            <Row>
              <Col span={8}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ visible: true, data: {} });
                  }}
                >
                  新增
                </Button>
              </Col>
              <Col span={8} offset={8}>
                <Input.Search
                  style={{ float: 'right' }}
                  allowClear
                  placeholder="请输入搜索关键字"
                  onSearch={value => {
                    this.setState(
                      { params: { ...this.state.params, page: 1, search: value } },
                      () => {
                        this.fetch(this.state.params);
                      }
                    );
                  }}
                />
              </Col>
            </Row>
          </div>
          <Table
            tableLayout="fixed"
            dataSource={api.getH5List.list}
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
