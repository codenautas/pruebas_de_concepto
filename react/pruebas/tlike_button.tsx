import {useState, Component} from "React";
import * as ReactDOM from "react-dom"

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return <button onClick={ () => this.setState({ liked: true }) } >Like</button>;
  }
}

function LikeButtonFun(){
    const [liked, setLiked] = useState(false);
    return <button onClick={() => setLiked(!liked)}>Like!{liked?<span>+1</span>:''}</button>;
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<LikeButton></LikeButton>, domContainer);

const domContainer2 = document.querySelector('#like_button_container_fun');
ReactDOM.render(<LikeButtonFun></LikeButtonFun>, domContainer2);