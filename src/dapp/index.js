import DOM from "./dom";
import Contract from "./contract";
import "./flightsurety.css";
import { json } from "express";

(async () => {
  let result = null;
  let firstAirlineAddress = null;

  let contract = new Contract("localhost", () => {
    // Read transaction
    contract.isOperational((error, result) => {
      console.log(error, result);

      display("Operational Status", "Check if contract is operational", [
        { label: "Operational Status", error: error, value: result },
      ]);
    });

    contract.getFirstRegisteredAirline((value) => {
      firstAirlineAddress = value;
      DOM.elid("firstRegisteredAirlineAddress").innerHTML = value;
    });

    DOM.elid("submit-oracle").addEventListener("click", () => {
      let flight = DOM.elid("flight-number").value;
      // Write transaction
      contract.fetchFlightStatus(flight, (error, result) => {
        display("Oracles", "Trigger oracles", [
          {
            label: "Fetch Flight Status",
            error: error,
            value: result.flight + " " + result.timestamp,
          },
        ]);
      });
    });

    DOM.elid("payBtn").addEventListener("click", () => {
      
      contract.payAirline(firstAirlineAddress, (response) => 
      {        
        displayMessage("fund an airline is successful " + response);
      });

    });

    DOM.elid("registerAirlineBtn1").addEventListener("click", () => {
      var name = DOM.elid("airlineName1").value;
      var address = DOM.elid("airlineAddress1").value;

      contract.registerAirline(name, address, (response) => {
        displayMessage(response);
      });
    });

    DOM.elid("registerAirlineBtn2").addEventListener("click", () => {
      var name = DOM.elid("airlineName2").value;
      var address = DOM.elid("airlineAddress2").value;

      contract.registerAirline(name, address, (response) => {
        displayMessage(response);
      });
    });

    DOM.elid("registerAirlineBtn3").addEventListener("click", () => {
      var name = DOM.elid("airlineName3").value;
      var address = DOM.elid("airlineAddress3").value;

      contract.registerAirline(name, address, (response) => {
        displayMessage(response);
      });
    });

    DOM.elid("registerAirlineBtn4").addEventListener("click", () => {
      var name = DOM.elid("airlineName4").value;
      var address = DOM.elid("airlineAddress4").value;
      contract.registerAirline(name, address, (response) => {
        displayMessage(response);
      });
    });

    DOM.elid("registerFlightBtn").addEventListener("click", () => {
      contract.registerFlight((response) => {
        displayMessage(response);
      });
    });

    DOM.elid("purchaseInsurancBtn").addEventListener("click", () => {
      contract.purchaseInsurance((response) => {
        displayMessage(response);
      });
    });

    DOM.elid("pendingPaymentAmountBtn").addEventListener("click", () => {
      contract.getPendingPaymentAmount((response) => {
        displayMessage(response);
      });
    });

    DOM.elid("getPassengerBalanceBtn").addEventListener("click", () => {
      contract.getBalanceAmount((response) => {
        displayMessage(response);
      });
    });

    DOM.elid("withdrawPaymentBtn").addEventListener("click", () => {
      contract.pay((response) => {
        displayMessage(response);
      });
    });
  });
})();

function displayMessage(msg) {
  DOM.elid("msg").innerHTML = DOM.elid("msg").innerHTML + "<br/>" + msg;
}

function display(title, description, results) {
  let displayDiv = DOM.elid("display-wrapper");
  let section = DOM.section();
  section.appendChild(DOM.h2(title));
  section.appendChild(DOM.h5(description));
  results.map((result) => {
    let row = section.appendChild(DOM.div({ className: "row" }));
    row.appendChild(DOM.div({ className: "col-sm-4 field" }, result.label));
    row.appendChild(
      DOM.div(
        { className: "col-sm-8 field-value" },
        result.error ? String(result.error) : String(result.value)
      )
    );
    section.appendChild(row);
  });
  displayDiv.append(section);
}
