import React from 'react';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DisplayList from './DisplayList';
import AggregateDisplay from './AggregateDisplay'

/**
 * FilteredList displays the list of items, as well as allows for sorting,
 * and filtering. It also deals with the aggregating of the total amount of
 * time it takes to do all the activites added to the schedule.
 */
class FilteredList extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //track the current filter/sort state of the dropdown menus
          selected_energy_level:"Any",
          selected_sort: "None",
          selected_fun_level: "Any",
          /**list of all activities added to the schedule. holds activites in the
          form of [activity, quantity] where activity is the dictionary that specifies the
          details of an activity, and quantity is the number of times this activity
           was added to the schedule**/
          planned_activities: []
        };
    };

    /**
     *
     * The following three functions are called when the dropdown
     * menu is clicked, and they set the corresponding state of the
     * dropdown menu
     */
    onSelectEnergyLevel = event => {
        this.setState({
            selected_energy_level: event
        })
    };
    onSelectSort = event => {
        this.setState({
            selected_sort: event
        })
    };
    onSelectFunLevel = event => {
        this.setState({
            selected_fun_level: event
        })
    };


    /**
     * The following two functions take in an item, and determine
     * if that item is included in the selected filter. The first
     * function looks at the energy level filter, while the
     * second looks at the fun level filter.
     */
    matchesFilterEnergyLevel = item => {
        // all items should be shown when no filter is selected
        if(this.state.selected_energy_level === "Any") {
            return true
        }
        //otherwise check if filter === current item's corresponding property
        else if (this.state.selected_energy_level === item.energy_level) {
            return true
        }
        else {
            return false
        }
    };

    matchesFilterFunLevel = item => {
        // all items should be shown when no filter is selected
        if(this.state.selected_fun_level === "Any") {
            return true
        }
        //otherwise check if filter === current item's corresponding property
        else if (this.state.selected_fun_level === item.amount_of_fun) {
            return true
        } else {
            return false
        }
    };

    /**
     * This function is called when the sort dropdown is clicked, and it
     * returns the sort function that would sort the list according to
     * whatever sort dropdown option is selected. The output of this function
     * is passed into the sort function.
     */
    getSortFunction() {
        var low_to_high = function (a, b) {return a.duration - b.duration};
        var  high_to_low = function (a, b) {return b.duration - a.duration};
        if(this.state.selected_sort === 'High To Low'){
            return high_to_low
        }
        else if(this.state.selected_sort === 'Low To High'){
            return low_to_high
        }
        else {
            return null
        }
    }

    /**
     * This function applies the above filter and sort functions
     * to each item of the list, and returns a list
     * that meets the filter and sort requirements specified in the
     * dropdowns
     */
    applyFiltersAndSorts() {
        var list = this.props.list.filter(this.matchesFilterEnergyLevel);
        list = list.filter(this.matchesFilterFunLevel)
        var sort_type = this.getSortFunction()
        if(sort_type != null){
            list = list.sort(sort_type)
        }
        return list

    }

    /**
     * When an activity's "add" button is clicked, or the "+" button
     * in the schedule it triggers this function which, given an activity,
     * adds this activity to the planned_activitites state. This enables
     * the user to add activities to their schedule.
     */
    addToPlannedActivities(item) {
        var new_planned_activities = this.state.planned_activities
        //iterates through the activities
        for(var i = 0; i < new_planned_activities.length; i++){
            //if the activity is already present in the planned_activities list, add
            //one to the quantity slot of planned_activities, and return
            if(new_planned_activities[i][0] === item){
                new_planned_activities[i][1] += 1;
                this.setState({
                    planned_activities: new_planned_activities
                })
                return;
            }
        }
        //if here, the activity was not already present in the planned_activities, so
        //must add it, and set its quantity (the number of times it is in the schedule) to be 1
        new_planned_activities.push([item, 1]);
        this.setState({
            planned_activities: new_planned_activities
        })
    }

    /**
     * When an activity's "-" button is clicked in the schedule
     * it triggers this function which, given an activity,
     * reduces the number of times this activity ooccurs in the planned_activitites state.
     * This enables the user to remove activities from their schedule.
     */
    removeFromPlannedActivities(item) {
        var new_planned_activities = this.state.planned_activities
        for(var i = 0; i < new_planned_activities.length; i++){
            //this item is in cart
            if(new_planned_activities[i][0] === item) {

                if (new_planned_activities[i][1] > 1) {
                    new_planned_activities[i][1] -= 1;
                }
                //this item is in the cart and we want to remove it
                else if (new_planned_activities[i][1] === 1) {
                    new_planned_activities.splice(i, 1);
                }
                this.setState({
                    planned_activities: new_planned_activities
                })
                return;
            }
        }
    }

    render() {
        return (
            <div className="d-flex flex-row justify-content-start">
                <div>
                    <div className="d-flex flex-row justify-content-start dropdown-container">

                        {/*This is the filter box, it contains all the filter dropdowns*/}
                        <div className="d-flex flex-column filter-box">
                            <h5 className="text-center">Filter</h5>
                            <p className="text-left">Too many options to choose? No problem, filter!</p>

                            {/*Filter Dropdown for how much energy the activity requires */}
                            <div className="d-inline-flex flex-column justify-content-start">
                                <div className="text-left filter-header">Amount of Energy Activity Requires:</div>
                                    <DropdownButton className="dropdown" id="dropdown-basic-button" title={this.state.selected_energy_level} onSelect={this.onSelectEnergyLevel}>
                                        <Dropdown.Item eventKey='Any'>Any</Dropdown.Item>
                                        <Dropdown.Item eventKey='High'>High</Dropdown.Item>
                                        <Dropdown.Item eventKey='Medium'>Medium</Dropdown.Item>
                                        <Dropdown.Item eventKey='Low'>Low</Dropdown.Item>
                                    </DropdownButton>
                            </div>

                            {/*Filter Dropdown for how much fun the activity is likely to be */}
                            <div className="d-inline-flex flex-column justify-content-start">
                                <div className="text-left filter-header">How Fun Activity is Expected to be:</div>
                                    <DropdownButton id="dropdown-basic-button" title={this.state.selected_fun_level} onSelect={this.onSelectFunLevel}>
                                        <Dropdown.Item eventKey='Any'>Any</Dropdown.Item>
                                        <Dropdown.Item eventKey='High'>Super Fun</Dropdown.Item>
                                        <Dropdown.Item eventKey='Medium'>Eh, Kinda Fun</Dropdown.Item>
                                        <Dropdown.Item eventKey='Low'>Very unfun</Dropdown.Item>
                                    </DropdownButton>
                            </div>
                        </div>

                        {/*This is the sort box, it contains all the filter dropdowns */}
                        <div className="d-flex flex-column sort-box">
                            <h5 className="text-center">Sort</h5>
                            <p className="text-left">Want to find the longest possible activity, sort by activity duration!</p>
                            <div className="text-left filter-header">Sort by Activity's (Expected) Duration:</div>
                            <DropdownButton id="dropdown-basic-button" title={this.state.selected_sort} onSelect={this.onSelectSort}>
                                <Dropdown.Item eventKey='None'>Any</Dropdown.Item>
                                <Dropdown.Item eventKey='High To Low'>High To Low</Dropdown.Item>
                                <Dropdown.Item eventKey='Low To High'>Low To High</Dropdown.Item>
                            </DropdownButton>
                        </div>

                    </div>

                    <h5 className="text-center">Add Activities to your "Day In Quarantine" Schedule</h5>

                    {/*This component displays the list of sorted, filtered, activities */}
                    <DisplayList
                        list={this.applyFiltersAndSorts()}
                        addToPlannedActivities={this.addToPlannedActivities.bind(this)}>
                    </DisplayList>
                </div>

                {/*This component deals with aggregating all the added activities together and displaying them*/}
                <AggregateDisplay planned_activities={this.state.planned_activities}
                                  removeFromPlannedActivities={this.removeFromPlannedActivities.bind(this)}
                                  addToPlannedActivities={this.addToPlannedActivities.bind(this)}></AggregateDisplay>
            </div>
        )
    }
}

export default FilteredList;