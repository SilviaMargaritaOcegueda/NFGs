import React from 'react'
import Athlete from './Athlete'


function AthleteList(props) {
    return (
        <div>
             {
            props.athletes.map((data, id) => {
                if(id!==0) {
                return (
                    <div key={data.walletAddress}>
                    <hr style={{borderTop: '2px dotted black', background: '#FFFFFF'}} />
                    <Athlete athleteData={data} refreshPlayer={props.refreshPlayer}/>        
                    </div>
                )
                }
                return <Athlete key={data.walletAddress} athleteData={data} refreshPlayer={props.refreshPlayer}/>
            })}
        </div>
    )
}

export default AthleteList
