import React, { useEffect, useState } from 'react';
import { BookItemContainer, BooksContainer, FiltersContainer, HomePage, HomePageBackground, Nav } from './LibraryStyles';
import { BookComponent } from './LibraryComponents';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Homepage = () => {

    const [titleFilter, setTitleFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

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

    const handleSubjectFilterChange = (event) => {
        setSubjectFilter(event.target.value.toLowerCase());
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value.toLowerCase());
    };

    const filteredBooks = booksData?.filter((book) =>
        book.title?.toLowerCase()?.includes(titleFilter) &&
        book.author?.toLowerCase()?.includes(authorFilter) &&
        book.subject?.toLowerCase()?.includes(subjectFilter) &&
        book.publishDate?.toLowerCase()?.includes(dateFilter)
    );

    async function setInitialData() {
        const response = await axios.get(`https://library-server-r1ztupbxx-harsh-wadhwa.vercel.app/books?page=${page}&pageSize=10`);
        setBooksData(response?.data);
    }

    async function fetchData() {
        setPage(prev => prev+1)
        const response = await axios.get(`https://library-server-r1ztupbxx-harsh-wadhwa.vercel.app/books?page=${page}&pageSize=10`);
        if(response?.data?.length === 0) {
            setHasMore(false);
            setLoadingText("");
        }
        setBooksData([...booksData,...response?.data]);
    }

    useEffect(() => {
        setInitialData();
    }, [])

    return (
        <HomePageBackground>

            <HomePage>

                <div>

                    <Nav>
                        The Library
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
                        >

                        {booksData?.map((book, index) => (
                            <BookComponent key={index} data={book} />
                        ))}

                        </InfiniteScroll>

                    </BooksContainer>


                    <FiltersContainer>
                        <h2>Filters</h2>
                        <input
                            type="text"
                            placeholder="Filter by Title"
                            value={titleFilter}
                            onChange={handleTitleFilterChange}
                        />
                        <input
                            type="text"
                            placeholder="Filter by Author"
                            value={authorFilter}
                            onChange={handleAuthorFilterChange}
                        />
                        <input
                            type="text"
                            placeholder="Filter by Subject"
                            value={subjectFilter}
                            onChange={handleSubjectFilterChange}
                        />
                        <input
                            type="text"
                            placeholder="Filter by Publish Date"
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                        />
                    </FiltersContainer>

                </div>

            </HomePage>


        </HomePageBackground>
    )
}