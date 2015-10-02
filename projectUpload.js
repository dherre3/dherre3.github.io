
var Firebase=require('firebase');
var ref=new Firebase('https://blazing-inferno-1723.firebaseio.com/Website/Projects');
project={};

/*project.Title="MUHC App4";
project.Description="MUHC Oncology multiplatform application for patients using Apache Cordova.";
project.Technologies="HTML, Javascript, NodeJS, CSS, AngularJS, Cordova, OnsenUI, Firebase, MySQL, PHP";
project.Employer="MUHC Medical Physics & McGill Computer Science";
project.Rolls={"1":"Building the applications architecture successfully protecting patient information by using Firebase as an intermediate database and a basic AES protocol for encryption.", 
			 "2":"Use of Apache Cordova to build application for Android, IOS and Web. Created functionalities using native features such as push alerts, notifications, local and device storage, native calendar and Geo-location to implement the user notifications, data storage, appointment schedule and check-in respectively.",
			"3":"Implemented backend daemon in NodeJS and initially PHP, built as server type listener connected to Firebase in order to upload the information from a MySQL server",
				"4":"Created a messaging system making a secure channel of communication between doctor and patient as document exchanging"
			};
project.Demo={link:"depdocs.com/opal"};
project.Github={link:"https://github.com/dherre3/MUHCMobileApp"};
project.Abstract={link:"https://github.com/dherre3/Hospital-Project/blob/master/qplusApp/AppAbstract.pdf"};
project.Progress="First Demo Version Out";
project.ImagePath="http://davidfherrerar.me/img/muhcapp.png";
project.Type="Web Development";*/

project.Title="MUHC Events";
project.Description="Website application for the MUHC Research Center to provide a gate for people to RSVP to events and check past events as well as past winners.";
project.Technologies="HTML, Javascript, CSS, AngularJS, Firebase";
project.Employer="MUHC Research Center";
project.Rolls={"1":"Build a responsive website that will work in any device and for any browser", "2":"Provide a form for users to RSVP to events","3":"Provide all the backend the website requires","4":
"Provide an interface where the person in charge of the events can add, remove, and edit events, and any other content"};
project.Demo={link:"davidfherrerar.me/MUHCEvents"};
project.Progress="Early Stages of Developent";
project.Github={link:"https://github.com/dherre3/MUHCEvents"};
//project.Abstract={link:"https://github.com/dherre3/Hospital-Project/blob/master/qplusApp/AppAbstract.pdf"};
project.ImagePath="http://davidfherrerar.me/img/muhcevents.png";
project.Type="Web Development";


ref.push(project);
//ref.set(null);