import React from "react";
import "./PostStoryEditor.scss";

interface IPostStoryEditorProps {
  id?: string,
  type: 'story' | 'post'
}

interface IPostStoryEditorState {
  image?: string,
  body: string,
  checkboxValue: boolean
}

class PostStoryEditor extends React.Component<IPostStoryEditorProps, IPostStoryEditorState> {
  constructor(props: IPostStoryEditorProps) {
    super(props);
    this.state = {
      image: undefined,
      body: '',
      checkboxValue: false
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      switch(this.props.type) {

        case 'post':
          // fetch post by id
          this.setState({
            ...this.state,
            body: 'test post',
            image: 'http://cdn.collider.com/wp-content/uploads/2017/02/the-avengers-group-image.jpg'
          });
          break;

        case 'story':
          // fetch story by id
          this.setState({
            ...this.state,
            body: 'test story',
            image: 'https://cdn.vox-cdn.com/thumbor/tJEzzwFxLxji_Eg8IGDAKy39_wM=/0x0:7040x3520/1200x800/filters:focal(2826x809:3952x1935)/cdn.vox-cdn.com/uploads/chorus_image/image/64683486/ST3_Production_Still_2.0.jpg'
          });
          break;
        
        default:
          break;
      }
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

  onToggleCheckbox() {
    this.setState({
      ...this.state,
      checkboxValue: !this.state.checkboxValue
    });
  }

  onCancel() {
    this.setState({
      ...this.state,
      image: undefined,
      body: '',
      checkboxValue: false
    });
    console.log('redirected');
    //redirect to main page
  }

  onSave() {
    switch(this.props.type) {

      case 'post':
        this.props.id
          ? console.log(this.state, 'post updated') //this.props.updatePost(this.props.id, this.state);
          : console.log(this.state, 'post created'); //this.props.addPost(this.state);
        break;

      case 'story':
        if (this.state.checkboxValue)
          console.log(this.state, 'post created'); //this.props.addPost(this.state);
        this.props.id
          ? console.log(this.state, 'story updated') //this.props.updateStory(this.props.id, this.state);
          : console.log(this.state, 'story created'); //this.props.addStory(this.state);
        break;
  
      default:
        break;
    }
    this.onCancel();
  }

  render() {
    return (
      <div className='edit-form'>

        { this.state.image && <img alt='poster' src={this.state.image}/> }
        {/* {image uploader} */}

        <input placeholder='Type a text here...' type='text' value={this.state.body} onChange={e => this.onChangeData(e, 'body')}/>

        <div className='footer'>
          { this.props.type === 'story' && <p className='checker'>Create post also <input type='checkbox' checked={this.state.checkboxValue} onChange={this.onToggleCheckbox}/></p> }
          <div>
            <button className='cancel-btn' onClick={this.onCancel}>Cancel</button>
            <button className='save-btn' onClick={this.onSave}>Save</button>
          </div>
        </div>

      </div>
    );
  }
}

export default PostStoryEditor;
