import React, { useState, useEffect } from 'react'
import axios  from 'axios';
import { List, Avatar, Space ,Input,Button,Modal, Tooltip,Select} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

let input1=false;
let select='username';


export default function UserManage(){
    const { Search } = Input;
    const { Option } = Select;
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [userInfo,setUserInfo]=useState({})
   // const [select,setSelect]=useState('');
    const user={
      "address": "0xbeAd993e565a5Cfa79Da88550Cf556992B87979c",
      "username": "user_beAd993e565a5Cfa79Da88550Cf556992B87979c",
      "avatar": "/img/user_logo.jpg",
      "verified_status": false,
      "real_name": "",
      "phone": "",
      "idcard": "",
      "work_num": 0,
      "time": "2022-03-14T16:07:25.311Z",
      "__v": 0,
      "sex": "女",
      "reg": false,
      "downagent": "[]",
      "level": "1",
      "upagent": ""
  }
  
    const handleChange=(selectedItems,option)=>{
      //setSelect(option.value)
      select=option.value
      console.log(select)
    }
    const selectBefore = (
      <Select defaultValue="username" className="select-before" onChange={handleChange}>
        <Option value="username">username</Option>
        <Option value="address">address</Option>
        <Option value="real_name">姓名</Option>
        <Option value="phone">手机号</Option>
      </Select>
    );
    
      
    
    
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://114.55.119.223/prod-api/api/master/getUserInfo',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('token')
          },
          data:{
              page:0,
              num:0,
          }
            
        })
            
            .then(res => {
                //console.log(res.data.data.userInfo)
                if(res.data.errCode==0){
                    /*setData([...data, ...JSON.parse(res.data.data.adminInfo1) ]);*/
                    setData(res.data.data.userInfo);
                }
              
            })
      }, []);
    
        

const onSearch = value => {
  user[select]=value
  console.log(user)
  axios({
    method: 'post',
    url: 'http://114.55.119.223/prod-api/api/master/searchUserInfo',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token')
  },
  data:user,
    
})
    
    .then(res => {
        console.log(res.data.data.userInfo)
        if(res.data.errCode==0){
            /*setData([...data, ...JSON.parse(res.data.data.adminInfo1) ]);*/
            //setData(res.data.data.userInfo);
        }
      
    })
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


    return(
        <div>
        <Search addonBefore={selectBefore} placeholder="input search text" onSearch={onSearch} enterButton style={{maxWidth:'30%'}}/>
        <Modal
        title="用户管理"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
      >
      用户名： 
      <Input
      placeholder={userInfo.username}
      onChange={(a)=>{let d={...userInfo};d.username=a.target.value;setUserInfo(d);}}
      style={{'maxWidth':'40%'}}
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="修改用户名">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
    <p></p>性别： 
    <Select defaultValue={userInfo.sex} value={userInfo.sex}  className="select-before" style={{width:'70px'}} onChange={(a,b)=>{
      //userInfo.sex=b.value;console.log(userInfo);
      let d={...userInfo};
      d.sex=b.value;
      setUserInfo(d);
    }}>
        <Option value="男">男</Option>
        <Option value="女">女</Option>
      </Select>
      <p></p>等级：
  <Select defaultValue={userInfo.level} value={userInfo.level} className="select-before" style={{width:'150px'}} onChange={(a,b)=>{let d={...userInfo};d.level=b.value;setUserInfo(d);}}>
        <Option value="1">1</Option>
        <Option value="2">2（机构管理员）</Option>
      </Select> <p></p>
    <Button type="primary" style={{marginTop:'10px'}} onClick={()=>{
      setVisible(false);
      axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/master/changeUserInfo',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
      },
      data:JSON.stringify(userInfo)
        
    }).then(res=>{console.log(res)})
    }}>修改</Button>
      </Modal>

        <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
       // console.log(page);
      },
      pageSize:6,
    }}
    dataSource={data}
    /*footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }*/
    renderItem={item => (
      <List.Item
        key={item.title}
        extra={
            <span>{item.address}</span>
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={
            <a href='javascript:;' onClick={() => {
             
            setVisible(true);
            //userInfo=JSON.parse(JSON.stringify(item));
            setUserInfo(item)
          }}>
          {item.username}
          </a>
        }
          description={item.real_name} 
        />
       {item.phone}  &nbsp;&nbsp;实名认证:{String(item.verified_status)} &nbsp;&nbsp;是否注册:{String(item.reg)}   &nbsp;&nbsp;level:{item.level}
      </List.Item>
     
    )}
  />
  
   </div>
    )
}