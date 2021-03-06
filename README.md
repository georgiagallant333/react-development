# README

## Components and How They Interact:
    ### The components I use are: App, FilteredList, DisplayList, Activity, and AggregateDisplay.

    * App: deals with larger app design (header, and placement of filtered list), and holds the
     list of items which it passes to the FilteredList component
         * FilteredList: displays the list of items, as well as allows for sorting,
            and filtering. It also deals with the aggregating of the total amount of
            time it takes to do all the activities added to the schedule. It does this
            by calling DisplayList as well as AggregateDisplay
                 * DisplayList handles the displaying of each activity. It calls upon the
                Activity component to do so
                    *Activity: deals with displaying each activity, as well as handling the click of the
                    Add button on each activity
                * AggregateDisplay: handles displaying of all the aggregate informaiton which includes
                the list of selected activities, as well as the aggregate amount of time it would take
                to complete all the selected activities


 ## How data is passed:
     * App --> FilteredList:
                - passes the constant list of all activities
     * FilteredList --> DisplayList:
                - passes a paired down version of the activity list (one that is sorted and filtered)
                - a callback to the FilteredList function called addToPlannedActivities which, given an activity, adds
                that activity to the list of planned activities
     * FilteredList --> AggregateDisplay:
                - a list of all the activities that were selected (the "planned activities")
                - two callbacks to the FilteredList functions addToPlannedActivities and removeFromPlannedActivities which,
                 given an activity, add and remove from the list of planned activities
     * DisplayList --> Activity:
                - an activity from the list of paired down activities given from from the FilteredList
                - a callback to a DisplayList called callFilteredListAddToPlannedActivities which simply calls
                FilteredList's addToPlannedActivities function


## How the user triggers state changes:
    Most all of the state changes revolve around the planned_activities state. This state keeps track of the activities
    that were added, and how many times each were added (so takes the form of a 2d array where each row contains the
    activity and the number of times it was added.

    To change this state, the user can either press the add button on the given activity, or press the + and - buttons
    in the aggregate display. If the add button is pressed, this is picked up in the Activity component, which then
    calls DisplayList's callFilteredListAddToPlannedActivities function which, as its name suggests, calls FilteredList's
    addToPlannedActivities function, which either adds the activity to the list of planned_activites, and sets the number of times
    it was added to 1, or it finds the location of that activity in the planned_activites list, and increments the value representing
    the number of times it was added. If the + or - buttons are clicked, then the AggregateDisplay component is triggered, which
    calls FilteredList's addToPlannedActivities function directly which performs the exact same functionality.

    The other states I keep track of are the states of the dropdowns. These determine what filters and sorts are being used.
    The user triggers these by clicking the dropdown, which then triggers the corresponding change state function, which
    changes the state corresponding to that dropdown to the selected menu item.
