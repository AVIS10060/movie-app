import styled from 'styled-components'
import MovieInfoComponent from './MovieInfoComponent';

const CardInfo = styled.span`
display: flex;
justify-content: space-between;
`

const CardComponent = styled.div`
 display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
object-fit: cover;
height: 362px;
`;


const Card = (props)=> {
    const { Title, Year, imdbID, Type, Poster} = props.movie

    return (
        <>
        

        <CardComponent  onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
       

          <div className="" >
  <CoverImage src={Poster} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{Title}</h5>
    <CardInfo>year : {Year}
    <span> type : {Type}</span>
    </CardInfo>
  </div>
</div>
        </CardComponent>
    
    
    
        </>
    )

}
export default Card