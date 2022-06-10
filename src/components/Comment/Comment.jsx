import {Avatar, Button, Comment, Form, Input} from "antd";
import React from "react";
import {useState} from "react";



const { TextArea } = Input;
let value='';
export default function MyComment(){
    //data

    //let [value,setValue]=useState('');

    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} showCount maxLength={100}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </div>
    );

    //methods
    const handleChange=(e)=>{
       // setValue(e.target.value)
        value=e.target.value;
        //console.log(value);
    }

    return(
        <div>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        //onSubmit={handleSubmit}
                        //submitting={submitting}
                       // value={value}
                    />
                }
            />
        </div>
    )

}
