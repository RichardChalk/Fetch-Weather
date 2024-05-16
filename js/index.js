// Denna rad lyssnar efter ett klick på en knapp med ID 'getWeatherButton'.
// När knappen klickas, körs funktionen inuti {}.
document.getElementById("getWeatherButton").addEventListener("click", () => {
  // Här definierar vi all data som behövs för att kunna anropa API:et
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  // Uppdatera nyckel med din egen
  const apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  const city = "Stockholm";
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=sv`;

  // Test me i din browser! (byt ut nyckeln)
  // https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=xxxxxxxxxxxxxxxxxxx&units=metric&lang=sv

  // fetch är en funktion för att göra webbanrop.
  // Den tar URL:en vi just byggt och skickar en förfrågan till OpenWeatherMap API.
  https: fetch(url)
    // När vi får ett svar (response) från API:et,
    // kontrollerar vi först att svaret är "ok".
    // Om inte, kastar vi (throw) ett fel.
    // Om svaret är ok, konverterar vi svaret till JSON-format med .json(),
    // så att vi kan använda datan i vårt JavaScript.
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nätverksrespons var inte ok");
      }
      return response.json();
    })
    // När vi har konverterat svaret till JSON,
    // tar vi ut temperaturen (data.main.temp) och platsnamnet (data.name) från datan.
    // Sedan sätter vi detta i HTML-elementet med ID 'weatherInfo',
    // så att användaren kan se väderinformationen.
    .then((data) => {
      const temperature = data.main.temp;
      const location = data.name;
      document.getElementById(
        "weatherInfo"
      ).innerHTML = `Temperaturen i ${location} är ${temperature}°C.`;
    })
    // Om något går fel någonstans i anropskedjan
    // (t.ex. nätverksproblem eller fel på API-servern),
    // fångar .catch felet och loggar ett felmeddelande i konsolen.
    .catch((error) => {
      console.error("Det gick inte att hämta väderdata:", error);
    });
});
