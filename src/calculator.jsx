import React from 'react';
import './calculator.css';

const operators = ['+', '-', '*', '/'];

function find(str){
    let n=str.length-1;
    for(let i=n; i>=0; i--){
      if(/[+\-*\/]/.test(str[i])){
        return false;
      }
      if(str[i] == '.')
          return true;
    }
    return false;
  }
  function cleanse(str){
    let temp='';
    let flag=true;
    let n=str.length-1;
    for(let i=n; i>=0; i--){
      if(!flag){
        temp=str[i]+temp;
      }
      else{
        if(/[0-9\.]/.test(str[i])){
          temp=str[i]+temp;
          flag=false;
          }
      }
    }
    return temp;
  }
  class Calculator extends React.Component{
    constructor(props){
      super(props);
      this.state={
        inputString: ""
      }
      this.addon=this.addon.bind(this);
      this.solve=this.solve.bind(this);
      this.allclear=this.allclear.bind(this);
      this.lastClear=this.lastClear.bind(this);
    }
    addon (symbol) {
      if(symbol == '.'){
        if(this.state.inputString.length == 0){
          this.setState({
            inputString: '0.'
          });
        }
        else if(this.state.inputString[this.state.inputString.length-1] != '.' && !find(this.state.inputString)){
          if(operators.indexOf(this.state.inputString[this.state.inputString.length-1]) > -1){
            this.setState({
              inputString: this.state.inputString+'0.'
            });  
          }
          else{
            this.setState({
              inputString: this.state.inputString+'.'
            });
          }
        }
        return;
      }
      if(this.state.inputString == '0'){
        if(symbol =='0'){
          return;
        }
        if(/[1-9]/.test(symbol)){
          this.setState({
            inputString: symbol
          }); 
          return;
        }
      }
      if(/[+\-*\/]/.test(this.state.inputString[this.state.inputString.length-1]) && /[+*\/]/.test(symbol) ){
        let temp=this.state.inputString;
        temp=cleanse(temp);
        temp+=symbol;
        this.setState({
          inputString: temp
        });
        return;
      }
      this.setState({
        inputString: this.state.inputString+symbol
      }); 
    }
    solve () {
      if(this.state.inputString=="")
         return;
      this.setState({
        inputString: eval(this.state.inputString)
      });
    }
    allclear () {
      this.setState({
        inputString: ""
      });
    }
    lastClear () {
      this.setState({
        inputString: this.state.inputString.slice(0,-1)
      });
    }
    render(){
      return (
        <div className='container'>
            <div className='grid' id='calc'>
                <div className='dis' id='display'>{
                    (this.state.inputString=="")?  0:this.state.inputString}
                </div>
                <button className='allclear padButton' id='clear' onClick={this.allclear}>AC</button>
                <button className='clear padButton' id='clear' onClick={this.lastClear}>C</button>
                <button className='divide padButton operator' id='divide'onClick={() => this.addon('/')}>/</button>
                <button className='multiply padButton operator' id='multiply'onClick={() => this.addon('*')}>X</button>
                <button className='seven padButton' id='seven'onClick={() => this.addon('7')}>7</button>
                <button className='eight padButton' id='eight'onClick={() => this.addon('8')}>8</button>
                <button className='nine padButton' id='nine'onClick={() => this.addon('9')}>9</button>
                <button className='minus padButton operator' id='subtract'onClick={() => this.addon('-')}>-</button>
                <button className='four padButton' id='four'onClick={() => this.addon('4')}>4</button>
                <button className='five padButton' id='five'onClick={() => this.addon('5')}>5</button>
                <button className='six padButton' id='six'onClick={() => this.addon('6')}>6</button>
                <button className='add padButton operator' id='add'onClick={() => this.addon('+')}>+</button>
                <button className='one padButton' id='one' onClick={() => this.addon('1')}>1</button>
                <button className='two padButton' id='two'onClick={() => this.addon('2')}>2</button>
                <button className='three padButton' id='three'onClick={() => this.addon('3')}>3</button>
                <button className='equals padButton' id='equals' onClick={this.solve}>=</button>
                <button className='zero padButton' id='zero' onClick={() => this.addon('0')}>0</button>
                <button className='decimal padButton' id='decimal' onClick={() => this.addon('.')}>.</button>
            </div>
        </div>);
    }
}

// const calculator = () => {
//   return (
//     <div>calculator</div>
//   )
// }

export default Calculator