import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const spec = {
  beginDrag: (props) => {
    return {index: props.index};
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Source extends PureComponent {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  }

  render() {
    const isDragging = this.props.isDragging;
    const connectDragSource = this.props.connectDragSource;
    const containerStyle = {height:'100%',width:'100%',border:'1px solid black', opacity: isDragging ? 0.5 : 1 };

    return connectDragSource(
      <div style={containerStyle}>
       {this.props.children}
      </div>
    );
  }
}

export default DragSource('square', spec, collect)(Source);