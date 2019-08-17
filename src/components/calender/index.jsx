import React from 'react';
import { connect } from "react-redux";
import { DAYS, MONTHS } from 'Constants/commonConstants'
import { isValidDate } from 'Utils'
class calender extends React.Component {

	state = {
		currentMonth: this.props.initialMonth,
		currentYear: this.props.initialYear,
		spacialDaysArray: this.props.spacialDays.split(',')
	}

	componentDidMount() {

	}
	static getDerivedStateFromProps() {
		
	}
	getAdditionClassForCell(day) {
		const {
			spacialDaysArray,
			currentMonth,
			currentYear
		} = this.state
		const {
			todayClassName,
			spacialDayClassName
		} = this.props
		const currentDate = new Date();
		let today = -1
		let additionalClass = ' '
		const temp = spacialDaysArray.map(d => {
			if (!isValidDate(d)) {
				return false
			}
			const date = new Date(d);
			if (date.getDate() === day &&
				date.getMonth() == currentMonth &&
				date.getFullYear() == currentYear
			) {
				return true
			}
		}).filter(Boolean)
		if (currentDate.getMonth() == currentMonth && currentDate.getFullYear() == currentYear) {
			today = currentDate.getDate();
		}
		additionalClass += day === today ? todayClassName : ''
		additionalClass += temp.length ? ' ' + spacialDayClassName : ''
		return additionalClass
		
	}
	handleDateClick(day) {
		const { onDateClick } = this.props
		const { currentMonth, currentYear } = this.state
		onDateClick(day, currentMonth, currentYear)
	}
	createCalender(month, year) {
		const {
			cellClassName,
			rowClassName,
		} = this.props
		month = parseInt(month);
		year = parseInt(year)
		const firstDay = (new Date(year,month )).getDay()
		const numberOfDays = 32 - (new Date(year, month, 32)).getDate()
		let table = [], day = 1
		for (let i = 0; i < 6; i++) {
			let children = []
			for (let j = 0; j < 7; j++) {
				//for empty cell
				if ((i == 0 && j < firstDay) || day > numberOfDays) {
					children.push(<td className={cellClassName}key={'' + i + j}></td>);
				} else {
					//to classes for dates with specail day or today
						const additionalClass = this.getAdditionClassForCell(day)
					children.push(<td key={'' + i + j} className={cellClassName + additionalClass} onClick={this.handleDateClick.bind(this,day)}>{day++}</td>)
				}
			}
			table.push(<tr className={rowClassName}key={'' + i}>{children}</tr>)
		}
		return table
	}

	decreaseMonth = () => {
		let {
			currentMonth,
			currentYear
		} = this.state
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear -= 1;
		} else {
			currentMonth -= 1;
		}
		this.setState({
			currentMonth,
			currentYear
		})
	}

	increaseMonth = () => {
		let {
			currentMonth,
			currentYear
		} = this.state
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear += 1;
		} else {
			currentMonth += 1;
		}
		this.setState({
			currentMonth,
			currentYear
		})
	}

	render() {
		const {
			calenderClassName,
			headingClassName,
			daysRowClassName,
			monthHeadingClassName,
			arrowClassName,
			containerClassName
		} = this.props
		const {
			currentMonth,
			currentYear
		} = this.state
		const filledTable = this.createCalender(currentMonth, currentYear)
		return (
			<div className={containerClassName}>
				<div className={headingClassName}>
					<div className={arrowClassName} onClick={this.decreaseMonth}>&lt;</div>
					<div className={monthHeadingClassName}>{MONTHS[currentMonth] + ', ' + currentYear}</div>
					<div className={arrowClassName} onClick={this.increaseMonth}>&gt;</div>
				</div>
				<table className={calenderClassName}>
					<tbody>
						<tr>
							{
								DAYS.map(day => {
									return <th className={daysRowClassName} key={day}>{day}</th>
								})
							}
						</tr>
						{
							filledTable.map(row => {
								return row
							})
						}
					</tbody>
				</table>
			</div>
		);

	}
}

calender.defaultProps = {
	initialMonth: new Date().getMonth(),
	initialYear: new Date().getFullYear(),
	calenderClassName: '',
	daysRowClassName: '',
	cellClassName: '',
	rowClassName: '',
	todayClassName: '',
	monthHeadingClassName: '',
	headingClassName: '',
	arrowClassName: '',
	containerClassName: '',
	spacialDays: '',// fromat : mmm dd yyyy, dd mmm yyyy,yyyy dd mmm,yyyy mmm dd, mm/dd/yyyy 
	spacialDayClassName: '',
	onDateClick:()=>{ }
}

const mapStateToProps = ({ }) => {
}

export default connect(
	mapStateToProps,
	{

	}
)(calender)