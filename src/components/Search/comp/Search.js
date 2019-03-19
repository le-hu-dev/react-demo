import React, { useState, useCallback, useRef, useEffect } from "react"
import { data, itunesSearch } from "./data"
import Form from "./Form"

export default ({ name }) => (
  <>
    Hello {name}! <br />
    <BtnSelector initKey="ebook" />
    {/*<div>{JSON.stringify(data.results[0])}</div>*/}
  </>
)

const MediaType = {
  movie: "Movies",
  music: "Music",
  software: "Apps",
  ebook: "Books"
}
const prevSearches = {}
const useState1 = initKey => {
  const [skey, setKey] = useState(initKey)
  const value = useState("")
  const datas = useState([])
  const prevText = useRef("")
  let selSearches = prevSearches[skey]
  if (!selSearches)
    selSearches = prevSearches[skey] = {
      text: prevText.current,
      data: []
    }
  useEffect(
    () => {
      if (selSearches.text) value[1](selSearches.text)
    },
    [skey]
  )
  // value[1](selSearches.text)
  const onSetKey = key => {
    prevText.current = selSearches.text // = value[0]
    setKey(key)
  }
  const onSearch = term => {
    selSearches.text = term
    itunesSearch(term, skey, data => {
      datas[1]((selSearches.data = data.results))
    })
  }
  // console.log(selSearches.text)
  return [skey, onSetKey, value, selSearches, onSearch, prevText]
}
const BtnSelector = ({ initKey = "movie" }) => {
  const [skey, setKey, value, selSearches, onSubmit, ref] = useState1(initKey)
  return (
    <>
      {Object.entries(MediaType).map(([key, children]) => (
        <button
          {...{
            key,
            children,
            disabled: key == skey,
            onClick: () => setKey(key)
          }}
        />
      ))}
      <br />
      <br />
      <Form onSubmit={onSubmit} value={value} ref={selSearches}>
        {/*selSearches.text*/}
        <button>Search</button>
      </Form>
      <hr />
      {selSearches.data.map(item => (
        <Item {...item} key={item.trackId || item.collectionId} />
      ))}
    </>
  )
}

const MediaButton = ({ media }) => {
  const [value, setValue] = useState({ text: "", data: [] })
}

// const Btn =

//https://material-ui.com/demos/selection-controls/
//https://github.com/azz/styled-css-grid
import { Grid, Cell } from "styled-css-grid"
const Item = ({ artworkUrl100, artistName, collectionName, trackName }) => (
  <>
    <Grid columns={4} gap={"24"}>
      <div className="pic">
        <img
          src={artworkUrl100}
          alt=""
          style={{
            paddingRight: "1em"
          }}
        />
      </div>
      <Cell width={3}>
        <div className="sel">
          <button>Fav</button>{" "}
        </div>
        <div className="artist">{artistName}</div>
        <div className="track">{collectionName}</div>
        <div className="collection">{trackName}</div>
      </Cell>
    </Grid>
    <hr />
  </>
)
