import axios from 'axios';
import { useParams } from 'react-router-dom'
// write redux actions here
// e.g.
// export const addUser = newUser => ({ type: 'ADD_USER', payload: newUser })
export const addMessage = ( user, message ) => ({ type: 'ADD_MESSAGE', payload: {user, message} })

export const addSocket = socket => ({type: 'ADD_SOCKET', payload: socket})  

export const addPlayer = player => ({type: 'ADD_PLAYER', payload: player})  

export const playerUsername = payload => ({type: 'PLAYER_USERNAME', payload: payload})

export const playerReady = player => ({type: 'PLAYER_READY', payload: player})  

export const allNotReady = () => ({type: 'ALL_NOT_READY'})  

export const addAnswer = answer => ({type: 'ADD_ANSWER', payload: answer})


export const getAnswers = gameId => {
    return async (dispatch) => {
        try {
            const res = await fetch(`http://localhost:3000/games/${gameId}`)
            const data = await res.json()
            let newQuestions = data.questions.map(question => question)
            console.log(newQuestions)
            dispatch({
                type: 'LOAD_QUESTIONS',
                payload: newQuestions
            })
        } catch (err) {
            dispatch({
                type: 'SET_ERROR',
                payload: err
            })
        }
    }
}
