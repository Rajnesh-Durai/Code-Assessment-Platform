import React from "react";
import Kanini from "../../../assets/logo.png";
import { useMsal } from "@azure/msal-react";

const LoginPage = () => {
  const { instance, accounts } = useMsal();
  const handleLogin=async()=>{
    const loginResponse = await instance.loginPopup();
    // Check if the user is logged in
    if (accounts.length > 0) {
      // User is logged in, show an alert
      alert('Successfully logged in!');
    }
    // Assuming idToken is available in the idTokenClaims property
    const idToken = loginResponse.idTokenClaims;
    sessionStorage.setItem('idToken', JSON.stringify(idToken));
    sessionStorage.setItem('loginResponse', JSON.stringify(loginResponse));

  console.log("Login Response: ", loginResponse);
  console.log("idToken: ",idToken);
  }
  return (
    <>
      <div id="nav1">
        <div id="logo1">
          <img src={Kanini} alt="Kanini logo." />
        </div>
      </div>
      <div id="product-landing">
        <div id="hero">
          <div id="hero-intro">
            <div id="hero-text">
              <h1>Welcome To <i>Kanini Assessment Portal</i></h1>
              <p>
                Simplified skill evaluation for seamless improvement.
              </p>
            </div>
            <div id="hero-action-btn">
              <div id="apple" class="hero-btn">
                <button class="btn1" onClick={handleLogin}>
                    Login
                </button>
              </div>
            </div>
          </div>
          <div id="hero-visual">
            <div id="hero-img">
              <div class="comp">
                <div class="monitor">
                  <div class="mid">
                    <div class="site">
                      <div class="topbar">
                        <div class="cerrar">
                          <div class="circl"></div>
                          <div class="circl"></div>
                          <div class="circl"></div>
                        </div>
                      </div>
                      <div class="inhead">
                        <div class="mid">
                          <div class="item"></div>
                        </div>
                        <div class="mid txr">
                          <div class="item"></div>
                          <div class="item"></div>
                          <div class="item"></div>
                          <div class="item"></div>
                        </div>
                      </div>
                      <div class="inslid"></div>
                      <div class="incont">
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                        <div class="wid">
                          <div class="itwid">
                            <div>
                              <div class="contfoot"></div>
                            </div>
                          </div>
                          <div class="itwid">
                            <div>
                              <div class="contfoot"></div>
                            </div>
                          </div>
                          <div class="itwid">
                            <div>
                              <div class="contfoot"></div>
                            </div>
                          </div>
                          <div class="clearfix"></div>
                        </div>
                        <div class="infoot"></div>
                      </div>
                    </div>
                  </div>
                  <div class="mid codigo">
                    <div class="line">
                      <div class="item var"></div>
                      <div class="item cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line">
                      <div class="item min var"></div>
                      <div class="item min fun"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line">
                      <div class="item min var"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line">
                      <div class="item var"></div>
                      <div class="item atr"></div>
                      <div class="item cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item min atr"></div>
                      <div class="item lrg fun"></div>
                      <div class="item min fun"></div>
                      <div class="item lrg cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item lrg atr"></div>
                      <div class="item min fun"></div>
                      <div class="item min cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item atr"></div>
                      <div class="item min fun"></div>
                      <div class="item atr"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item min atr"></div>
                      <div class="item min cont"></div>
                      <div class="item lrg atr"></div>
                      <div class="item  fun"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item min atr"></div>
                      <div class="item lrg fun"></div>
                      <div class="item lrg cont"></div>
                      <div class="item min fun"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item min var"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item min var"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab2">
                      <div class="item min var"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab2">
                      <div class="item min atr"></div>
                      <div class="item min fun"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab3">
                      <div class="item min atr"></div>
                      <div class="item min fun"></div>
                      <div class="item lrg fun"></div>
                      <div class="item lrg cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab3">
                      <div class="item min atr"></div>
                      <div class="item min fun"></div>
                      <div class="item lrg atr"></div>
                      <div class="item lrg cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab4">
                      <div class="item min fun"></div>
                      <div class="item lrg atr"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab1">
                      <div class="item atr"></div>
                      <div class="item var"></div>
                      <div class="item cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab3">
                      <div class="item min var"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line tab4">
                      <div class="item min atr"></div>
                      <div class="item min fun"></div>
                      <div class="item lrg atr"></div>
                      <div class="item lrg cont"></div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="line">
                      <div class="item min var"></div>
                      <div class="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div class="base"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
