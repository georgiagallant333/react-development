import React from 'react';
import FilteredList from './FilteredList';

//List Of all Activites to do in quarantine, this list will be what is filtered, sorted, and aggregated
const activity_list =  [
    {name:"Frollic", energy_level:'High', amount_of_fun:'High', duration: 1.5, image:"https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/08/640/320/iStock-801664036.jpg?ve=1&tl=1"},
    {name:"Stare Into Space", energy_level:'Low', amount_of_fun:'Low', duration: 5.5, image:"https://www.abc.net.au/radionational/image/6892040-3x2-700x467.jpg"},
    {name:"Play a BORED game", energy_level:'Medium', amount_of_fun:'Medium', duration: 2.5, image:"https://images.theconversation.com/files/138670/original/image-20160921-21723-zvi9hu.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"},
    {name:"Sleep", energy_level:'Low', amount_of_fun:'High', duration: 7.5, image:"https://www.helpguide.org/wp-content/uploads/man-in-bed-mouth-agape-768.jpg"},
    {name:"Scream on Zoom, Muted", energy_level:'Low', amount_of_fun:'Medium', duration: 1, image:"https://colourlex.com/wp-content/uploads/2020/06/Edvard-Munch-The-Scream.jpg"},
    {name:"Walk aimlessly", energy_level:'Medium', amount_of_fun:'Low', duration: 4.5, image:"https://i.ytimg.com/vi/L40whO5bKMc/maxresdefault.jpg"},
    {name:"Fall Into a YouTube hole", energy_level:'Low', amount_of_fun:'Low', duration: 6.5, image:"https://videohive.img.customer.envatousercontent.com/files/d7192c1e-0aee-4bcf-b728-47abd5c6e21c/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=edbea6334b8667411de9156070652460"},
    {name:"Stuff Your Face", energy_level: 'Medium', amount_of_fun: 'High', duration: 2.75, image:"https://media.tenor.com/images/b0f0e1487980bdddd4e7c12605941142/raw"},
    {name:"Bake Away Your Sadness", energy_level: 'Low', amount_of_fun: 'Low', duration: 3.45, image:"https://www.bestfoodfacts.org/wp-content/uploads/2018/08/BFF-baking-cookies-1146x452-824x325.png"},
    {name:"Cry", energy_level: 'Medium', amount_of_fun: 'Low', duration: 24, image:"https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/04/crying_toddler-1296x728-header.jpg?w=1155&h=1528"},
    {name:"Think About This Time Last Year", energy_level: 'High', amount_of_fun: 'Medium', duration: 1.25, image:"https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/alt-5a96d145d9fdc-4926-40d8aa188f71f4c65aa968344477bf8e@1x.jpg"},
    {name:"Scr*w Your Sleep Schedule", energy_level: 'Low', amount_of_fun: 'High', duration: 3.25, image: "https://www.nationalgeographic.com/content/dam/animals/pictures/nocturnal/01-animals-at-night-nationalgeographic_1342783.ngsversion.1546956051701.adapt.1900.1.jpg"}]

/**
 * App deals with larger app design (header, and placement of filtered list), and holds the
 * list of items which it passes to the filtered list component
 */
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="main-page-body">
                        <h3 className="text-center">Find Medicorely Fun Activities to Fill Your Days in Quarantine...</h3>
                        <FilteredList list={activity_list}/>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
