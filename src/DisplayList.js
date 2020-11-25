import React from 'react';
import Activity from './Activity';

/**
 * This component displays the sorted and filtered list of activities
 */
class DisplayList extends  React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * This function is called by the child component, the activity, when the "Add"
     * button is clicked, it then calls on the parent component, FilteredList, to
     * add the given activity to the list of planned activities
     */
    callFilteredListAddToPlannedActivities = (item) => {
        this.props.addToPlannedActivities(item);
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row justify-content-around flex-wrap">
                    {/*Each activity is it's own component*/ }
                    {this.props.list.map(item =>
                    <Activity key={item.name}
                              activity={item}
                              callFilteredListAddToPlannedActivities={this.callFilteredListAddToPlannedActivities.bind(this)}>
                    </Activity>
                    )}
                </div>
            </div>
        )
    }

}

export default DisplayList;