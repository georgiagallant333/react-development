import React from 'react';
import Button from "react-bootstrap/Button";

/**
 * This component handles displaying all the activites that were selected, as
 * well as the total time it would take to do all the activities
 */
class AggregateDisplay extends  React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * The following two functions are triggered when clicked the "+" or "-"
     * buttons, and they call FilteredList's function that adds or removes an activity
     * from the planned activity's list
     */
    onClickAdd = (item) => {
        this.props.addToPlannedActivities(item);
    }
    onClickRemove = (item) => {
        console.log(item)
        this.props.removeFromPlannedActivities(item);
    }

    /**
     * This function add a header for the list of planned activities, but it only
     * does so if there are any activites in the planned activites list.
     */
    getPlannedActivities() {
        //if there are activities in the planned activities list, display the header
        if(this.props.planned_activities.length > 0){
            return <div className="d-flex flex-row justify-content-between align-content-center">
                <p className="text-center" style={{marginRight: "6vw"}}>Activity</p>
                <p className="text-center">Adjust Activity Length</p>
            </div>;
        }
        else{
            return <div></div>
        }
    }

    render() {
        return (
            <div>
                <div className="schedule-container">
                    <h4 className="text-center schedule-header">Day In Quarantine Schedule</h4>
                    {this.getPlannedActivities()}
                    {this.props.planned_activities.map(item  =>
                        <div className="d-flex flex-row justify-content-between align-content-center activity-item">
                            <div className="align-middle">{item[0].name} for {item[1] * item[0].duration} hours</div>
                            <div className="d-flex flex-row">
                                <Button style={{maxHeight:"5vh"}} className="adjust-duration-button" variant="outline-primary" onClick={() => this.onClickRemove(item[0])}>-</Button>
                                <Button style={{maxHeight:"5vh"}} className="adjust-duration-button" variant="outline-primary" onClick={() => this.onClickAdd(item[0])}>+</Button>
                            </div>
                        </div>

                    )}
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <h6 className="text-center total-duration">You have selected <span style={{fontWeight: "bold"}}>{this.props.planned_activities.reduce((a, b) => a+b[0].duration*b[1], 0)}hrs</span> worth of activities</h6></div>
                        </div>
                </div>
                </div>

        )
    }

}

export default AggregateDisplay;