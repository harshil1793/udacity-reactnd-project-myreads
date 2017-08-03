import React, { Component } from 'react';

class ShelfChanger extends Component{
    state = {
      updating: false
    };

    triggerShelfChange(e){
        this.setState({ updating: true });
        this.props.changeShelf(this.props.book, e.target.value);
    }

    render(){
        const { shelf } = this.props.book;
        return(
            <div className="book-shelf-changer">
                <select value={shelf} onChange={this.triggerShelfChange.bind(this)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                {this.state.updating && (<div className="cssload-spin-box"/>)}
            </div>
        )
    }
}

export default ShelfChanger;