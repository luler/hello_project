import React, { Component } from 'react'
import { Breadcrumb, Button, Col, Form, Input, Modal, Row, Select, Switch, Table } from 'antd'
import { connect } from 'dva'
import { request_post } from '@/utils/request_tool'
import Link from 'umi/link'

@connect(({ api, loading }) => ({
  api, _loading: loading.effects['api/getUserList'],
}))
class Index extends Component {
  state = {
    params: {
      page: 1, page_rows: 10, search: '',
    }, data: {}, visible: false,
  }

  componentDidMount () {
    this.fetch(this.state.params)
  }

  handleTableChange = pagination => {
    this.setState({
      params: {
        ...this.state.params, page: pagination.current, page_rows: pagination.pageSize,
      },
    }, () => {
      this.fetch(this.state.params)
    })
  }

  fetch (params) {
    const { dispatch } = this.props
    dispatch({
      type: 'api/getUserList', payload: params,
    })
  }

  showEditModel = (id, appid, is_super_admin) => {
    this.setState({
      visible: true, data: {
        id: id, appid: appid, is_super_admin: is_super_admin,
      },
    }, () => {
      //
    })
  }

  onEditFormFieldChange = e => {
    if (e == 1 || e == 0) {
      this.setState({
        data: {
          ...this.state.data, is_super_admin: e,
        },
      })
    } else {
      switch (e.target.name) {
        case 'appid':
          this.setState({
            data: {
              ...this.state.data, appid: e.target.value,
            },
          })
          break
        case 'appsecret':
          this.setState({
            data: {
              ...this.state.data, appsecret: e.target.value,
            },
          })
          break
      }
    }
  }

  onSwithChange = (is_use, id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'api/editUser', payload: {
        id: id, is_use: is_use,
      },
    }).then(() => {
      this.setState({
        params: {
          ...this.state.params, page: 1,
        },
      }, () => {
        this.fetch(this.state.params)
      })
    })
  }

  render () {
    const columns = [
      {
        title: 'Id', dataIndex: 'id', key: 'id',
      },
      {
        title: 'appid', dataIndex: 'appid', key: 'appid',
      },
      {
        title: '用户类型',
        dataIndex: 'is_super_admin',
        key: 'is_super_admin',
        render: (text, record) => (<div>{record.is_super_admin === '1' ? '超级管理员' : '普通用户'}</div>),
      },
      {
        title: '状态', dataIndex: 'is_use', key: 'is_use', render: (text, record) => (<div>
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            onChange={checked => {
              this.onSwithChange(checked ? 1 : 0, record.id)
            }}
            defaultChecked={record.is_use === '1' ? true : false}
          />
        </div>),
      },
      {
        title: '创建人', dataIndex: 'creator_appid', key: 'creator_appid',
      },
      {
        title: '创建时间', dataIndex: 'create_time', key: 'create_time',
      },
      {
        title: '操作', key: 'action', render: (text, record) => (<span>
            <a
              onClick={() => {
                this.showEditModel(record.id, record.appid, record.is_super_admin)
              }}
            >
              编辑
            </a>
          </span>),
      },
    ]

    const { _loading, api } = this.props

    const pagination = {
      current: api.getUserList.page,
      total: api.getUserList.total,
      pageSize: this.state.params.page_rows,
      showTotal: (total, range) => `总共 ${total} 条数据`,
    }

    return (<div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin">用户管理</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ backgroundColor: 'white', padding: '10px 20px', marginTop: 20 }}>
        <Modal
          title={this.state.data.id ? '编辑用户' : '新增用户'}
          visible={this.state.visible}
          onOk={() => {
            let url = this.state.data.id ? '/api/editUser' : '/api/addUser'
            this.setState({ confirmLoading: true })
            request_post(url, this.state.data).then(res => {
              this.setState({ confirmLoading: false })
              if (res.code === 200) {
                this.setState({ params: { ...this.state.params, page: 1 }, visible: false }, () => {
                  this.fetch(this.state.params)
                })
              }
            })
          }}
          confirmLoading={this.state.confirmLoading || false}
          okText="保存"
          onCancel={() => {
            this.setState({
              visible: false, confirmLoading: false,
            })
          }}
        >
          <Form
            labelCol={{
              xs: { span: 24 }, sm: { span: 4 },
            }}
            wrapperCol={{
              xs: { span: 24 }, sm: { span: 20 },
            }}
          >
            <Form.Item required label="appid">
              <Input
                onInput={this.onEditFormFieldChange}
                name="appid"
                disabled={!!this.state.data.id}
                value={this.state.data.appid}
                placeholder="请输入appid"
              />
            </Form.Item>

            <Form.Item label="appsecret">
              <Input
                onInput={this.onEditFormFieldChange}
                name="appsecret"
                value={this.state.data.appsecret}
                placeholder="请输入appsecret"
              />
            </Form.Item>

            <Form.Item required label="用户类型">
              <Select
                value={this.state.data.is_super_admin + ''}
                onChange={this.onEditFormFieldChange}
              >
                <Select.Option value="0">普通用户</Select.Option>
                <Select.Option value="1">超级管理员</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <div style={{ padding: '20px 0' }}>
          <Row>
            <Col span={8}>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ visible: true, data: { is_super_admin: '0' } })
                }}
              >
                新增
              </Button>
            </Col>
            <Col span={8} offset={8}>
              <Input.Search
                placeholder="请输入搜索关键字"
                allowClear
                onSearch={value => {
                  this.setState({
                    params: {
                      ...this.state.params, search: value,
                    },
                  }, () => {
                    this.fetch(this.state.params)
                  })
                }}
              />
            </Col>
          </Row>
        </div>
        <Table
          // style={{tableLayout: 'fixed'}}
          dataSource={api.getUserList.list}
          rowKey={record => record.id}
          pagination={pagination}
          columns={columns}
          loading={_loading}
          onChange={this.handleTableChange}
        />
      </div>
    </div>)
  }
}

export default Index
