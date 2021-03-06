# Buff Currency
[![License](https://img.shields.io/github/license/realwakils/buffcurrency.svg)](https://github.com/realwakils/buffcurrency/blob/master/LICENSE)
[![Stars](https://img.shields.io/github/stars/realwakils/buffcurrency.svg)](https://github.com/realwakils/buffcurrency/stargazers)
[![Issues](https://img.shields.io/github/issues/realwakils/buffcurrency.svg)](https://github.com/realwakils/buffcurrency/issues)
[![Donate PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/wakils)

A currency converter made for buff.163.com (Google Extension)<br>
Created with 💖 by [wakils](http://wakils.com) & [linnnus](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

Current status: `RELEASED` 

## Features
* Eases the process of converting currencies from buff.163.com
* Provides a user-friendly diverse UI, that lets you change to your wanted currency
* Features more than 30 currencies
* Fast and light-weight
* Synchronizes user preferences (chosed currency) across all devices on an acccount.
* Automatically updates currency rates frequently, so you never get inaccurate prices.

## Installation and guide
1. Install the latest version of Buff Currency on the Google Webstore [here](https://chrome.google.com/webstore/detail/buff-currency/ecnjcjbilnpjjnpjlfkoompbpehpbnbc).
2. Find Buff Currency in your Chrome Extensions and choose the currency you want to convert to.
3. Head on over to buff.163.com (if you are already on buff, make sure to reload). Now you should see the prices being converted.

### Example
![Example Gif](https://lh3.googleusercontent.com/pmu_4mv0HxjFKYyneLbmRh4_dUKvKActVx1-KuO4bE6SYVTr_irojvy9ynN1_0HygI4OPxCDDGXYDIRVB_4ccQX8=w640-h400-e365-rj-sc0x00ffffff)
<!-- Here a gif of choosing a currency and loading buff.163.com should be showed -->

## Development
<span style="color:#f25b50;">You only need to follow the below instructions if you are trying to modify this software.</span><br>
The Buff Currency Extension is written in [Typescript](https://www.typescriptlang.org/) and utilizes [Rollup](https://rollupjs.org/) and [Rollup Plugin Chrome Extension](https://www.npmjs.com/package/rollup-plugin-chrome-extension) in order to maintain a smooth environment both for the developer and end-user. [Svelte](https://svelte.dev/) is used for frontend UI for a blazing fast application.
### Prequisites
* [node.js](https://nodejs.org/en/download/)
* yarn
```sh
npm install yarn -g
```
* node.js
* yarn
### Setup
1. Clone the repo
```sh
git clone https://github.com/realwakils/buffcurrency.git
cd buffcurrency
```
2. Install NPM packages
```sh
yarn
```
3. Run the project
```JS
yarn dev
```

## Contributing
Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b AmazingFeature`)
3. Commit your Changes (`git commit -a -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Credits
Extra credits are due to:
- [Zukko04](https://www.instagram.com/lassesejrbrunbjerg/): Helped a lot with testing.
- [CoachDP](https://www.twitch.tv/coachdp): Denmark's greatest streamer! A regular user of Buff.163.com and helped testing aswell.

Thank you!
