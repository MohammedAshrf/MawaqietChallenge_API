/* latitudes and longitudes of cities */
let Al_Arish = "latitude=31.13194&longitude=33.80333&";

/* API of timing */
function timing() {
  axios
    .get(`http://api.aladhan.com/v1/calendar/2024?${Al_Arish}method=3`)
    .then((response) => {
      let days = response.data.data[2];
      console.log(days);
      for (let day of days) {
        let option = document.createElement("option");
        option.textContent = day.date.readable;
        option.setAttribute("data-timings", JSON.stringify(day.timings));
        option.addEventListener("click", function () {
          let timings = JSON.parse(this.getAttribute("data-timings"));
          ClickedUser(timings);
        });
        document.getElementById("days").appendChild(option);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

timing();

function ClickedUser(timings) {
  console.log(timings);
}
