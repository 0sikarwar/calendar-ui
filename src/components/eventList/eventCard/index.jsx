import React, { Component } from 'react'

class eventCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name||'',
			startDate: props.startDate||'',
			endDate: props.endDate||''
		}
	}
	render() {
		const {deleteCard} = this.props

		const {
			name,
			startDate,
			endDate
		} = this.state
		return (
			<div className='eventCard'>
				<div className='head'> {name} </div>
				<div className='date'>	{startDate} to {endDate} </div>
				<div className="deleteCardButton" onClick={deleteCard}>X</div>
			</div>
		)
	}
}

export default eventCard