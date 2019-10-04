import React from 'react';
import {Link} from 'react-router-dom';

const App = (props) => {
  return (
    <div id="app">
      <section id="app_container_top">
        <div id="navbar_container">
          <div id="navbar">
            <span id="nav_buttons">
              <img src={require('../images/logo.svg')} />
            </span>
              <div>
                <span className="nav_buttons">about</span>
                <span className="nav_buttons">become a borrower</span>
                <span className="nav_buttons">become a lender</span>
              </div>
            <span className="nav_buttons">contact us</span>
          </div>
        </div>
        {/*<img id="icon" src={require('../images/bank.png')} />*/}
        <header id="app_header">
          <div id="app_header_container">
            <span id="heading">Transparent and sustainable marketplace.</span>
            <span id="description">A decentralized marketplace to enable borrowing and lending.</span>
          </div>
          <div id="app_button_container">
            <div className="app_sub_button_container">
              <span className="button">Learn More</span>
            </div>
            <div className="app_sub_button_container" style={{backgroundColor: '#0A357C'}} onClick={() => window.open('/offers')}>
              <Link to="/offers" className="button">Get Started</Link>
            </div>
          </div>
        </header>
      </section>
      <section id="app_container_middle">
        <div id="app_container_middle_top">
          <div id="app_header_middle">
            <span>Borrow and Lend Ethereum in a trustless manner.</span>
          </div>
          <div id="card_container">
            <div className="card">
              <img src={require('../images/users.png')} />
              <span>Borrowers</span>
            </div>
            <hr className="dashed_line" />
            <div id="card_center">
              <img src={require('../images/ether.png')} />
              <span>Ethereum</span>
            </div>
            <hr className="dashed_line" />
            <div className="card">
              <img src={require('../images/users.png')} />
              <span>Lenders</span>
            </div>
          </div>
        </div>
      </section>
      <section id="app_container_bottom">
        <div className="app_container_bottom_header">
          <span>Become a lender</span>
        </div>
        <div className="app_sub_container_bottom">
          <div id="card_container">
            <div className="card">
              <img src={require('../images/users.png')} />
              <span>Borrowers</span>
            </div>
            <hr className="dashed_line" />
            <div id="card_center">
              <img src={require('../images/ether.png')} />
              <span>Ethereum</span>
            </div>
          </div>
          <div id="app_content_bottom">
            <div className="app_info_card">
              <div className="app_info_card_image">
                <img src={require("../images/note.png")} />
              </div>
              <div className="app_info_card_text">
                <span className="app_info_card_header">Accept an exisitng loan request or create one</span>
                <span>Borrow on your own terms. Specify the duration, interest and collateral for your loan request.</span>
              </div>
            </div>
            <div className="app_info_card">
              <div className="app_info_card_image">
                <svg width="120" height="120" viewBox="0 0 63 63" fill="none"><g filter="url(#filter0_d)"></g><path d="M31.2142 21.0007L41.4285 30.2503L31.2142 39.5L21 30.2503L31.2142 21.0007Z" fill="#5587FF"></path><path d="M31.1348 39.4983V21L41.2467 30.2491L31.1348 39.4983Z" fill="#B1C8FF"></path><defs><filter id="filter0_d" x="0" y="0" width="63" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.921389 0 0 0 0 0.940045 0 0 0 0 0.949372 0 0 0 0.7 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><linearGradient id="paint0_linear_stablecoin" x1="31.5" y1="2" x2="40" y2="99.5" gradientUnits="userSpaceOnUse"><stop stop-color="#E2EAF3"></stop><stop offset="1" stop-color="#C0CCDA" stop-opacity="0"></stop></linearGradient></defs></svg>
              </div>
              <div className="app_info_card_text">
                <span className="app_info_card_header">Create a loan request</span>
                <span>Create a loan request</span>
              </div>
            </div>
            <div className="app_info_card">
              <div className="app_info_card_image">
                <img src={require("../images/interest.svg")} />
              </div>
              <div className="app_info_card_text">
                <span className="app_info_card_header">Create a loan request</span>
                <span>Create a loan request Create a loan</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="app_container_bottom" style={{backgroundColor: 'white'}}>
        <div className="app_container_bottom_header">
          <span>Become a lender</span>
        </div>
        <div className="app_sub_container_bottom">
          <div id="app_content_bottom">
            <div className="app_info_card">
              <div className="app_info_card_image">
                <img src={require("../images/note.png")} />
              </div>
              <div className="app_info_card_text">
                <span className="app_info_card_header">Create a loan request</span>
                <span>Create a loan request</span>
              </div>
            </div>
            <div className="app_info_card">
              <div className="app_info_card_image">
                <svg width="120" height="120" viewBox="0 0 63 63" fill="none"><g filter="url(#filter0_d)"></g><path d="M31.2142 21.0007L41.4285 30.2503L31.2142 39.5L21 30.2503L31.2142 21.0007Z" fill="#5587FF"></path><path d="M31.1348 39.4983V21L41.2467 30.2491L31.1348 39.4983Z" fill="#B1C8FF"></path><defs><filter id="filter0_d" x="0" y="0" width="63" height="63" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1.5"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0.921389 0 0 0 0 0.940045 0 0 0 0 0.949372 0 0 0 0.7 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><linearGradient id="paint0_linear_stablecoin" x1="31.5" y1="2" x2="40" y2="99.5" gradientUnits="userSpaceOnUse"><stop stop-color="#E2EAF3"></stop><stop offset="1" stop-color="#C0CCDA" stop-opacity="0"></stop></linearGradient></defs></svg>
              </div>
              <div className="app_info_card_text">
                <span className="app_info_card_header">Create a loan request</span>
                <span>Create a loan request</span>
              </div>
            </div>
            <div className="app_info_card">
              <div className="app_info_card_image">
                <img src={require("../images/interest.svg")} />
              </div>
              <div className="app_info_card_text">
                <span className="app_info_card_header">Create a loan request</span>
                <span>Create a loan request Create a loan</span>
              </div>
            </div>
          </div>
          <div id="card_container">
            <div id="card_center">
              <img src={require('../images/ether.png')} />
              <span>Ethereum</span>
            </div>
            <hr className="dashed_line" />
            <div className="card">
              <img src={require('../images/users.png')} />
              <span>Lenders</span>
            </div>
          </div>
        </div>
      </section>
      <section id="app_footer">
        <div id="app_footer_row">
          <span id="app_version">App Name (Beta)</span>
        </div>
      </section>
    </div>
  );
}

export default App;
