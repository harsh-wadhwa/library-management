import { BookItemContainer, DetailContainer, PictureContainer } from "./LibraryStyles"


export const BookComponent = (props) => {

    const { data } = props;

    return (
        <BookItemContainer>

            <PictureContainer>

            </PictureContainer>

            <DetailContainer>
                <div>{data.title}</div>
                <div>Author: {data.author}</div>
                <div>Subject: {data.subject}</div>
                <div>Publish Date: {data.publishDate}</div>
            </DetailContainer>
        </BookItemContainer>
    )

}