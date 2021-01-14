# Git client app example.
The main aim of this repository is to demonstrate the usage of OAuth2.0 Authorization protocol using asp.net.

We use the [Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1) to authorize/authenticate the user using github.




##Usage

---

###Development
We have a Scripts folder which contains all the assets (Scripts and css) used by the pages served from asp.net razor pages app.
We use Webpack to manage and inject theses assets into our razor pages.

To build and start the servers run the following commands from the project root:
```bash
dotnet watch run
cd Scripts
npm run start
```

or run the [start](start.sh) bash script from project root.

Otherwise, configure the app to you needs.

#### Register App with github.

1. Go to user settings on github and click on "Developer settings" in the left panel.
2. Click on "OAuth Apps" then click "New Oauth App" to register a new App.
3. A form is shown where we can enter details of the app.

The following settings are crucial: 

* Set Homepage URL to https://localhost:5001. This tells github where to find the app.
* Set Authorization callback URL to  https://localhost:5001/github-oauth. This tells github where to redirect ones the user is successfully authenticated.

Choose any name you like for the other options.

###App 
At current state of development, we have a simple 2 page app which allows to user to login using github authentication
and lists to flowing git resources of the user:

* Repositories,
* Starred repositories,
* Followers and
* Following

