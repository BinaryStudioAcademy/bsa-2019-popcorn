import React from "react";

interface IPostStoryEditorProps {
  id?: string,
  type: 'story' | 'post'
}

interface IPostStoryEditorState {
  image?: string,
  body: string
}

class PostStoryEditor extends React.Component<IPostStoryEditorProps, IPostStoryEditorState> {
  constructor(props: IPostStoryEditorProps) {
    super(props);
    this.state = {
      image: undefined,
      body: ''
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      switch(this.props.type) {

        case 'post':
          // fetch post by id
          this.setState({
            ...this.state,
            body: 'test post'
          });
          break;

        case 'story':
          // fetch story by id
          this.setState({
            ...this.state,
            body: 'test story'
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

  onCancel() {
    this.setState({
      ...this.state,
      image: undefined,
      body: ''
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
      <div>
        <input type='text' value={this.state.body} onChange={e => this.onChangeData(e, 'body')}/>
        <button onClick={this.onCancel}>Cancel</button>
        <button onClick={this.onSave}>Save</button>
      </div>
    );
  }
}

export default PostStoryEditor;
