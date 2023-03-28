const express = require("express");
const { google } = require("googleapis");

const app = express();
const port = 3000;

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY =
  "\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2MKaI4iaoP7Rc\n/xAgagXd3XoUzAjGLFISwwVvtHkAUpHpwER7alUePlM3poQl0MSNizqKA7+WZ3LO\n4u72or8vvcvOvukKvHRS3KgGrfBuf1onNpl/MB/LcOH7f59PUMrfq9kriVz1g1cT\nmg/D0KGazEhctaFG+sTBFk6xQmeiTjqNTbJpIs00YShRa+6p2q/zadhlAb9zGmsv\nH7ZNt+pMqWoGqFfdqxrKWISyWpQzFAo4kMfq3MfRHIK2yBKm0N/KctdarTr3sx4G\n9dH4xGHk1LpgzLtz9rWX1OVamzs77bwULt46o5ztGtSyMx/chIyle5l1N1ucD6xB\nm7TTEHpBAgMBAAECggEACY9G83UOX8nQgr9CBgKH4mrgRTnOFqB+k/nfjctzqjbh\nyP1+MUR5JHgulcy9VDnHvneUix5fqT8JozlGZ2Bzedp3IbuIk5ORdPrACykbwDGt\nfx0aYX8tA+odVyqe8EchoXNR3/G6JlN7So3M/UBGK6pDsy/uCGWh+S0l1J9lBR++\nxg2PCdeV8SzItbelfoB0UuH8LPyhz+48srS8xwOBL8lOHO5g8HduEAq68tum1E0+\nx7S32GzCsANTVMm5bRsbg+efCfN2FWUXYN5Y2N6ptg7xybQ2PIATE9DgZWniUb5i\nUunEi8PLgtAhIUYYxv7FxuSYJ0TwozwprYeZZKB6MwKBgQDvpUjsmAZqMAdova+U\nI8U3PyitUKw08G0DTpE/udHTM6Nk8BSc1HTyP1+r/QzU+EfriKEv0o0GBtQDdjH8\nBGwftECxOej6SdbQVD1YE8ug9/ahRYntKNSCpeW9RayjYVqV1MoOkFpbagy+a4sj\nF1IK4ZLAHGdCiSsyV4kVjFMIjwKBgQDCn5dHXRcFhB5Or8e/y4SoQ+emNp6jvht3\n4F1TU0lF6vmCjt63haJ32vfF6N2B4/vWmKlQd+VuQjPJUmKWqQhYNsK8WNmlzUzt\nzNbcNZblJcIqhVbxOsURZ7hWteSUNmMuO9BJOzMb+nWgzcnnYxtst4o/VKMTi+mE\ntIVbrfOYLwKBgQCiXqbORyLxh6E9gmgYQzQ4fn6dD2/eXpg+CVm4h7p3EyG+HjyZ\nFgo2qGG2MjojgiWYnHY55LrQPogf4FF1o7lusb6zVb1Y9/aoKKt3pdHuOpPMKUWO\nfn+eFbFXUIHsIOYzZn2Q6JWQIoaH7m3TVNWtsbCwoY4FMtMlxNGI3A7WWQKBgH/F\n6rmNYhna/VLHkKpYYQVfX2v+G/SAUORIxrx3x3lBpQGT7qAp+doaReUG1rX6CVJ/\n81jC/jt+9yTLE7K50qKngP3Kj0mNGV5dxwnXnPNf8LOdytCgttSQdbNnw2OSuVaX\nKk2JsipCKouhz1Y7+LtNXFPrqwygJHVdVtgzweM9AoGBAInrQC3iOa6JHs5gsk/u\ni6gJNldEiH3iBEuhO99EK+M9X355KBcWJ2Vu8rYBBejsY1UA/QkfA5fO5xxKYvr4\nTGo+O2pqUaD3zYl71O53DvzJOvaItPmjPaDEPI4Blw1vWIXV6WeapaAqHeKCS/eu\nQfi/++cgV28fQNzgSDcYQ79y\n";

const GOOGLE_CLIENT_EMAIL =
  "teenshare@teenshare-backend.iam.gserviceaccount.com";
const GOOGLE_PROJECT_NUMBER = "887866022396";
const GOOGLE_CALENDAR_ID = "tomlau@teensharehk.com";

app.get("/", (req, res) => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: "No upcoming events found." }));
        }
      }
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
