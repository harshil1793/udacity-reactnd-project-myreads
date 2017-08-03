import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import './App.css'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        currentlyReading: [],
        wantToRead: [],
        read: []
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks(){
        BooksAPI.getAll().then((books) => {
            this.setState({
                currentlyReading: books.filter((b) => b.shelf === 'currentlyReading'),
                wantToRead: books.filter((b) => b.shelf === 'wantToRead'),
                read: books.filter((b) => b.shelf === 'read'),
            });
        });
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then((res) => {
            this.fetchBooks();
        });
    };


    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                            <div className="search-books-input-wrapper">
                                {/*
                                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                  You can find these search terms here:
                                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title. Every search is limited by search terms.
                                */} <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf category="Currently Reading" books={this.state.currentlyReading} changeShelf={this.changeShelf}/>
                                <Shelf category="Want to Read" books={this.state.wantToRead} changeShelf={this.changeShelf}/>
                                <Shelf category="Read" books={this.state.read} changeShelf={this.changeShelf}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
