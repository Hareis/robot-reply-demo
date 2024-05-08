import React, { Component } from 'react'
import client from '../../feathers-client'
import {nanoid} from 'nanoid'
import Question from './question'
import Answer from './answer'

export default class index extends Component {
    state={
        messageList:[],
        outputing:false
    }
    
    componentDidMount(){
        //监听客户端响应的请求
        client.service('questions').on('created',(message)=>{
            let tempList = this.state.messageList
            //获取最后一个判断是否为当前对话
            const lastMessage=tempList[tempList.length-1]
            
            if(lastMessage&&lastMessage.rid===message.rid){
                //拼接到最后一个
                tempList=[...tempList.slice(0,-1),{
                    ...message,
                    answer:lastMessage.first? message.answer : lastMessage.answer+`
                    `+ message.answer,
                    first:message.first?true:false
                }]
            }else{
                tempList=[...tempList,{
                    ...message,
                }]
            }
            this.setState({
                messageList:[...tempList]
            },()=>{
                tempList=this.state.messageList
            })
        })
    }
    sendQuestion=(e)=>{
        //屏蔽掉非回车事件
        if(e.keyCode!=13) return

        const messageItem={
            qid:nanoid(8),
            question: e.target.value,
            outputing:true,
            times:Date.now()
        }
        this.setState({
            messageList:[...this.state.messageList,messageItem]
        },()=>{
            
            client.service('questions').create(messageItem)
        })
    }
    render() {
        return (
        <div>
            <ul className='messageBox'>
                {
                    this.state.messageList.map(e=>{
                        if(e.rid){
                            return <li key={'r_'+e.rid}>
                                <Answer text={e.answer} outputing={e.outputing}/>
                            </li>
                        }else {
                            return <li key={'q_'+e.qid}>
                                <Question text={e.question}/>
                            </li>
                        }
                    })
                }
            </ul>
            <div className='input-panel'>
                <input type="text" placeholder='type your question' onKeyDown={this.sendQuestion}  disabled={this.state.messageList[this.state.messageList.length-1]?.outputing} />
            </div>
        </div>
        )
    }
}
