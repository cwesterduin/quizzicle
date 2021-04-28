import icon1 from '../../images/player-1.png';
import icon2 from '../../images/player-2.png';
import icon3 from '../../images/player-3.png';
import icon4 from '../../images/player-4.png';
import icon5 from '../../images/player-5.png';
import icon6 from '../../images/player-6.png';
import icon7 from '../../images/player-7.png';
import icon8 from '../../images/player-8.png';
import icon9 from '../../images/player-9.png';
import icon10 from '../../images/player-10.png';

import React, { useState, useEffect } from'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import { PlayerCard, Options } from '../../components'
import { getAnswers, allNotReady } from '../../actions'


import { playerReady } from '../../actions'


const GameRoom = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const currentPlayers = useSelector(state => state.myReducer.players)
  const socket = useSelector(state => state.myReducer.socket)
  const questions = useSelector(state => state.myReducer.questions)
  const answers = useSelector(state => state.myReducer.answers)

  const [currentQuestion, setCurrentQuestion] = useState(0)

    useEffect(() => {
        dispatch(getAnswers(id))
    }, []);

    useEffect(() => {
      if (currentPlayers.length > 0 && currentPlayers.every(player => player.ready === true)) {
        if (currentQuestion < questions.length-1) {
          dispatch(allNotReady())
          setCurrentQuestion(q => q + 1)
        } else {
          setTimeout(axios({
            method: 'post',
            url: `http://localhost:3000/games/${id}/players/${socket.socket.id}/answers`,
            data: answers
          }), Math.random * 1000);
          setTimeout(() => history.push(`/results/${id}`),3000)
        }
      }
    },[currentPlayers])

    const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10];

    const returnIcon = () => {
      let icon = icons[Math.floor(Math.random() * icons.length)];
      return icon;
    }
  
    const readyMarker = false;
  
    const returnPlayer = currentPlayers.map((player, index) => {
        return <PlayerCard key={index} player={player.player.player}  username={player.player.username} me={false} icon={returnIcon()} ready={player.ready} />
    });
  

    return (
      <section style={{ color: "white" }} id="game-room">
        <div id="App">Room: {id}</div>
        { questions ? <>
          <p>{questions[0].category} - {currentQuestion+1}/{questions.length}</p>
         <p>{questions[currentQuestion].question}</p>
        <Options options={questions[currentQuestion].possible_answers}/>
        {returnPlayer}</> : null }
      </section>
    );

}

export default GameRoom;