import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {Button} from "antd";

import axios from "axios"

import { Layout, Menu, Breadcrumb, Icon, List, Pagination, Row, Col, Table, Divider, Tag, Input, Form, Checkbox } from 'antd';
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
    title: '题号',
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
    problem_title: {title: '排序', link: "/writecode/1"},
    problem_outline: '将数组从小到大排序',
    tags: ['hard'],
  }
];


class ProblemList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      problemlist: []
    }
  }

  componentDidMount() {
    const _this = this
    axios.get("/api/v1/problemlist")
    .then(function (response) {
      const pl = response.data.problemlist
      let newlist = []
      for(let i=0;i<pl.length;i++){
        newlist.push({
          key: pl[i].ID,
          problem_id: pl[i].ID,
          problem_title: {title: pl[i].Title, link: "/writecode/"+pl[i].ID},
          problem_outline: pl[i].Desciption,
          tags: ['easy'],
        })
      }
      _this.setState({problemlist: newlist})
    }).catch(function (error) {
      console.log(error)
    })
  }

  render(){
    return (
      <Table columns={problems_columns} dataSource={this.state.problemlist} />
    );
  }
  
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
          title: cl[i]["ProblemID"],
          link: '/writecode/'+cl[i]["ProblemID"]
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
      code: code,
      lang: 'python',
      pid: parseInt(pid)
    }).then(function (response) {
      console.log("commit code...")
      console.log(response)
    }).catch(function (error) {
      console.log("commit code error...")
      console.log(error)
    })
  }
}

class WriteCode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      global_pid: this.props.match.params.id,
      global_code: "fmt.Println(\"hello world\")",
      problemlist: []
    };
  }

  componentDidMount() {
    const _this = this
    axios.get("/api/v1/problemlist")
    .then(function (response) {
      const pl = response.data.problemlist
      _this.setState({global_pid: _this.state.global_pid, global_code: _this.state.global_code, problemlist: pl})
    }).catch(function (error) {
      console.log(error)
    })
  }

  render(){
    if(this.state.problemlist.length>0){
    return (
      <div>
        <Row>
          <Col span={12}>
            
    <h2>{this.state.problemlist[this.state.global_pid-1].Title}</h2>
    <p>{this.state.problemlist[this.state.global_pid-1].Desciption}</p>
          </Col>
          <Col span={12}>
            <TextArea rows={25} onChange={
              (e)=>{
                this.setState({problemlist: this.state.problemlist, global_pid: this.state.global_pid, global_code: e.target.value})
              }
            }/>
          </Col>
        </Row>
        <Divider />
        <Button key='commit' href='/commits/' type="primary" onClick={commit(this.state.global_pid,this.state.global_code)}>提交</Button>
      </div>
    )
    }
    return (
      <div>aaa</div>
    )
  }
}

const NoMatch = () => (
  <div className="NoMatch">
    <h2>没有匹配的页面</h2>
  </div>
)
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post("/api/v1/user/login",{
          user_name: values.username,
          password: values.password
        }).then(function (response) {
          alert("登陆成功")
          window.location.href = "/problems";
        }).catch(function (error) {
          alert("登陆失败")
        })
      }else{
        alert(err)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


class AppRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      is_login: 0
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
                <Menu.Item key='0'>
                  <Link to="/login/">登陆</Link>
                </Menu.Item>
                <Menu.Item key='1'>
                  <Link to="/commits/">提交记录</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                  <Link to="/problems/">题目列表</Link>
                </Menu.Item>
                <Menu.Item key='3'>
                  <Link to="/writecode/1">做题</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
                <Switch>
                  <Route path="/commits/" exact component={CommitList} />
                  <Route path="/problems/" exact component={ProblemList} />
                  <Route path="/writecode/:id" exact component={WriteCode} />
                  <Route path="/login/" exact component = {WrappedNormalLoginForm}/>
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
