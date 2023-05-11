import React, { useContext, useEffect, useState } from 'react';
import { BookItemContainer, BooksContainer, FiltersContainer, HomePage, HomePageBackground, Nav } from './LibraryStyles';
import { BookComponent, InfoModal, MaterialUISwitch } from './LibraryComponents';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThemeContext } from '../contexts/ThemeContext'
import InfoIcon from '@mui/icons-material/Info';
import { Button, TextField } from '@mui/material';

export const Homepage = () => {

    const [titleFilter, setTitleFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [pageFilter, setPageFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const [infoModalOpen, setIsInfoModalOpen] = useState(true);

    const { theme, toggleTheme } = useContext(ThemeContext);

    const [page, setPage] = useState(1);
    const [booksData, setBooksData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loadingText, setLoadingText] = useState("Loading...");

    const handleTitleFilterChange = (event) => {
        setTitleFilter(event.target.value.toLowerCase());
    };

    const handleAuthorFilterChange = (event) => {
        setAuthorFilter(event.target.value.toLowerCase());
    };

    const handlePageFilterChange = (event) => {
        setPageFilter(event.target.value.toLowerCase());
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value.toLowerCase());
    };

    async function setInitialData() {
        const response = await axios.get(`https://library-server-dukooagnq-harsh-wadhwa.vercel.app/books?page=${page}&pageSize=10&title=${titleFilter}&author=${authorFilter}&publishYear=${dateFilter}&minPages=${pageFilter}`);
        setBooksData(response?.data);
    }

    async function fetchData() {
        setPage(prev => prev + 1)
        const response = await axios.get(`https://library-server-dukooagnq-harsh-wadhwa.vercel.app/books?page=${page}&pageSize=10&title=${titleFilter}&author=${authorFilter}&publishYear=${dateFilter}&minPages=${pageFilter}`);
        if (response?.data?.length === 0) {
            setHasMore(false);
            setLoadingText("");
        }
        setBooksData([...booksData, ...response?.data]);
    }

    useEffect(() => {
        setInitialData();
    }, [])

    return (
        <HomePageBackground>

            <HomePage theme={theme}>

                <div>

                    <Nav theme={theme}>
                        The Library
                        <InfoIcon style={{ position: 'absolute', top: '15px', right: '100px' }} onClick={() => setIsInfoModalOpen(true)} />
                        <MaterialUISwitch checked={theme === 'dark'} onChange={toggleTheme} />
                    </Nav>

                    <BooksContainer id="scrollableDiv">

                        <InfiniteScroll
                            dataLength={booksData?.length} //This is important field to render the next data
                            next={fetchData}
                            hasMore={true}
                            loader={<h4>{loadingText}</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                            scrollableTarget={"scrollableDiv"}
                            style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}
                        >

                            {booksData?.map((book, index) => (
                                <BookComponent key={index} data={book} />
                            ))}

                        </InfiniteScroll>

                    </BooksContainer>


                    <FiltersContainer theme={theme}>
                        <h2>Filters</h2>

                        <TextField
                            id="outlined-disabled"
                            label="Title"
                            value={titleFilter}
                            onChange={handleTitleFilterChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Author"
                            value={authorFilter}
                            onChange={handleAuthorFilterChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Min Pages"
                            value={pageFilter}
                            onChange={handlePageFilterChange}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Year"
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                        />
                        <Button variant="contained" onClick={()=>{setPage(1); setInitialData();}} >Apply</Button>
                    </FiltersContainer>

                    <InfoModal open={infoModalOpen} toggle={() => setIsInfoModalOpen(prev => !prev)} />

                </div>

            </HomePage>


        </HomePageBackground>
    )
}