import React from 'react';
import './UserEventsEditor.scss';

interface IUserEventsEditorProps {
  id?: string,
  history: any;
}

interface IUserEventsEditorState {
  title: string,
  description: string,
  location: string,
  date: Date,
  isPrivate: boolean
}

class UserEventsEditor extends React.Component<IUserEventsEditorProps, IUserEventsEditorState> {
  constructor(props: IUserEventsEditorProps) {
    super(props);
    this.state = {
      title: '',
      description: '',
      location: '',
      date: new Date(),
      isPrivate: false
    };
  }

  componentDidMount() {
    if (this.props.id) {
      // fetch event by id
      this.setState({
        ...this.state,
        title: 'Test Event',
        description: 'This event is created only for testing',
        location: 'Kyiv, Independence Square',
        date: new Date(),
        isPrivate: false
      });
    }
  }

  onChangeData(e: React.FormEvent<HTMLInputElement>, keyword: string) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    this.setState({
        ...this.state,
        [keyword]: value
    });
  }

  render()  {
    return (
      <div className='event-editor'>
        <button onClick={() => this.props.history.push('/user-page/events/')}>Back</button>

        <input type="text" value={this.state.title} onChange={e => this.onChangeData(e, 'title')}/>
        <input type="text" value={this.state.description} onChange={e => this.onChangeData(e, 'description')}/>
        <button type='button'>Save</button>
      </div>
    );
  }
    
}

export default UserEventsEditor;