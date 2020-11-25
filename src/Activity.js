import React from 'react';
import Card from 'react-bootstrap/Card';
import './style.css';
import Button from 'react-bootstrap/Button'

/**
 * This component deals with displaying each activity, as well as handling the click of the
 * Add button on each activity
 */
class Activity extends  React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * This function is triggered when the add button is clicked, and it calls a function
     * within DisplayList, that calls a function within FilteredList to add the given activity
     * to the list of planned activities
     */
    onClickAdd = (item) => {
        this.props.callFilteredListAddToPlannedActivities(item);
    }

    render() {
        return (
            <Card style={{ maxWidth: '18rem' }}>
                <Card.Img className="img-wrapper" variant="top" src={this.props.activity.image} />
                <Card.Body>
                    <Card.Title>{this.props.activity.name}</Card.Title>
                    <div className="d-flex flex-column justify-content-around align-content-center">
                        <p>Energy Level Required: {this.props.activity.energy_level}</p>
                        <p>Duration: {this.props.activity.duration}hrs</p>
                        <p>Anticipated Amount of Fun: {this.props.activity.amount_of_fun}</p>
                    <div className="d-flex justify-content-sm-center align-content-end">
                        <Button className="cartButton btn-wd" variant="outline-primary" onClick={() => this.onClickAdd(this.props.activity)} block>Add</Button>
                    </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }

}

export default Activity;