import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor,props) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

const spec = {
  drop: (props, monitor) => {
    const source = monitor.getItem().index
    const target = props.index

    const {removeMedia,replaceMedia} = props

    console.log(source,target)
    if (target === 0){
      removeMedia(source)
    }
    else {
      replaceMedia(source,target)
    }
  }
}

class Target extends PureComponent {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }
  

  render() {
    const isOver = this.props.isOver;
    const canDrop = this.props.canDrop;
    const connectDropTarget = this.props.connectDropTarget;
    const style = { height:'45%',width:'30%', backgroundColor: (isOver && canDrop) ? '#f3f3f3' : '#cccccc', border: '1px dashed black' };

    return connectDropTarget(<div className="square" style={style}>{this.props.children}</div>);
  }
}

const target =  DropTarget('square', spec, collect)(Target)
export { target as Target }


