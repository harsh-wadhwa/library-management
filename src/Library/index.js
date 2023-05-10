import React, { useState } from 'react';
import { BookItemContainer, BooksContainer, FiltersContainer, HomePage, HomePageBackground, Nav } from './LibraryStyles';
import { BookComponent } from './LibraryComponents';

const books = [
    { title: 'Book 1', author: 'Author 1', subject: 'Subject 1', publishDate: '2022-01-01' },
    { title: 'Book 2', author: 'Author 2', subject: 'Subject 2', publishDate: '2022-02-01' },
    { title: 'Book 3', author: 'Author 1', subject: 'Subject 3', publishDate: '2022-03-01' },
    { title: 'Book 1', author: 'Author 1', subject: 'Subject 1', publishDate: '2022-01-01' },
    { title: 'Book 2', author: 'Author 2', subject: 'Subject 2', publishDate: '2022-02-01' },
    { title: 'Book 3', author: 'Author 1', subject: 'Subject 3', publishDate: '2022-03-01' },
    { title: 'Book 1', author: 'Author 1', subject: 'Subject 1', publishDate: '2022-01-01' },
    { title: 'Book 2', author: 'Author 2', subject: 'Subject 2', publishDate: '2022-02-01' },
    { title: 'Book 3', author: 'Author 1', subject: 'Subject 3', publishDate: '2022-03-01' },
    { title: 'Book 1', author: 'Author 1', subject: 'Subject 1', publishDate: '2022-01-01' },
    { title: 'Book 2', author: 'Author 2', subject: 'Subject 2', publishDate: '2022-02-01' },
    { title: 'Book 3', author: 'Author 1', subject: 'Subject 3', publishDate: '2022-03-01' },
    // Add more books...
];

export const Homepage = () => {

    const [titleFilter, setTitleFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

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

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(titleFilter) &&
        book.author.toLowerCase().includes(authorFilter) &&
        book.subject.toLowerCase().includes(subjectFilter) &&
        book.publishDate.toLowerCase().includes(dateFilter)
    );

    return (
        <HomePageBackground>

            <HomePage>

                <Nav>
                    The Library
                </Nav>

                <BooksContainer>
                    {filteredBooks.map((book, index) => (
                        <BookComponent key={index} data={book} />
                    ))}
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


            </HomePage>


        </HomePageBackground>
    )
}