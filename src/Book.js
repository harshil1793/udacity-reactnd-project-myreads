import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';

class Book extends Component{
    render(){
        const { book } = this.props;
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <ShelfChanger book={book}  changeShelf={this.props.changeShelf}/>
                </div>
                <div className="book-title">{book.name}</div>
                <div className="book-authors">{book.authors.join(", ")}</div>
            </div>
        )
    }
}

export default Book;