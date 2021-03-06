import { useState } from "react";

import { useHistory } from "react-router-dom";
import Calendar from "../calendar/calendar2";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";

import "../styles/App.css";

import { withTracking } from "react-tracker";
import { navigateTo } from "../tracking/events/events";
import { saveWaitTime } from "../tracking/wrapper/wait";

export let requestFor = "";

function ViewRequests(props) {
  const history = useHistory();
  const [r1status, setR1Status] = useState("Received");
  const [r2status, setR2Status] = useState("Received");

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleListItem(e) {
    if (e == "request1") {
      setR1Status("Done");
    } else {
      setR2Status("Done");
    }
  }

  return (
    <>
      <TitleBar title="Requests" selected="requests"></TitleBar>
      <div className="body">
        <h2>Requests for Today</h2>
        <div class="requests">
          <div
            class="request-1-head"
            onClick={() => {
              handleListItem("request2");
              requestFor = "Mary";
              history.push("/delivery-request-active");
              props.trackNavigation("ON_DEMAND_REQUEST");
            }}
          >
            <div class="picture mary">
              <img alt="" src="\src\logo_light.png" />
            </div>
            <div class="req-item">
              <div class="request-name">Mary's Request</div>
              <div class="request-time">6:00 P.M.</div>
            </div>
          </div>
        </div>
        <br />
        <h2>Requests for Thursday</h2>
        <div class="requests">
          <div
            class="request-1-head"
            onClick={() => {
              requestFor = "Walt";
              handleListItem("request1");
              history.push("/delivery-request-active");
              props.trackNavigation("SUBSCRIPTION_REQUEST");
            }}
          >
            <div class="picture walter"></div>
            <div class="req-item">
              <div class="request-name">Walt's Request</div>
              <div class="request-time">8:00 P.M.</div>
            </div>
          </div>
        </div>
        <br />
        <h2>Requests for the Week </h2>
        <br />
        <div align="center"></div>
        <div className="calendar">
          <Calendar />
        </div>
        <br></br>
      </div>
    </>
  );
}

const mapTrackingToProps = (trackEvent) => {
  return {
    trackNavigation: (pageName) => {
      saveWaitTime();
      trackEvent(navigateTo(pageName));
    },
  };
};

const ViewRequestsWithTracking = withTracking(mapTrackingToProps)(ViewRequests);

export default ViewRequestsWithTracking;
