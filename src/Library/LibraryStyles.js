import styled from "styled-components";
import library_image from "../assets/images/library_image.jpg"
import Modal from 'styled-react-modal'

export const HomePageBackground = styled.div`
    height: 100vh;
    width: 100vw;
    background: url(${library_image});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const HomePage = styled.div`
    height: 95vh;
    width: 95vw;
    background: ${({theme}) => (theme === 'dark') ? '#192734' : '#FFFFFF' };
    border-radius: 15px;
    position: relative;
`

export const Nav = styled.div`
    width: 100%;
    height: 10%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: 800;
    color: ${({theme}) => (theme === 'dark') ? '#FFFFFF' : '#000' };
`


export const BooksContainer = styled.div`
    width: 70%;
    height: 80%;
    position: absolute;
    bottom: 10px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow: scroll;
    overflow-x: hidden
`

export const FiltersContainer = styled.div`
    width: 25%;
    height: 90%;    
    position: absolute;
    bottom: 0;
    right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    color: ${({theme}) => (theme === 'dark') ? '#FFFFFF' : '#000' };
`

export const BookItemContainer = styled.div`
    width: 100%;
    flex: 0 0 150px;
    background: #d7e6fc;
    border-radius: 10px;
    display: flex;
    position: relative;
`

export const PictureContainer = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DetailContainer = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`


export const StyledModal = Modal.styled`
  width: 80vw;
  height: 80vh;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`