import React, { Component } from 'react';
import { Button, Layout,InputNumber,Select,Radio,Row, Col,Form,Upload, Icon} from 'antd'; 
import Board from '../components/chess-board/Board'
import '../styles/CreateGameBoard.less'
import RuleBoard from '../components/chess-board/RuleBoard'

const {Sider, Content} = Layout;

const Option = Select.Option;
const pieceData = ["kaku", "ou","hi",,"fu"];

class CreateBoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        boardname:'',
        ChessBoard:'',
        row: 5,
        col: 5,
        piece: "kaku",
        player: "a",
        alive: true,
        pieceType: "default",
        fileList: [],
        initialChessBoard:[
          {row: 1, col: 1, chess: "hi", player: "b", alive: true},
          {row: 1, col: 2, chess: "ou", player: "b", alive: true},
          {row: 1, col: 3, chess: "kaku", player: "b", alive: true},
          {row: 2, col: 2, chess: "fu", player: "b", alive: true},
          {row: 3, col: 2, chess: "fu", player: "a", alive: true},
          {row: 4, col: 1, chess: "hi", player: "a", alive: true},
          {row: 4, col: 2, chess: "ou", player: "a", alive: true},
          {row: 4, col: 3, chess: "kaku", player: "a", alive: true},
        ]
      }
    this.handleColChange = this.handleColChange.bind(this)
    this.handleRowChange = this.handleRowChange.bind(this)
  }

  handleUploadChange = ({file, fileList}) => {
    this.setState({ fileList })
  }

  handlePieceTypeChange = (e) => {
    this.setState({
      pieceType : e.target.value
    })
  }
  
  handleColChange(value){
    this.setState({col: value});
    console.log(this.state.row, this.state.col)
  }
  
  handleRowChange(value){
    this.setState({row: value});
  }

  handlePlayerChange = (value) => {
      this.setState({
        player: value,
      });
    }

  handlePieceChange = (value) => {
      this.setState({
        piece: value,
      });
    }

  addPiece=()=>{
    if(this.state.pieceType === "default"){
      let temBoard = this.state.initialChessBoard;
      temBoard.push({
        row: 1, 
        col: 1, 
        chess: this.state.piece, 
        player: this.state.player, 
        alive: true
      });
      this.setState({
        initialChessBoard:temBoard
      })
    } else {
      
    }
  }

  sendBoard=(board)=>{
    //do nothing
  }
  
  
  render() {

    const FormItem = Form.Item

    const pieceImgStyle = {
        backgroundColor: this.state.player === 'a' ? '#007fe14d' : '#1ee1004d',
        transform: this.state.player === 'b' ? 'scaleY(-1)' : 'none',
        width: '120px'
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      style:{
        marginBottom: 0
      }
    };

    const uploadProps = {
      listType: "picture-card",
      fileList: this.state.fileList,
      showUploadList: "false",
      action: 'http://jsonplaceholder.typicode.com/posts//',
      onChange: this.handleUploadChange
    };

    const {row, col, fileList} = this.state
    return (
        <Layout>
          <Content> 
            <Board rowCount={row} colCount={col} turn={'both'} chessBoard={this.state.initialChessBoard} sendBoard={() => this.sendBoard()}/>
            <RuleBoard/>
          </Content>
          <Sider width="250" styleName="sider" theme="light">
            <Row>
              <Col>
                <FormItem
                  {...formItemLayout}
                  label="Columns"
                >
                  <InputNumber size="small" min={1} max={15} style={{width: 120}} defaultValue={this.state.col} onChange={this.handleColChange} />
                </FormItem>
              </Col>
              <Col>
                <FormItem
                  {...formItemLayout}
                  label="Rows"
                >
                  <InputNumber size="small" min={1} max={15} style={{width: 120}} defaultValue={this.state.row} onChange={this.handleRowChange} />
                </FormItem>
              </Col>
            </Row>

            <FormItem
              {...formItemLayout}
              label="Player"
            >
              <Select defaultValue="a" size="small" style={{width: 120}} onChange={this.handlePlayerChange}>
                <Option value="a">A</Option>
                <Option value="b">B</Option>
              </Select> 
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Piece"
            >
              <Radio.Group size="small" defaultValue="default" onChange={(e) => this.handlePieceTypeChange(e)} buttonStyle="solid">
                <Radio.Button value="default">Default</Radio.Button>  
                <Radio.Button value="upload">Upload</Radio.Button>
              </Radio.Group>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Choose it"
            >
              {this.state.pieceType === "default" ?
              [<Select
                size="small"
                defaultValue={pieceData[0]}
                style={{ width: 120 }}  
                onChange={this.handlePieceChange}
              >
                {pieceData.map(piece => <Option key={piece}>{piece}</Option>)}
              </Select>,
              <img src={`assets/catchthelion/${this.state.piece}.png`} style={pieceImgStyle}/>]
              :
              <Upload {...uploadProps} >
                {fileList.length >= 2 ? null :
                <Button size="small">
                  <Icon type="upload" /> Upload
                </Button>
                }
              </Upload>
              }
            </FormItem>
            <FormItem
              wrapperCol={{ span: 12, offset: 8 }}
            >
            <Button onClick={this.addPiece} size="small" type="primary">Add Piece</Button>
            </FormItem>
          </Sider>
        </Layout>
        
    );
  }
}
export default CreateBoardPage;