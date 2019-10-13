import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOnePeople } from '../../stores/actions'

import './style.css'

import Loading from '../../components/loading'

export default function Detail({ match }) {

  const data = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOnePeople(match.params.id))
  }, [])

  return (
    <div className="container-detail">
      <img src="https://cdn.dribbble.com/users/179241/screenshots/3209967/chris-fernandez-boba-fett-flying.gif" alt=""/>
      <div>
        { data.isPeople.name ? (
        <div className="detail-people">
          <h1> PROFILE </h1>
          <p> Name: {data.isPeople.name} </p>
          <p> Gender: {data.isPeople.gender} </p>
          <p> Height: {data.isPeople.height} cm </p>
          <p> Weight: {data.isPeople.mass} kg </p>
          <p> Skin color: {data.isPeople.skin_color} </p>
          <p> Hair color: {data.isPeople.hair_color} </p>
          <p> Eye color: {data.isPeople.eye_color} </p> 
        </div>
        ) : <Loading /> }
        
      </div>
    </div>
  )
}
