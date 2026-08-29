async function printWeather(latitude, longitude) {

  const response = await fetch(

    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,

  );

  console.log(

    "--------Результат работы метода fetch() await синтаксис----------------",

  );

  console.log(response);

  const json = await response.json();

  console.log("------Результат работы метода json()----------------");

  console.log(json);

  console.log("=============================================");

  console.log("Широта: " + latitude + "\nДолгота: " + longitude);

  console.log("Скорость ветра: " + json.current_weather.windspeed);

  console.log("Температура: " + json.current_weather.temperature);

}

 

const latitude = 44.49;

const longitude = 20.27;

printWeather(latitude, longitude);