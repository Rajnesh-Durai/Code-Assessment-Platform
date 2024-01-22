import React,{useState} from "react";
import kaniniLogo from '../../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const InstructionPage = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const name='csharp';

  localStorage.setItem('language_name',name);
  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }

  const navigate = useNavigate();

    function handleClick() {
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
        navigate("/assessment");
      }, 5000);   //Button disabled for 5sec
      }
  
  return (
    <>
    
      <div className="instruction-body">
        <div className="instructions">
          <div className="instruction-head">
          <div>
        <img src={kaniniLogo} alt="kanini logo" height={60} width={160}/>
        </div>
        <div>
          <h2 className="instruction-header">Instructions to Follow</h2>
          </div>
          </div>
          <ul className="instruction-list">
            <li>
            The room's lighting needs to be sufficiently bright to qualify as "daylight" quality. It is best to have lighting overhead.
            </li>
            <li>
            It is advised to have a simple white background; wall hangings are not permitted, and picture frames are OK.
            </li>
            <li>
            It is recommended that you use the latest version of Chrome or Edge for a better exam experience.
            </li>
            <li>
            It is recommended that you are at a place with strong internet connectivity.
            </li>
            <li>
            Prior to the start of the test, make sure the device you are using is completely charged.
            </li>
            <li>You should keep your webcam turned on during the test..</li>
            <li>
            As you need time to yourself to complete your tests, kindly ask others not to enter the room where you are taking exams.
            </li>
            <li>
            Turn off your cell phone and close all software on your PC.
            </li>
            <li>
            During the whole duration of the examination, you are not permitted to move around or get up from your seat.
            </li>
            <li>
            A clear desk and workspace are essential. Not even water or leftover paper.
            </li>
            <li>
            Wearing hoodies, sweatshirts, jackets, neckties, headphones or earbuds, or headgear is not recommended.
            </li>
            <li>During the test, avoid talking to anyone.</li>
            <li>
              <b>
              The following examination-related actions will be handled as cases of malpractice or unfair means.
              </b>
              <br />
              <br />
              a. Relocating away from the monitor.
              <br />
              b. Visiting other websites, opening several tabs, and sharing content on social media or with other people.
              <br />
              c. Using any other app on the device you're going to take the test.
            </li>
            <li>
            Every suspicious act will be considered a violation if it is observed. Following a predetermined amount of warnings, the system will log out of your evaluation.
            </li>
            <li>Please do not escape fullscreen, the answer will be resetted.</li>
          </ul>
          <button className={isButtonDisabled ? 'disabled-button' : 'proceed-btn'} onClick={handleClick} disabled={isButtonDisabled}>
          <span>{isButtonDisabled ? 'Processing...' : 'Proceed'}</span>
          </button>
        </div>
      </div>
      
    </>
  );
};

export default InstructionPage;
