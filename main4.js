/* cities */
let cities = [
  {
    arabicName: "مكة المكرمة",
    country: "SA",
    name: "Makkah al Mukarramah",
  },
  {
    arabicName: "المدينة المنورة",
    country: "SA",
    name: "Al Madīnah al Munawwarah",
  },
  {
    arabicName: "القاهرة",
    country: "EG",
    name: "Al Qāhirah",
  },
  {
    arabicName: "شمال سيناء",
    country: "EG",
    name: "Shamāl Sīnā'",
  },
];
for (city of cities) {
  document.getElementById("cities").innerHTML += `
   <option>${city.arabicName}</option>
  `;
}

/* Timings based on cities */
document.getElementById("cities").addEventListener("change", function () {
  let countryName = "";
  let cityName = "";
  for (city of cities) {
    if (this.value == city.arabicName) {
      countryName = city.country;
      cityName = city.name;
    }
  }
  prayerTimings(countryName, cityName);
});
function prayerTimings(countryName, cityName) {
  let params = {
    country: countryName,
    city: cityName,
  };
  axios
    .get(`http://api.aladhan.com/v1/timingsByCity`, {
      params: params,
    })
    .then(function (response) {
      let timings = response.data.data.timings;
      timingsOfPrayers("fajr", timings.Fajr + " ص");
      timingsOfPrayers("sunrise", timings.Sunrise + " ص");
      timingsOfPrayers("duhr", timings.Dhuhr + " ص");
      timingsOfPrayers("asr", timings.Asr + " ص");
      timingsOfPrayers("maghrib", timings.Maghrib + " ص");
      timingsOfPrayers("isha", timings.Isha + " ص");
      let dateNumber = response.data.data.date.gregorian.date;
      let dateName = response.data.data.date.hijri.weekday.ar;
      document.getElementById("days").innerHTML = `${dateNumber} - ${dateName}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}
prayerTimings("SA", "Makkah al Mukarramah");

function timingsOfPrayers(id, timing) {
  document.getElementById(id).innerHTML = timing;
}
