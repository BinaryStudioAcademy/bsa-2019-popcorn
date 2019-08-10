import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './UserEventsEditor.scss';
import MapWithASearchBox from '../EventMap/EventMapSearch';

interface IUserEventsEditorProps {
  id?: string,
}

interface IUserEventsEditorState {
  title: string,
  description: string,
  location: string,
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
      location: '',
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
    this.onToggleDropDown = this.onToggleDropDown.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      // fetch event by id
      this.setState({
        ...this.state,
        title: 'Test Event',
        description: 'This event is created only for testing',
        location: 'Kyiv, Independence Square',
        dateRange: {
          startDate: new Date(2019, 11, 12),
          endDate: new Date(2019, 11, 13)
        },
        isPrivate: true
      });
    }
  }

  onChangeData(e: any, keyword: string) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    this.setState({
        ...this.state,
        [keyword]: value
    });
  }

  onChangeDate(newDate) {
    console.log(newDate);
    this.setState({
        ...this.state,
        dateRange: {
          ...this.state.dateRange,
          ...newDate
        }
    });
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
      this.state.location.trim() === '' 
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
      location: '',
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

          <label>Title: 
            <input type="text" className='text-input' value={this.state.title} onChange={e => this.onChangeData(e, 'title')}/>
          </label>
          
          <label>Location: 
            <input type="text" className='text-input' value={this.state.location} onChange={e => this.onChangeData(e, 'location')}/>
          </label>
          <MapWithASearchBox/>

          <div>
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
                minDate={this.state.dateRange.startDate}
                showDisabledMonthNavigation
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <label>Description: 
            <textarea value={this.state.description} className='text-input' onChange={e => this.onChangeData(e, 'description')}></textarea>
          </label>

          <div
            className={this.state.isDropDownOpen ? "dropdown active" : "dropdown"}
            onClick={this.onToggleDropDown} >
            <div className="dropdown__text">
              { DROPDOWN_LABEL }
            </div>
            <div className="dropdown__items">
              <div onClick={() => this.onChangePrivacy(false)} className="dropdown__item">
                Public (All authorized users can see and participate)
              </div>
              <div onClick={() => this.onChangePrivacy(true)} className="dropdown__item">
                Private (by invitation only)
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.onCancel} type='button'>Cancel</button>
        <button onClick={this.onSave} type='button'>Save</button>
      </div>
    );
  }  
}

export default UserEventsEditor;
