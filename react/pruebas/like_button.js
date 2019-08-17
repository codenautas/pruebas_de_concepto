'use strict';

const e = React.createElement;
const useState = React.useState;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

function LikeButtonFun(){
    const [liked, setLiked] = useState(false);
    if(liked){
        return 'Liked!';
    }
    return e('button', {onClick: () => setLiked(true)}, 'Like!');
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);

const domContainer2 = document.querySelector('#like_button_container_fun');
ReactDOM.render(e(LikeButtonFun), domContainer2);