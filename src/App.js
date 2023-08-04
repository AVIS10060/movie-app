import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components'
import './index.css'
import Card from './Card'
import { useState } from 'react';
import MovieInfoComponent from './MovieInfoComponent';

const Placeholder = styled.img`
`


export const API_KEY = "f2cad9ed"
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`
const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color: white;
`;
const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;
const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`;
const SearchInput = styled.input`
color: black;
font-size: 16px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const Title = styled.div`
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;




function App() {
  const [search,updateSearch] = useState("")
  const [movieList,updateMovieList]= useState([])
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId,updateTimeoutId] = useState()


  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    onMovieSelect("")
    clearTimeout(timeoutId)
    updateSearch(event.target.value)
    const timeout = setTimeout(() => fetchData(event.target.value),500)
    updateTimeoutId(timeout)
  }
  return (

    <>
    
    <Header>
     
      <Title> 
      <SearchIcon   src = "\icons\movie-icon.svg" alt = "eror"></SearchIcon> React Movie Search</Title>
      <SearchBox>
          <SearchIcon src="\icons\search-icon.svg" alt = "eror" />
          <SearchInput
            placeholder="Search Movie"
            onChange={onTextChange}
            value = {search}
          />
        </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <CardContainer>
        {movieList?.length ?(
          movieList.map((movie, index) => (
            <Card
              key = {index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          "no movies"
        )}
      </CardContainer>

  
    </>
   
  );
}

export default App;
