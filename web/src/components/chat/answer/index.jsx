import React, { Component } from 'react'

export default class Answer extends Component {
  render() {
    return (
      <div>
        <div>
            机器人：
        </div>
        {/* 这里需要使用markdown语法解析 */}
        <article className='reply-content'>{this.props.text} {this.props.outputing? <span className='outputing'>...</span>:''}</article>
        {
          this.props.outputing?<span className='stopOutput'>停止</span>:<></>
        }
        
      </div>
    )
  }
}
