import React,{ useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Select,
    Checkbox, Avatar, Upload, message,Modal,
    Button, Tooltip,Image
} from 'antd';
import {AntDesignOutlined, InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import axios from "axios";
import {Option} from "antd/es/mentions";
import {change_password,change_avatar,get_by_uid,change_info} from "@/request/topicAPI";
import FormItem from 'antd/lib/form/FormItem';
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    
};

const beforeUpload = async (file) => {
    
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    
    return isJpgOrPng && isLt2M;
    
};

const uploadButton = (
    <div>
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            Upload
        </div>
    </div>
);

let avatar='';
let userID='';
export default function MyPage(){
    //data
  const [form] = Form.useForm();
  const [isChangePwd,setIsChangePwd]=useState(false)
    const [isChangeInfo,setIsChangeInfo]=useState(false)
    const [userInfo,setUserInfo]=useState({})
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imgurl,setImgurl]=useState('upload/a.jpg')
    //const [avatar,setAvatar]=useState('')
    const [fileList, setFileList] = useState([])
    const [email,setEmail]=useState('')
    const [sex,setSex]=useState(0)
   


    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const history =useHistory();

    //methods
    const onFinish = async (values) => {
        console.log(values);
        let res=await change_password({oldPassword:values.oldPassword,newPassword:values.newPassword});
        if(res.state===200){
            message.success("修改密码成功")
        }else{
            message.error("修改密码失败")
        }
    };
    

    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });


const handlePreview = async (file) => {
    console.log(file,2)
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        console.log(file.preview,1);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
};

const handleChange2 = ({ fileList: newFileList }) => {
     setFileList(newFileList)

};
const handleCancel = () => setPreviewVisible(false);


    useEffect(()=>{
        get_by_uid({uid:localStorage.getItem("token")}).then(res=>{
            if(res.state===200){
                avatar=res.data.profile;
                userID=localStorage.getItem("token")
            }
        })
    },[])

    return(

       <div style={{height:"800px"}}>

           <div style={{overflow:"hidden"}}>
               <div style={{width:'200px',margin:"0 auto"}}>
                   <Avatar size={64} src={"http://localhost:8080/upload/"+avatar} />
               </div>
               <div style={{margin:"10px,auto",width:"200px",
               position:"relative",left:"370px",top:"20px"}}><Button onClick={()=>{
                history.push('/forum/userPage/'+userID)
               }}>我的发帖</Button></div>

               <div style={{width:'220px',margin:"40px auto",}} >
               <>
                <Upload
                    action="http://localhost:8080/users/change_avatar"
                    //customRequest={post}
                    listType="picture-card"
                    fileList={fileList}
                    headers={{
                        "uid":localStorage.getItem('token')
                    }}
                    onPreview={handlePreview}
                    onChange={handleChange2}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </>

               </div>

           </div>

           {
               !isChangePwd?(

                       <Button type="primary" style={{marginLeft:"100px"}} onClick={()=>{setIsChangePwd(true)}}>修改密码</Button>

                   ):
                   (
                       <div>
                           <Form
                               {...formItemLayout}
                               form={form}
                               name="register"
                               className='changePwd'
                               onFinish={onFinish}
                               initialValues={{
                                   prefix: '86',
                               }}

                               scrollToFirstError
                           >
                               <Form.Item
                                   name="oldPassword"
                                   label="旧的密码"
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入旧的密码',
                                       },
                                   ]}
                                   hasFeedback

                               >
                                   <Input.Password className='MyPageInput'/>
                               </Form.Item>

                               <Form.Item
                                   name="newPassword"
                                   label="新密码"
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入新密码',
                                       },
                                   ]}
                                   hasFeedback

                               >
                                   <Input.Password className='MyPageInput'/>
                               </Form.Item>

                               <Form.Item
                                   name="confirm"
                                   label="确认密码"
                                   dependencies={['password']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: '请确认密码',
                                       },
                                       ({ getFieldValue }) => ({
                                           validator(_, value) {
                                               if (!value || getFieldValue('newPassword') === value) {
                                                   return Promise.resolve();
                                               }

                                               return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                           },
                                       }),
                                   ]}
                               >
                                   <Input.Password className='MyPageInput'/>
                               </Form.Item>
                               <Form.Item>
                                   <Button type="primary" style={{"marginLeft":"240px"}} htmlType="submit" >修改密码</Button>
                                   <Button type="primary" style={{marginLeft:"30px"}} onClick={()=>{setIsChangePwd(false)}}>取消</Button>


                               </Form.Item>

                              
                           </Form>
                       </div>
                   )
           }
           <div style={{marginTop:"10px"}}>
               {isChangeInfo ? (
                   <Form onFinish={(v)=>{
                    //console.log(email,sex)
                    change_info({email:email,gender:sex}).then(res=>{
                        if(res.state===200){
                            message.success('修改成功')
                        }
                    }
                    )}} 
                   >
            <div style={{marginLeft:"150px",width:"800px"}}>
            <FormItem> 邮箱：
                       
                       <Input
                       name="email"
                           placeholder={userInfo.username}
                           onChange={(a)=>{setEmail(a.target.value)}}
                           style={{'maxWidth':'40%'}}
                           prefix={<UserOutlined className="site-form-item-icon" />}
                           suffix={
                               <Tooltip title="修改邮箱">
                                   <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                               </Tooltip>
                           }
                       />
                       </FormItem>
                       
                       <p></p>性别：
                       <Select defaultValue={userInfo.sex} value={sex}  className="select-before" style={{width:'70px'}} onChange={(a,b)=>{
                           //userInfo.sex=b.value;console.log(userInfo);
                          
                          setSex(b.value)
                           
                       }}>
                           <Option value="1">男</Option>
                           <Option value="0">女</Option>
                       </Select>
                       <p></p>
                       
                       
                       <p></p>
                       <Button type="primary" style={{marginTop:'10px'}} htmlType="submit" 
                       >修改</Button>
                       <Button type="primary" style={{marginLeft:"30px"}} onClick={()=>{setIsChangeInfo(false)}}>取消</Button>


                   </div>
                   </Form>
                   
               ):(
                   <Button type="primary" style={{position:"relative", marginLeft:"100px",top:"100px"}} onClick={()=>{setIsChangeInfo(true)}}>修改信息</Button>

                   )}
           </div>

       </div>

    )
}