import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function PeopleList(props) {

  const id = props.people.url.split('/')

  return (
    <Link to={{
      pathname: "/detail/" + id[5]
    }}>
      <div className="people-list">
        <p> {props.people.name} </p>
      </div>
    </Link>  
  )
}
