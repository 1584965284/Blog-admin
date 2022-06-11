//npm
import React, { useState, useEffect } from 'react';
import {useHistory,Route,Switch} from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { List, message, Avatar, Skeleton, Divider,Affix,
    Modal, Button,Input,Card,Comment, Tooltip ,Form,BackTop } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined,PlusOutlined } from '@ant-design/icons';

//import
import {getall,check_my_post,get_by_mid,get_by_uid2,mlike,flike} from "@/request/topicAPI";
import MyComment from "@/components/Comment/Comment"


//帖子内容以及回帖
export default function Audit(props){
    //data
    const [likes, setLikes] = useState(0);
    const [isAuthor, setIsAuthor] = useState(false);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    

    

//methods
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
        mlike({mid:props.match.params.mid}).then(res=>{
            if(res.state===200){
                message.success('点赞成功~')
            }else{
                message.error(res.message)
            }
        })
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };
    const createFollow=()=>{
        //setVisible(true)
        window.scrollTo(0, document.documentElement.scrollHeight-document.documentElement.clientHeight);
    }

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>

    ];
    // if(isAuthor===true){
    //     action.push(<span key="comment-basic-reply-to">删除帖子</span>)
    // }

    useEffect( () => {
        get_by_mid({mid:props.match.params.mid})
            .then(res => {
                //console.log(res.data.data.userInfo)
                if(res.state===200){
                    /*setData([...data, ...JSON.parse(res.data.data.adminInfo1) ]);*/
                    setData(res.data);
                }

            });
        //let res2=await check_my_post();

        check_my_post({mid:props.match.params.mid}).then(res=>{
                if(res.state===200){
                    if(res.data===true){
                        setIsAuthor(true)
                    }else {setIsAuthor(false)}
                }
            })
    }, []);

    //components


    
    


    return(
     <div>
         <>
             <BackTop />

         </>
         <Modal
             title="发帖"
             centered
             visible={visible}
             onOk={() => setVisible(false)}
             onCancel={() => setVisible(false)}
             width={700}
         >
             <MyComment />
         </Modal>

         <div  onClick={createFollow}
             style={{position:'fixed',width:'43px',height:"43px",
             background:"#1890ff",borderRadius:"50%","bottom":"110px",
             right:"98px",zIndex:"999",textAlign:"center",lineHeight:"45px",fontSize:"20px",color:"white"}}>
             <PlusOutlined />
         </div>

         <div>
             <Comment
                 actions={actions}
                 author={<a>Han Solo</a>}
                 avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                 content={
                     <p>
                         We supply a series of design principles, practical patterns and high quality design
                         resources (Sketch and Axure), to help people create their product prototypes beautifully
                         and efficiently.<br/>
                         We supply a series of design principles, practical patterns and high quality design
                         resources (Sketch and Axure), to help people create their product prototypes beautifully
                         and efficiently.<br/>
                         We supply a series of design principles, practical patterns and high quality design
                         resources (Sketch and Axure), to help people create their product prototypes beautifully
                         and efficiently.
                     </p>

                 }
                 datetime={
                     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                         <span>{moment().fromNow()}</span>
                     </Tooltip>
                 }
             />
             {isAuthor?(<span key="comment-basic-reply-to">删除帖子</span>):(<div></div>)}
         </div>
         <div>
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
                 // footer={
                 //   <div>
                 //     <b>ant design</b> footer part
                 //   </div>
                 // }
                 renderItem={item => (
                     <List.Item

                         extra={
                             <span>{item.address}</span>
                         }
                     >
                         <List.Item.Meta
                             avatar={<Avatar src={item.avatar} />}
                             title={
                                 <a  onClick={() => {
                                     //userInfo=JSON.parse(JSON.stringify(item));
                                     //setUserInfo(item)
                                     get_by_uid2({uid:1}).then()
                                 }}>
                                     {item.userName}
                                 </a>
                             }
                             description={item.real_name}
                         />
                         <div style={{width:'90%',margin:"0 auto"}}>
                         {item.fpostContent}
                             </div>
                     </List.Item>

                 )}
             />
         </div>
         <div >
             <MyComment />

         </div>

     </div>
    )
}