let cities = [
  {
    arabicName: "مكة المكرمة",
    country: "SA",
    name: "Makkah al Mukarramah",
  },
  {
    arabicName: "الرياض",
    country: "SA",
    name: "Ar Riyāḑ",
  },
  {
    arabicName: "المدينة المنورة",
    country: "SA",
    name: "Al Madīnah al Munawwarah",
  },
  {
    arabicName: "شمال سيناء",
    country: "EG",
    name: "Shamāl Sīnā'",
  },
];
for (city of cities) {
  const content = `<option>${city.arabicName}</option>`;
  document.getElementById("cities").innerHTML += content;
}

document.getElementById("cities").addEventListener("change", function () {
  for (let city of cities) {
    if (city.arabicName == this.value) {
      cityName = city.name;
      countryName = city.country;
    }
  }
  getPrayersTimingOfcity(cityName, countryName);
});

function getPrayersTimingOfcity(cityName, countryName) {
  let params = {
    country: countryName, // "SA",
    city: cityName, // "Makkah al Mukarramah",
  };
  axios
    .get(`http://api.aladhan.com/v1/timingsByCity`, {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      console.log(response.data.data);
      fillTimeForPrayer("fajr-time", timings.Fajr + " ص");
      fillTimeForPrayer("sunrise-time", timings.Sunrise + " ص");
      fillTimeForPrayer("duhr-time", timings.Dhuhr + " ص");
      fillTimeForPrayer("asr-time", timings.Asr + " ص");
      fillTimeForPrayer("maghrib-time", timings.Maghrib + " ص");
      fillTimeForPrayer("isha-time", timings.Isha + " ص");
      const readableDate = response.data.data.date.gregorian.date;
      const weekday = response.data.data.date.hijri.weekday.ar;
      document.getElementById("days").innerHTML = readableDate + " " + weekday;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayersTimingOfcity("Makkah al Mukarramah", "SA");

function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
