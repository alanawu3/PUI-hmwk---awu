import React, { useState } from 'react';
import Slider from './slider';
import './index.css'
import Shape from './Shape';
import Emoji from 'a11y-react-emoji'; //emoji component: https://www.npmjs.com/package/a11y-react-emoji

function App() {
  const [journalPage, setJournalPage] = useState(false)
  const [journalData, setJournalData] = useState([])

  //emotions on a scale 0 - 100
  const [happy, setHappy] = useState(0);
  const [sad, setSad] = useState(0);
  const [excited, setExcited] = useState(0);
  const [tired, setTired] = useState(0);
  const [angry, setAngry] = useState(0);
  const [calm, setCalm] = useState(1);
  const [anxious, setAnxious] = useState(1);

  const [desolate, setDesolate] = useState(false);
  const [wonder, setWonder] = useState(false);
  const [hyper, setHyper] = useState(false);
  const [asleep, setAsleep] = useState(false); //clouds move in? dreamy? stars, thoughts
  const [rage, setRage] = useState(false);
  const [peace, setPeace] = useState(false);

  const pageStyle = {
    display: 'flex',
    backgroundColor: 'black',
    //border: '3px solid blue',
    height: window.innerHeight,
  }

  const sidebarStyle = {
      width: '25%',
      margin: '3%',
      padding: '2% 0.5% 0% 1%',
      height: window.innerHeight*.9,
      border: '3px solid white',
      borderRadius: '30px',
      textAlign: 'center',
      zIndex: '5'
  }

  const canvasStyle = {
    width: '100%',
    position: 'absolute',
    height: window.innerHeight,
    // border: '3px solid red'
}

  const sliderStyle = {
    margin: '6px 5px 35px 5px',
    // border: '3px dashed blue',
    display: 'flex'
}

  const emojiStyle = {
    border: '2px solid white',
    borderRadius: '5px',
    padding: '3px 5px 0px 5px'
  }

  const selEmojiStyle = {
    border: '2px solid white',
    background: '#fea8d1',
    borderRadius: '5px',
    padding: '3px 5px 0px 5px'
  }

  const btnStyle = {
    position: 'relative',
    padding: '12px 15px 12px 15px',
    //borderRadius: '10px',
    zIndex: '5',
    color: 'white',
    backgroundColor: '#6e1047',
    fontSize: '17px'
  }

  return (
    <div style={pageStyle}>
      <div style={sidebarStyle}>
        <h3>happy</h3>
        <div style={sliderStyle}>
          <Slider value={happy} setValue={setHappy} />
          <div style = {wonder ? selEmojiStyle : emojiStyle}>
            <Emoji style={{fontSize: '25px'}} onClick = {() => setWonder(!wonder)} symbol="🤩" label="wonder" />
          </div>
        </div>
        <h3>sad</h3>
        <div style={sliderStyle}>
          <Slider value={sad} setValue={setSad}/>
          <div style = {desolate ? selEmojiStyle : emojiStyle}>
            <Emoji style={{fontSize: '25px'}} onClick = {() => setDesolate(!desolate)} symbol="😭" label="desolate" /></div>
          </div>
        <h3>excited</h3>
        <div style={sliderStyle}>
          <Slider value={excited} setValue={setExcited}/>
          <div style={hyper ? selEmojiStyle : emojiStyle}>
            <Emoji style={{fontSize: '25px'}} onClick = {() => setHyper(!hyper)} symbol="🤪" label="hyper" /></div>
          </div>
        <h3>tired</h3>
        <div style={sliderStyle}>
          <Slider value={tired} setValue={setTired}/>
          <div style={asleep ? selEmojiStyle : emojiStyle}>
          <Emoji style={{fontSize: '25px'}} onClick = {() => setAsleep(!asleep)} symbol="😴" label="asleep" /></div>
        </div>
        <h3>angry</h3>
        <div style={sliderStyle}>
          <Slider value={angry} setValue={setAngry}/>
          <div style={rage ? selEmojiStyle : emojiStyle}>
            <Emoji style={{fontSize: '25px'}} onClick = {() => setRage(!rage)} symbol="🤬" label="rage" /></div>
        </div>
        <h3>calm</h3>
        <div style={sliderStyle}>
          <Slider value={calm} setValue={setCalm}/>
          <div style={peace ? selEmojiStyle : emojiStyle}>
            <Emoji style={{fontSize: '25px'}} onClick = {() => setPeace(!peace)} symbol="🫠" label="peace" /></div>
        </div>
        <button style={btnStyle}>SAVE EMOTION STATE</button>
      </div>
      <div style={canvasStyle}>
        <Shape happy={happy} sad={sad} desolate={desolate} excited={excited} tired={tired} angry={angry}
        calm={calm} anxious={anxious} wonder={wonder}
        hyper={hyper} asleep={asleep} rage={rage}/>
      </div>
    </div>
);
}

export default App;