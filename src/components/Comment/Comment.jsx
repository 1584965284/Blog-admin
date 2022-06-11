import {Avatar, Button, Comment, Form, Input,Upload,Modal} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import React from "react";
import {useState} from "react";
import { change_avatar,new_fpost } from "@/request/topicAPI";


const { TextArea } = Input;
let value='';
export default function MyComment(){
    //data
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])

    //let [value,setValue]=useState('');

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });

    const handleCancel = () => setPreviewVisible(false);

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
    const post =(file)=>{
        console.log(file,2)
        console.log(fileList)
    }

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
    

    return(
        <div>
            
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
                    {fileList.length >= 8 ? null : uploadButton}
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
    )

}
