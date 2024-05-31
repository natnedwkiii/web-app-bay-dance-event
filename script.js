"use strict";

async function getAllRecords() {
  let getResultElement = document.getElementById("insert-html");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patFRgUyEFEKzs4kf.1ac3eeace1313dc2a11130a7536572a51826b7341832af4c05496e273801240c`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/applfocG7GRYLL2X5/Battles`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear student

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        // here we are getting column values
        let eventName = data.records[i].fields["EventName"];
        let date = data.records[i].fields["Date"];
        let battleStyle = data.records[i].fields["BattleStyle"];
        let eventAddress = data.records[i].fields["EventAddress"];
        let organizer = data.records[i].fields["Organizer"];
        let entryFee = data.records[i].fields["EntryFee"];

        newHtml += `
        
         <div class="row row-cols-1 row-cols-md-3 g-4">
           <div class="col">
           
             <div class="card h-100">
               <img
                 src="$(data.records[i].fields.Link)"
                class="card-img-top"
                 alt="..."
              />
              
              <div class="card-body">
              
                <h5 class="card-title blueText"> </h5>
                <p class="card-text">
                  ${eventName} <br>
                  ${date} <br>
                  ${battleStyle} <br>
                  ${eventAddress} <br>
                  ${organizer} <br>
                  ${entryFee} <br>
                </p>
                
              </div>
            </div>
          </div>
        </div> 
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["id?=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["id?", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
