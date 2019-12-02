import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {Button} from "antd";

import { Layout, Menu, Breadcrumb, Icon, List, Pagination, Row, Col, Table, Divider, Tag, Input } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

const { TextArea } = Input;

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const problems_columns = [
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

const commit_columns = [
  {
    title: '提交id',
    dataIndex: 'commit_id',
    key: 'commit_id',
  },
  {
    title: '题目标题',
    dataIndex: 'problem_title',
    key: 'problem_title',
    render: t => <a href={t.link}>{t.title}</a>,
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag === 'pass' ? 'green' : 'geekblue';
          if (tag === 'error') {
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
  }
]

const commit_data = [
  {
    key: '1',
    commit_id: 1,
    problem_title: {title: '两数之和', link: "/pid/1"},
    tags: ['error']
  },
  {
    key: '2',
    commit_id: 2,
    problem_title: {title: '两数之和', link: "/pid/1"},
    tags: ['pass']
  },
  {
    key: '2',
    commit_id: 2,
    problem_title: {title: '二叉树中序遍历', link: '/pid/3'},
    tags: ['pending']
  },
]

const problems_data = [
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
    <Table columns={problems_columns} dataSource={problems_data} />
  );
}

function CommitList(maxNumber) {
  return (
    <Table columns={commit_columns} dataSource={commit_data} />
  );
}

const commit = (pid, code) => {
  return (event) => {
    alert(code)
  }
}

class WriteCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      global_pid: 1,
      global_code: "fmt.Println(\"hello world\")"
    };
  }

  render(){
    return (
      <div>
        <Row>
          <Col span={12}>
            <h2>{this.state.global_pid}</h2>
            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
          </Col>
          <Col span={12}>
            <TextArea rows={25} onChange={
              (e)=>{
                this.setState({global_pid: this.state.global_pid, global_code: e.target.value})
              }
            }/>
          </Col>
        </Row>
        <Divider />
        <Button key='commit' type="primary" onClick={commit(this.state.global_pid,this.state.global_code)}>提交</Button>
      </div>
    )
  }
}

const NoMatch = () => (
  <div className="NoMatch">
    <h2>没有匹配的页面</h2>
  </div>
)

const AppRouter = () => (
  <Router>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='1'>
            <Link to="/commits/">提交记录</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to="/problems/">题目列表</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to="/writecode/">做题</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
          <Switch>
            <Route path="/commits/" exact component={CommitList} />
            <Route path="/problems/" exact component={ProblemList} />
            <Route path="/writecode/" exact component={WriteCode} />
            <Redirect from="/*" to="/" />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Content>
    </Layout>
  </Router>
);


function App() {
  return (
    <div className="App">
        <AppRouter />
    </div>
  );
}

export default App;
