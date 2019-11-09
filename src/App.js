import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "antd";

import { Layout, Menu, Breadcrumb, Icon, List, Pagination, Row, Col, Table, Divider, Tag } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: '题号',
    dataIndex: 'problem_id',
    key: 'problem_id',
  },
  {
    title: '题目标题',
    dataIndex: 'problem_title',
    key: 'problem_title',
    render: t => <a href={t.link}>{t.title}</a>,
  },
  {
    title: '题目摘要',
    dataIndex: 'problem_outline',
    key: 'problem_outline',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag === 'easy' ? 'green' : 'geekblue';
          if (tag === 'hard') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>收藏 {record.name}</a>
        <Divider type="vertical" />
        <a>赞</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    problem_id: 1,
    problem_title: {title: '两数之和', link: "/pid/1"},
    problem_outline: '输入两个整数A和B，输出A+B的值',
    tags: ['easy'],
  },
  {
    key: '2',
    problem_id: 2,
    problem_title: {title: '反转链表', link: '/pid/2'},
    problem_outline: '反转链表',
    tags: ['medium'],
  },
  {
    key: '3',
    problem_id: 3,
    problem_title: {title: '二叉树中序遍历', link: '/pid/3'},
    problem_outline: '二叉树中序遍历',
    tags: ['hard'],
  },
  {
    key: '4',
    problem_id: 4,
    problem_title: {title: '二叉树中序遍历', link: '/pid/3'},
    problem_outline: '二叉树中序遍历',
    tags: ['hard'],
  },
  {
    key: '5',
    problem_id: 5,
    problem_title: {title: '二叉树中序遍历', link: '/pid/3'},
    problem_outline: '二叉树中序遍历',
    tags: ['hard'],
  },
  {
    key: '6',
    problem_id: 6,
    problem_title: {title: '二叉树中序遍历', link: '/pid/3'},
    problem_outline: '二叉树中序遍历',
    tags: ['hard'],
  },
];


function ProblemList(maxNumber) {
  return (
    <Table columns={columns} dataSource={data} />
  );
}

function Tmp() {
    return (
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">提交记录</Menu.Item>
              <Menu.Item key="2">题目列表</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <ProblemList maxNumber="10"></ProblemList>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    );
}


function App() {
  return (
    <div className="App">
      <Tmp></Tmp>
    </div>
  );
}

export default App;
