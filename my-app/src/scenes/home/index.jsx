import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPeople, fetchStarships } from '../../stores/actions'
import { Dropdown, Menu, Input } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroll-component';

import './style.css'

import PeopleList from '../../components/people-list'
import Loading from '../../components/loading'

function Home() {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (data.peoples.length === 0) {
      fetchPeoples()
      dispatch(fetchStarships())
    }    
  }, [])

  const fetchPeoples = () => {
    dispatch(fetchPeople())
  }

  const checker = () => {
    if (data.peoples.length === data.max) {
      return false
    } else {
      return true
    }
  }

  const filterPoeple = (e) => {
    console.log(e.target.textContent)
    if (e.target.textContent !== 'All People') {
      const found = data.starships.find(el => el.value === e.target.textContent)
      setFilter(found.url)
    } else {
      setFilter('')
    }
  }

  let displayedPeople = (data.peoples || [])
    .filter(people => {
      if (searchKeyword) return new RegExp(searchKeyword, 'i').test(people.name)
      return true
    })
    .filter(fillpeo => {
      if (filter) return new RegExp(filter, 'i').test(fillpeo.homeworld)
      return true
    })
  
  return (
    <div className="container-home">
      <img src="https://cdn.dribbble.com/users/979198/screenshots/3246151/starwars_death-trooper_17.jpg" alt=""/>
      <div className="header-home">
        <h1> Welcome To Star Wars </h1>
        <div className="filtering">
          <div className="filtering-">
            <p>Choose your favorite planet</p>
            <Dropdown
              placeholder='Select planet'
              selection
              options={data.starships}
              onChange={filterPoeple}
            />
          </div>
          <div className="filtering-">
            <p>What you looking for?</p>
            <Menu.Item style={{ padding: '0' }} className="searchBar">
              <Input
                icon={{ name: 'search', link: true }}
                placeholder='Search name...'
                style={{ paddingBottom: '3px' }}
                onChange={e => setSearchKeyword(e.target.value)}
              />
            </Menu.Item>
          </div>
        </div>
      </div>
      <div className="title-p">
        <h3> Peoples </h3>
        <small style={{color: 'red'}}> *scroll up scroll down for load more people </small>
      </div>
      <div>
        <InfiniteScroll
          dataLength={displayedPeople.length}
          next={fetchPeoples}
          hasMore={checker()}
          scrollThreshold="90%"
          loader={<Loading className="loading" />}
          endMessage={
            displayedPeople.length > 0 ? (
              <p className="content">
                <b>Yay! You have seen it all</b>
              </p>
            ) : ''
          }
        >
          <div className="content">
            {displayedPeople.map((people, i) => {
              return <PeopleList people={people} key={i} />
            })}
          </div>
          
          { displayedPeople.length === 0 && filter ?  (
            <div className="content">
              <h5> Oppsss... There is no life on this planet </h5>
            </div>
          ) : null}
         
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home

