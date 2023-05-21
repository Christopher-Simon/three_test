import React, { useState, FormEvent } from 'react';
import "./Chat.css";

interface windinfo {
	num : number;
	title : string;
}

function Chatwind(
{
	wind,
}: {
	wind: windinfo;
}
) {
	const [toggle, setToggle] = useState<boolean>(true);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		// Prevent the browser from reloading the page
		event.preventDefault();
	
		// Read the form data
		console.log(event.target);
		// const form = event.target;
		const formData = new FormData(event.target as HTMLFormElement);
		// formData.forEach((value, property:string) => responseBody[property] = value);
        // console.log(JSON.stringify(responseBody))
		console.log(formData);
	
		// You can pass formData as a fetch body directly:
		// fetch('/some-api', { method: form.method, body: formData });
	
		// Or you can work with it as a plain object:
		// const formJson = Object.fromEntries(formData.entries());
		// console.log(formJson);
		// console.log(e.target.value);
	}

	return (
		<div className="chat-window1">
			{toggle === true && <div className="chat-window1-red" onClick={() => setToggle(false)}> {wind.title} </div>}
			{toggle === false && <div className="chat-window1-expand">
				<div className="chat-window1-title" onClick={() => setToggle(true)}>
					{wind.title}
				</div>
				<div className="chat-window1-body"> list </div>
				<div className="chat-window1-input">
					{wind.title === "Nouveau message" && 
						<form onSubmit={handleSubmit}>
						<input name="text" defaultValue="To whom?" />
						<button type="submit">Ok</button>
						</form>}
					{wind.title !== "Nouveau message" &&
						<form onSubmit={handleSubmit}>
						<input type="text" placeholder="Type a message" />
						<button type="submit">Send</button>
						</form>}
				</div>
			</div>}
		</div>
	);
}

function Chat() {

	const [toggle, setToggle] = useState<boolean>(true);
	const [wind, setWind] = useState<windinfo>({num : 0, title : ""});

	const openchat = (title : string) => {
		if (wind.num !== 0) return;
		setWind({num : 1, title : title});
		// setWind(wind);
	};

	return (
		<>
			<div />
			{toggle === true && <div className="chat-reduced" onClick={() => setToggle(false)}> My friends </div>}
			{toggle === false && <div className="chat-expanded">
				<div className="chat-header">
					<div className="chat-header-title" onClick={() => setToggle(true)}> My friends </div>
					<svg className="chat-header-icon" onClick={() => openchat("Nouveau message")}/>
				</div>
				<div className="chat-body"> list </div>
			</div>}
			{wind.num === 1 && <Chatwind wind={wind}/>}
		</>
	);
}

// 			{/* <div className="chat-list">
// 			My friends
// 			</div>
// 			<div id="chat-bubble">
// 			    <div className="chat-container">
// 			        <div className="chat-header">
// 			          <div className="user-avatar">
// 			            {/* <div className="img-container">
// 			              <img src="https://source.unsplash.com/random/35x35">
// 			            </div> */}
// 			            <div className="user-status-info">
// 			              <a href="#">John Doe</a>
// 			              <p>Active now</p>
// 			            </div>
// 			          </div>

// 			          <div className="chat-comm">
// 			            <nav>
// 			              {/* <a href="#">
// 			                <img src="./icons/call.svg">
// 			              </a> */}
// 			              {/* <a href="#">
// 			                <img src="./icons/settings.svg">
// 			              </a> */}
// 			              {/* <a href="#" onClick="openChatBubble()">
// 			                <img src="./icons/close.svg">
// 			              </a> */}
// 			            </nav>
// 			          </div>
// 			        </div>

// 			        <div className="chat-body">
// 			          <div className="sender-other">
// 			            <div className="user-avatar">
// 			              {/* <div className="img-container">
// 			                <img src="https://source.unsplash.com/random/35x35">
// 			              </div> */}
// 			              <div className="other-message">
// 			                Hi there!
// 			              </div>
// 			            </div>
// 			          </div>

// 			          <div className="sender-me">
// 			            <div className="my-message">
// 			              Hello
// 			            </div>
// 			            {/* <div className="seen-at">
// 			              <img className="check" src="./icons/check.svg"> Seen 8:00 AM
// 			            </div> */}
// 			          </div>
// 			        </div>
// 			        <div className="chat-footer">
// 			          <input type="textarea" placeholder="Type a message..."/>
// 			          <div className="chat-media">
// 			            <nav>
// 			              <a href="#">
// 			                <img className="upload" src="./icons/upload.svg" alt=""/>
// 			              </a>
// 			              {/* <a href="#">
// 			                <img className="emoji" src="./icons/emoji.svg" alt="">
// 			              </a> */}
// 			              {/* <a href="#">
// 			                <img className="game" src="./icons/game.svg" alt="">
// 			              </a> */}
// 			              {/* <a href="#">
// 			                <img className="attach" src="./icons/attach.svg" alt="">
// 			              </a> */}
// 			              {/* <a href="#">
// 			                <img className="camera" src="./icons/camera.svg" alt="">
// 			              </a> */}
// 			            </nav>
// 			            <a href="#">
// 			              <img className="like" src="./icons/like.svg"/>
// 			            </a>
// 			          </div>
// 			        </div>
// 			      </div>
// 		    </div> */}
// 		</>
// 	);
// }

export default Chat;