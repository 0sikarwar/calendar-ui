import React, { Component } from 'react'

class Modal extends Component {
	render() {
		const { heading, onClose } = this.props
		return (
			<div className='screen'>
				<div className='modal'>
					<div className='header'>
						<div></div>
						<div className='modalHeading'>{heading}</div>
						<div className='modalCloseButton' onClick={onClose}>X</div>
					</div>
					<div className='content'>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}
export default Modal