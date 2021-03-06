import React, { Component } from 'react';
import {  Header, Border } from './style';

class header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
    }
    render() { 
      return (
        <div>
            <Header>
                <div className='left' onClick={this.leftClick} dangerouslySetInnerHTML={{__html: this.props.header.left}}></div>
                <span className='title'>{this.props.header.title}</span>
                <div className='right' onClick={this.rightClick}style={{color: this.props.click ? '#FAD1CB' : '#FB6650'}}>{this.props.header.right}</div>
                <Border></Border>
            </Header>
            <div style={{height: '3.5rem'}}></div>
        </div>
      );
    }
    leftClick() {
        this.props.leftClick();
    }
    rightClick() {
        this.props.rightClick();
    }
}

header.defaultProps = {
    left: '取消',
    right: '',
    leftClick: () => {
        window.history.back(-1)
    }
}

export default header;