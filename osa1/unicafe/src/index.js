import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Statistic = ({text, value}) =>{
    return (
        <>
            <tr>
                <td>{text}: </td>
                <td>{value} </td>
            </tr>
        </>
    )
}


const Statistics = ({good, neutral, bad}) => {
    const total = good + bad + neutral
    const average = (good - bad) / total
    const positive = (good / total) * 100+"%"
    if(good === 0 && neutral === 0 && bad === 0){
        return (
            <p>No feedback given</p>
        )
    }else{
        return (
            <table>
                <tbody>
                    <Statistic text="good" value={good}/>
                    <Statistic text="neutral" value={neutral}/>
                    <Statistic text="bad" value={bad}/>
                    <Statistic text="all" value={total}/>
                    <Statistic text="average" value={average}/>
                    <Statistic text="positive" value={positive}/>
                </tbody>
            </table>
        )
    }
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)




const App = () => {
  // tallenna napit omaan tilaansa
  

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => setBad(bad + 1)} text="bad"/>
        <h1>Statistics</h1>
        <Statistics good={good} neutral = {neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)