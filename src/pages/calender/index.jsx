import React from 'react';
import { connect } from "react-redux";
import CalenderComponent from "Components/calender";

class calenderPage extends React.Component {
  state = {
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <CalenderComponent
          initialYear={new Date().getFullYear()}
          initialMonth={new Date().getMonth()}
          calenderClassName='calender col-2'
          containerClassName='flex flex-column flex-wrap flex-center flex-middle col-1'
          todayClassName='today br-10 col-1'
          monthHeadingClassName='fs-22'
          arrowClassName='fs-22 fBold br-50p wt-50 arrow'
          headingClassName='flex flex-between col-2 ml-10 mr-10 calenderHeading flex-wrap'
          spacialDays={'26 jun 2019,27 july 2019'}
          spacialDayClassName='spacialDay'
        />
      </div>

    );

  }
}

const mapStateToProps = ({ }) => {
}

export default connect(
  mapStateToProps,
  {

  }
)(calenderPage)