import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {Button} from "antd";

import axios from "axios"

import { Layout, Menu, Breadcrumb, Icon, List, Pagination, Row, Col, Table, Divider, Tag, Input } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import * as Flux from "flux/utils";

import { ReduceStore } from "flux/utils";
const { CheckableTag } = Tag;
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

// window.menukey = '2'

const commit_columns = [
  {
    title: '提交id',
    dataIndex: 'commit_id',
    key: 'commit_id',
  },
  {
    title: '提交时间',
    dataIndex: 'commit_time',
    key: 'commit_time'
  },
  {
    title: '题目标题',
    dataIndex: 'problem_title',
    key: 'problem_title',
    render: t => <a onClick={()=>{window.menukey='3'}} href={t.link}>{t.title}</a>,
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    render: t => (
      <span>
        {t.tags.map(tag => {
          let color = tag === 'pass' ? 'green' : 'geekblue';
          if (tag === 'error') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag} onClick={()=>{alert(t.output)}}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '源码',
    key: 'code',
    dataIndex: 'code',
    render: code => {
      return (
        <a onClick={()=>{alert(code)}}>
          查看
        </a>
      )
    }
  }
]

const problems_data = [
  {
    key: '1',
    problem_id: 1,
    problem_title: {title: '排序', link: "/writecode"},
    problem_outline: '将数组从小到大排序',
    tags: ['hard'],
  }
];


function ProblemList(maxNumber) {
  return (
    <Table columns={problems_columns} dataSource={problems_data} />
  );
}

class CommitList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      commit_list: [
        // {
        //   key: '1',
        //   commit_id: 1,
        //   commit_time: '2019',
        //   problem_title: {title: '测试', link: "/writecode"},
        //   tags: {tags: ['error'], output: 'errorrrrr'},
        //   code: 'helloword'
        // }
      ]
    };
  }

  componentDidMount() {
    // alert("componentDidMount!!!!")

    // try {
    //   const response = await axios.get('localhost:8080/api/v1/commitlist');
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
    const _this = this
    axios.get('/api/v1/commitlist')
    .then(function (response) {
      
      let cl = response.data.commitlist
      console.log(cl);
      // handle success
      let commitlist = []
      for(let i=0;i<cl.length;i++){
        console.log(cl[i])
        let obj = {}
        obj.key = i
        obj.commit_id = cl[i]["ID"]
        obj.commit_time = cl[i]["CreatedAt"]
        obj.code = cl[i]["Code"]
        obj.problem_title = {
          title: '排序',
          link: '/writecode'
        }
        if(cl[i]["Status"] == 0){
          obj.tags = {tags: ['pending'], output: cl[i]["Output"]}
        }
        if(cl[i]["Status"] == 1){
          obj.tags = {tags: ['pass'], output: cl[i]["Output"]}
        }
        if(cl[i]["Status"] == -1){
          obj.tags = {tags: ['error'], output: cl[i]["Output"]}
        }
        commitlist.push(obj)
      }
      _this.setState({commit_list: commitlist})
    })
    .catch(function (error) {
      // handle error
      alert(error)
      console.log(error);
    })
  }

  render() {
    return (
      <Table columns={commit_columns} dataSource={this.state.commit_list} />
    );
  }
  
}

const commit = (pid, code) => {
  return (event) => {
    axios.post("/api/v1/commit",{
      code: code
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
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
            <h2>排序</h2>
            <p>输入一个数n，然后输入n个整数，请你输出这个数组从小到大排序后的结果</p>
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
        <Button key='commit' href='/commits/' type="primary" onClick={commit(this.state.global_pid,this.state.global_code)}>提交</Button>
      </div>
    )
  }
}

const NoMatch = () => (
  <div className="NoMatch">
    <h2>没有匹配的页面</h2>
  </div>
)

class AppRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_key: '2',
    };
  }

  componentDidUpdate() {
    // this.setState({selected_key: ''})
  }

  render(){
    return (
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[window.menukey]}
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
    )
  }
}


function App() {
  return (
    <div className="App">
        <AppRouter />
    </div>
  );
}

export default App;
