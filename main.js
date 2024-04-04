/* latitudes and longitudes of cities */
let Al_Arish = "latitude=31.13194&longitude=33.80333&";

/* API of timing */
function timing() {
  axios
    .get(`http://api.aladhan.com/v1/calendar/2024?${Al_Arish}method=3`)
    .then((response) => {
      //   console.log(response);
      let days = response.data.data[2];
      console.log(days);
      for (day of days) {
        let Asr = day.timings.Asr;
        console.log(Asr);
        document.getElementById(
          "days"
        ).innerHTML += `<option onclick="ClickedUser(${Asr})">${day.date.readable}</option>`;
        //   ClickedUser(${day.timings})
        console.log(day.timings.Asr);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
timing();
function ClickedUser(Asr) {
  console.log(Asr);
}
