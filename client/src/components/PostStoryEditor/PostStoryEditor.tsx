import React from "react";

interface IPostStoryEditorProps {
  post_id?: string,
  story_id?: string
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
    if (this.props.post_id) {
      // fetch post by id
      this.setState({
        ...this.state,
        body: 'test post'
      });
    }
    if (this.props.story_id) {
      // fetch story by id
      this.setState({
        ...this.state,
        body: 'test story'
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

  onCancel() {
  }

  onSave() {
  }

  render() {
    return (
      <div>
        <input type='text' value={this.state.body} onChange={e => this.onChangeData(e, 'body')}/>
      </div>
    );
  }
}

export default PostStoryEditor;
