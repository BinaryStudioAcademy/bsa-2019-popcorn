import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './UserEventsEditor.scss';
import MapWithASearchBox from '../EventMap/EventMapSearch';
import { ReactComponent as PhotoIcon } from '../../../../assets/icons/general/photoIcon.svg';

interface IUserEventsEditorProps {
  id?: string,
}

interface IUserEventsEditorState {
  title: string,
  description: string,
  location: {
    lat: number,
    lng: number
  } | undefined,
  dateRange: {
    startDate: Date | undefined,
    endDate: Date | undefined
  },
  isPrivate: boolean,
  isDropDownOpen: boolean
}

class UserEventsEditor extends React.Component<IUserEventsEditorProps, IUserEventsEditorState> {
  constructor(props: IUserEventsEditorProps) {
    super(props);
    this.state = {
      title: '',
      description: '',
      location: undefined,
      dateRange: {
        startDate: undefined,
        endDate: undefined
      },
      isPrivate: false,
      isDropDownOpen: false
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.validateDateRange = this.validateDateRange.bind(this);
    this.onToggleDropDown = this.onToggleDropDown.bind(this);
    this.onLocationChanged = this.onLocationChanged.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      // fetch event by id
      this.setState({
        ...this.state,
        title: 'Test Event',
        description: 'This event was created only for testing',
        location: {lat: 43.45302254999737, lng: -3.842123892834479},
        dateRange: {
          startDate: new Date(2019, 11, 12),
          endDate: new Date(2019, 11, 13)
        },
        isPrivate: true
      });
    }
  }

  onChangeData(e, keyword: string) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    this.setState({
        ...this.state,
        [keyword]: value
    });
  }

  onLocationChanged(newCord) {
    this.setState({
      ...this.state,
      location: newCord
    });
  }

  onChangeDate(newDate) {
    const dateRange = {...this.state.dateRange, ...newDate};
    if (this.validateDateRange(dateRange)) {
      this.setState({
        ...this.state,
        dateRange
      });
    } 
  }

  validateDateRange({startDate, endDate}) {
    const now = new Date();
    const isValidateDate = startDate ? startDate > now : true && endDate ? endDate > now : true;
    const isValidateRange = endDate > startDate || !startDate || !endDate;
    console.log(isValidateDate, isValidateDate)
    return isValidateDate && isValidateRange;
  }

  onToggleDropDown() {
    this.setState({
      isDropDownOpen: !this.state.isDropDownOpen
    });
  }

  onChangePrivacy = (isPrivate) => {
    this.setState({
      isPrivate
    })
  }

  onSave() {
    if (
      this.state.title.trim() === '' ||
      this.state.description.trim() === '' ||
      !this.state.location ||
      !this.state.dateRange.startDate ||
      !this.state.dateRange.endDate
    ) return;

    this.props.id
      ? console.log(this.state, 'event updated') //this.props.updateEvent(this.props.id, this.state);
      : console.log(this.state, 'event created'); //this.props.addEvent(this.state);      
    this.onCancel();
  }

  onCancel() {
    this.setState({
      title: '',
      description: '',
      location: undefined,
      dateRange: {
        startDate: undefined,
        endDate: undefined
      },
      isPrivate: false
    });
    console.log('redirected');
  }

  render() {
    const DROPDOWN_LABEL = this.state.isPrivate
      ? 'Private'
      : 'Public';

      return (
      <div className='event-editor'>
        <button className='back-btn' onClick={this.onCancel}>Back</button>
        
        <div className="inputs">

          <label className='input-wrp'><span className='label'>Title: </span> 
            <input type="text" className='text-input' placeholder='Enter event title here...' value={this.state.title} onChange={e => this.onChangeData(e, 'title')}/>
          </label>

          <label className='input-wrp'><span className='label'>Image: </span> 
            <div className='img-uploader'><PhotoIcon/></div>
          </label>

          <label className='input-wrp'><span className='label'>Details: </span> 
            <textarea value={this.state.description} className='text-input' placeholder='Add more info here...' onChange={e => this.onChangeData(e, 'description')}></textarea>
          </label>
          
          <div className='input-wrp'>
            <span className='label'>Time: </span> 
            <div className='time-picker'>
            <DatePicker
              selected={this.state.dateRange.startDate}
              selectsStart
              startDate={this.state.dateRange.startDate}
              endDate={this.state.dateRange.endDate}
              onChange={(date) => this.onChangeDate({ startDate: date })}
              minDate={new Date()}
              maxDate={this.state.dateRange.endDate}
              showDisabledMonthNavigation
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <DatePicker
              selected={this.state.dateRange.endDate}
              selectsEnd
              startDate={this.state.dateRange.startDate}
              endDate={this.state.dateRange.endDate}
              onChange={(date) => this.onChangeDate({ endDate: date })}
              minDate={this.state.dateRange.startDate || new Date()}
              showDisabledMonthNavigation
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            </div>
          </div>
          
          <div className='input-wrp'>
            <span className='label'>Location: </span> 
            <MapWithASearchBox 
              onLocationChanged={this.onLocationChanged} 
              defaultMarkerPosition={this.state.location}
            />
          </div>
          
          <div className='input-wrp'>
            <span className='label'>Privacy: </span> 
            <div className='privacy'>
              <div
                className={this.state.isDropDownOpen ? "dropdown active" : "dropdown"}
                onClick={this.onToggleDropDown} 
              >
                <div className="dropdown__text">
                  { DROPDOWN_LABEL }
                </div>
                <div className="dropdown__items">
                  <div onClick={() => this.onChangePrivacy(false)} className="dropdown__item">
                    Public
                  </div>
                  <div onClick={() => this.onChangePrivacy(true)} className="dropdown__item">
                    Private
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className='footer'>
          <button className='cancel-btn' onClick={this.onCancel} type='button'>Cancel</button>
          <button className='save-btn' onClick={this.onSave} type='button'>Save</button>
        </div>
        
      </div>
    );
  }  
}

export default UserEventsEditor;
