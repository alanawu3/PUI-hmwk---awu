import React, { useState } from 'react';
import Sketch from 'react-p5'
import Card from './Card'
import NoteShape from './NoteShape';

//journal page with saved emotion notecards & notecard animation popup
const Journal = (props) => {
    const [sketchPopup, setSketchPopup] = useState(-1) //draw sketch popup when true

    const journalBtnStyle = {
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

    const trashBtnStyle = {
        position: 'fixed',
        padding: '12px 15px 12px 15px',
        bottom: '5%',
        right: '3%',
        zIndex: '5',
        color: 'white',
        backgroundColor: 'rgb(0, 0, 100)',
        fontSize: '17px',
        borderRadius: '10px'
    }

    const journalStyle = {
        width: window.innerWidth, //still unable to set card width even with this here
        height: window.innerHeight,
        flexWrap: 'wrap',
        display: 'flex',
        padding: '50px',
        alignContent: 'start'
    }

    const popupStyle = {
        position: 'absolute',
        top: '30px',
        right: '25%',
        border: '5px solid rgb(150, 150, 150)'
    }

    const closeBtnStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '35px',
        height: '35px',
        padding: '2px 0px 0px 0px'
    }

    const titleStyle = {
        color: 'black',
        position: 'fixed'
    }

    const blockStyle = {
        width: '100%',
        height: '60px'
    }

    return (
    <div>
    {(sketchPopup != -1) ? //when popup is set to a specific note
    <div style = {journalStyle}>
        <h1 style={titleStyle}>Saved Emotions</h1>
        <div style={blockStyle}></div>
        {props.notes.map( //draws card for each saved emotion state object in notes array
            (note, indx) =>
            {
                const r = 100 + note.happy + note.excited + note.angry * 2.8 - note.sad + note.calm*.3
                const g = 100 + (note.happy + note.excited)*.7 - note.sad - note.angry + note.calm * .4
                const b = 100 - note.happy - note.excited + note.sad/3 - note.angry + note.calm*.3
                return <Card
                    indx={indx}
                    r={r}
                    g={g}
                    b={b}
                    sketchPopup={sketchPopup}
                    setSketchPopup={setSketchPopup}
                />
            })
        }
        <button style={journalBtnStyle} onClick = {() => props.setJournalPage(!props.journalPage)}>Emotion Visualizer</button>
        <div style={popupStyle}>
            <NoteShape data={props.notes[sketchPopup]}/>
            <button style={closeBtnStyle} onClick={() => setSketchPopup(-1)}>
                <img src="https://img.icons8.com/ios-filled/50/null/x.png" width='28' height='28'/>
            </button>
        </div>
    </div>
     : //if no note selected, just draw the notecards, no popup animation
    <div style = {journalStyle}>
        <h1 style={titleStyle}>Saved Emotions</h1>
        <div style={blockStyle}></div>
        {props.notes.map(
            (note, indx) =>
            {
                const r = 100 + note.happy + note.excited + note.angry * 2.8 - note.sad + note.calm*.3
                const g = 100 + (note.happy + note.excited)*.7 - note.sad - note.angry + note.calm * .4
                const b = 100 - note.happy - note.excited + note.sad/3 - note.angry + note.calm*.3
                return <Card
                    indx={indx}
                    r={r}
                    g={g}
                    b={b}
                    sketchPopup={sketchPopup}
                    setSketchPopup={setSketchPopup}
                />
            })
        }
        <button style={journalBtnStyle} onClick = {() => props.setJournalPage(!props.journalPage)}>Emotion Visualizer</button>
        <button style={trashBtnStyle} onClick = {() => props.setNotes([])}>Empty Library</button>
    </div>
    }
    </div>)
}
export default Journal;