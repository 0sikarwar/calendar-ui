import React from 'react';
import { connect } from "react-redux";
import CalenderComponent from "../../components/calender";
import Modal from '../../components/modal';
import { DAYS, MONTHS } from '../../constants/commonConstants'
import EventList from '../../components/eventList'
import { addNewEvent } from '../../actions/event'

class calenderPage extends React.Component {
  state = {
    showModal: false,
    modalHeading: '',
    showNewEventCard: false,
    eventList:[]
  }
  componentDidMount() {

  }
  handleDateClick = (day, month, year) => {
    let modalHeading = `${day} ${MONTHS[month]}, ${year}`;
    const dayName = DAYS[new Date(modalHeading).getDay()]
    modalHeading = `${dayName} ${modalHeading}`
    this.setState({
      modalHeading
    })
    this.toggleModal()
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }
  toggleAddNewEvent = () => {
    this.setState({
      showNewEventCard: !this.state.showNewEventCard
    })
  }
  addEvent = (event) => {
    const { eventList } = this.state
    eventList.push(event)
    this.setState({
      eventList,
      showNewEventCard: false
    })
    this.props.addNewEvent(event)
  }

  deleteEvent = (index) => {
    const { eventList } = this.state
    eventList.splice(index,1)
    this.setState({
      eventList
    })
  }
  
  render() {
    const { showModal, modalHeading, showNewEventCard, eventList } = this.state
    return (
      <div className='flex flex-center flex-middle ht-500'>
        <CalenderComponent
          initialYear={new Date().getFullYear()}
          initialMonth={new Date().getMonth()}
          calenderClassName='calender wt-400'
          containerClassName='flex flex-column flex-wrap'
          todayClassName='today br-10 col-1'
          monthHeadingClassName='fs-22'
          arrowClassName='fs-22 fBold br-50p wt-50 arrow'
          headingClassName='flex flex-between wt-400 ml-10 mr-10 calenderHeading flex-wrap'
          spacialDays={'26 jun 2019,27 july 2019'}
          spacialDayClassName='spacialDay'
          onDateClick={this.handleDateClick}
        />
         { showModal && <Modal
            heading={modalHeading}
            onClose={this.toggleModal}
          >
            <EventList
              eventList={eventList}
              addEvent={this.addEvent}
              showNewEventCard={showNewEventCard}
              deleteEvent={this.deleteEvent}
              toggleAddNewEvent={this.toggleAddNewEvent}
            />
             { !showNewEventCard && <div className='fixedPlusButton' onClick={this.toggleAddNewEvent}>+</div>}
          </Modal>}
      </div>

    );

  }
}

const mapStateToProps = ({ }) => {
}

export default connect(
  mapStateToProps,
  {
    addNewEvent
  }
)(calenderPage)