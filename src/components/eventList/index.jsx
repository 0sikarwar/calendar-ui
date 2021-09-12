import React, { Component } from 'react'
import EventCard from './eventCard'

class eventList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newEvent: {	
				name: '',
				startDate: '',
				endDate: ''
			}
		}
	}

	handleFormInput = (event) => {
		const { newEvent } = this.state
		this.setState({
			newEvent: {
				...newEvent,
				[event.target.id]: event.target.value
			}
		})
	}

	handleFormSubmit = (event) => {
		event.preventDefault()
		this.props.addEvent(this.state.newEvent)
		this.resetForm()
	}

	resetForm = () => {
		this.setState({
			newEvent: {
				name: '',
				startDate: '',
				endDate: ''
			}
		})
	}

	deleteCard = (index) => {
		this.props.deleteEvent(index)
	}

	render() {
		const { showNewEventCard, eventList, toggleAddNewEvent } = this.props
		const {
			name,
			startDate,
			endDate
		} = this.state.newEvent
		return (
			<div className="eventList">
				{
					eventList.map((event,index) => {
						return (
							<EventCard
								name={event.name}
								startDate={event.startDate}
								endDate={event.endDate}
								deleteCard={this.deleteCard.bind(this,index)}
								key={index}
							/>
						)
					})
				}
					{showNewEventCard && <form className='newEventCard' onChange={this.handleFormInput} onSubmit={this.handleFormSubmit}>
						<div className='eventName'>
							<label htmlFor='name'>Event Name</label>
							<input autoFocus type='text' id='name' value={name} required></input>
						</div>
						<div className='date'>
							<label htmlFor='startDate'>Start Date</label>
							<input type='date' id='startDate' value={startDate} required></input>
						</div>
						<div className='date'>
							<label htmlFor='endDate'>End Date</label>
							<input type='date' id='endDate' value={endDate} required></input>
						</div>
						<div className='flex flex-between'>
							<input type='submit' className='btn btn-primary btn-small' value='Save'/>
							<input type='button' className='btn btn-secondary btn-small' value='Clear' onClick={this.resetForm}/>
						</div>
						<div className="deleteCardButton" onClick={toggleAddNewEvent}>X</div>
					</form>}
			</div>
		)
	}
}

export default eventList