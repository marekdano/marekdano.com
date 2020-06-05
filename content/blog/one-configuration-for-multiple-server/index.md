---
title: 'One configuration for multiple servers'
date: '2019-09-01'
template: 'post'
draft: false
slug: 'one-configuration-for-multiple-servers'
category: 'Coding'
tags:
  - 'Configuration'
  - 'Angular'
  - 'Azure'
description: 'Check how we deployed the same application onto multiple servers with the simple configuration file'
socialImage: ''
# published: false
# cover_image:
# canonical_url: https://marekdano.com/blog/one-configuration-for-multiple-servers/
---

_Have you ever asked yourself how to deploy the same application onto different servers with different settings? We asked the same question when we started developing our frontend application._

## Requirement

In my company, we develop web applications. One of the applications is written in the Angular 8 and had to be deployed to our several customers, on their local in-house server or Azure one. The application had to be configured to communicate with our web API and also to have global settings defined. The place where web API is live is different for each application. Therefore we decided to have one local configuration file with all settings required in the app. Those settings should have been used in our application.

The similar file that we have is like:

```json
{
  "version": "v1.0.0",
  "ops_environment": "production",
  "authentication": true,
  "authenticationType": "azure",
  "apiUrl": "https://sample-app.azurewebsites.net/ws",
  "tenant": "sample-tenant.com",
  "signalr": {
    "url": "https://sample-app.azurewebsites.net/ws/signalr",
    "hubName": "SampleHub"
  }
}
```

Where

- **authenticationType** can be **azure** or **windows** depending on where the app is deployed - options are to Azure or IIS on Windows server.
- **apiUrl** and **signalr.url** is the URL of the required web API.

## Our implementation

After researching we found that the best solution for us was to build and do a release of the application once for all our clients and have a configuration file of **config.json** somewhere in the app with the settings already defined above.

We decided to put the config.json file under **assets** folder rather than having it under the build root or somewhere else. If we didn't have it under the **assets** folder then we would have had to create the web API for getting the configuration file and reading settings at the start of initializing the whole application. Since we had it under assets, the config.json file loaded every time into the browser when the app started and we could set the required settings in our application.

The setting of **apiUrl** is used in angular services, **authenticationType** in the authentication process and **signalr** to set signal-R client in our app.

The part of our application structure with the location of config.json file is:

```bash
...

├── SampleApp
|   ├── src
|   |   ├── app
|   |   |   ├── pages
|   |   |   ├── shared

...

|   |   ├── assets
|   |   |   └── config.json
|   |   ├── environments

...

|   |   └── index.html

...

|   ├── package.json
|   └── angular.json

...

└── README.md

```

## Conclusion

We believe that there might be a better solution to handle our problem. If you think we could have done it in a different way, please let us know ;)
