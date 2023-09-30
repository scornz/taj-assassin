<h1 align="left">TAJ ASSASSIN</h1>

<p>
  <a href="https://github.com/scornz/taj-assassin/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://github.com/scornz" target="_blank">
    <img alt="Github" src="https://img.shields.io/badge/GitHub-@scornz-blue.svg" />
  </a>
  <a href="https://linkedin.com/in/mscornavacca" target="_blank">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-@mscornavacca-blue.svg" />
  </a>
</p>

> A small web app (primarily built for mobile) that facilitates the operation of a classic game of "assassin". Used at University Cottage Club (UCC) at Princeton University in F'23.

## Requirements

- `yarn` ([download](https://classic.yarnpkg.com/lang/en/docs/install))
- MongoDB cluster ([create](https://www.mongodb.com/))
- Google developer account

## Setup

1.  Ensure requirements are installed correctly.
2.  Navigate to project folder.
3.  From root folder, call `yarn install`, to install all necessary packages for both `/frontend` and `/backend`.
4.  Create a `MongoDB` cluster [here](https://www.mongodb.com/). The free tier is fine.
5.  Create a Google developer account (if you don't already have one) and register an app for OAuth ([instructions](https://support.google.com/cloud/answer/6158849?hl=en#:~:text=Go%20to%20the%20Google%20Cloud%20Platform%20Console%20Credentials%20page.,to%20add%20a%20new%20secret.)).
6.  Create `.env` file in the `/backend` folder and fill in the required variables.

```
DB_USER=<name of MongoDB user>
DB_PASSWORD=<password of MongoDB user>
DB_HOST=<cluster url>
DB_PARAMS=<misc>

OAUTH_CLIENT_ID=<obtained from google dev console>
OAUTH_CLIENT_SECRET=<secret of oauth>

JWT_SECRET=<randomly generated key for JWTs>
JWT_REFRESH_SECRET=<randomly generated key for refresh JWTs>

ACTIVE_GAME_ID=<ID of the active game>

ALLOWED_ORIGINS=<comma separated list of origin addresses for CORS>

HOST=<address of the api>
FRONTEND_HOST=<address of the frontend, for redirections>
```

7. Call `yarn start` from the `/backend` folder. If this opens, your backend is configured correctly.
8. Call `yarn start` from the `/frontend` folder in order to spin up the local React app.
9. Prosper.

## License

Copyright © 2023 [Mike Scornavacca](https://github.com/scornz).<br />
This project is [MIT](https://github.com/scornz/taj-assassin/blob/main/LICENSE) licensed.
