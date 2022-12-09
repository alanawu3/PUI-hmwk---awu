import React, { useState , useEffect} from 'react';
import Slider from './slider';
import Emoji from 'a11y-react-emoji'; //emoji component: https://www.npmjs.com/package/a11y-react-emoji
import './index.css'
import Shape from './Shape';
import Journal from './Journal';

function App() {
  const [journalPage, setJournalPage] = useState(false) //if true, show journal page, if false, show animation page
  const [notes, setNotes] = useState([]) //array of saved emotion state objects
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  //sliders -> emotions on a scale 0 - 100
  const [happy, setHappy] = useState(0);
  const [sad, setSad] = useState(0);
  const [excited, setExcited] = useState(0);
  const [tired, setTired] = useState(0);
  const [angry, setAngry] = useState(0);
  const [calm, setCalm] = useState(1);

  //triggered by pink buttons
  const [desolate, setDesolate] = useState(false);
  const [wonder, setWonder] = useState(false);
  const [hyper, setHyper] = useState(false);
  const [asleep, setAsleep] = useState(false);
  const [rage, setRage] = useState(false);
  const [peace, setPeace] = useState(false);

  const pageStyle = {
    display: 'flex',
    backgroundColor: 'black'
  }

  const sidebarStyle = { //container for sliders, buttons
      width: '25%',
      margin: '3%',
      padding: '2% 1% 0% 1%',
      height: window.innerHeight*.9,
      border: '3px solid white',
      borderRadius: '30px',
      textAlign: 'center',
      zIndex: '5'
  }

  const canvasStyle = { //container for animation sketch
    position: 'absolute',
    width: '100%'
}

  const sliderStyle = {
    margin: '6px 5px 35px 5px',
    display: 'flex'
}

  const emojiStyle = {
    borderRadius: '5px',
    boxShadow: '3px 3px 3px gray',
    background: 'rgb(170, 0, 100)',
    padding: '3px 5px 0px 5px',
    cursor: 'pointer'
  }

  const selEmojiStyle = { //when button is selected
    background: '#BAB8F2', 
    boxShadow: '3px 3px 3px gray',
    borderRadius: '5px',
    padding: '3px 5px 0px 5px',
    cursor: 'pointer'
  }

  const btnStyle = { //button not selected
    position: 'relative',
    padding: '12px 15px 12px 15px',
    zIndex: '5',
    color: 'white',
    backgroundColor: '#6e1047',
    fontSize: '17px',
    borderRadius: '10px'
  }

  const journalBtnStyle = { //switch to journal page
    position: 'fixed',
    padding: '12px 15px 12px 15px',
    top: '5%',
    right: '3%',
    zIndex: '5',
    color: 'white',
    backgroundColor: '#764BA8',
    fontSize: '17px',
    borderRadius: '10px'
  }

  const handleResize = () => {
    console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  // useEffect(() => {
  //   window.addEventListener('mousedown', setDimensions({
  //     height: window.innerHeight,
  //     width: window.innerWidth
  //   }))
  //   console.log(dimensions)
  // })

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  // })

  const saveEmotion = () => { //save current emotion state data into notes array
    setNotes(oldArray => [...oldArray, {
      happy: happy,
      sad: sad,
      excited: excited,
      tired: tired,
      angry: angry,
      calm: calm,
      desolate: desolate,
      wonder: wonder,
      hyper: hyper,
      asleep: asleep,
      rage: rage,
      peace: peace
    }]);
  }

  return (
  <div>
    {journalPage ? <Journal journalPage={journalPage} setJournalPage={setJournalPage}
    notes={notes} setNotes={setNotes}/> :

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
        <button style={btnStyle} onClick={() => saveEmotion()}>Save Emotion State</button>
        <p style={{marginTop: '10px'}}>States Saved: {notes.length}</p>
      </div>
      <button style={journalBtnStyle} onClick = {() => setJournalPage(!journalPage)}>Emotion Journal</button>
      <div style={canvasStyle}>
        <Shape happy={happy} sad={sad} desolate={desolate} excited={excited} tired={tired} angry={angry}
        calm={calm} wonder={wonder}
        hyper={hyper} asleep={asleep} rage={rage} peace={peace}/>
      </div>
    </div>
  }
  </div> 
  );
}

export default App;