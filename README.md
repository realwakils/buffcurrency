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
* Synchronizes user preferences (chosen currency) across all devices on an acccount.
* Automatically updates currency rates frequently, so you never get inaccurate prices.
* Provides a user-friendly diverse UI, that lets you change to your wanted currency
* Features more than 30 currencies
* Fast and light-weight

## Installation and guide
1. Install the latest version of Buff Currency from the Google Webstore [here](https://chrome.google.com/webstore/detail/buff-currency/ecnjcjbilnpjjnpjlfkoompbpehpbnbc).
2. Find Buff Currency in your Chrome Extensions and choose the currency you want to convert to.
3. Head on over to buff.163.com (if you are already on buff, make sure to reload the page). Now you should see the prices being converted.

### Example
![Example Gif](https://lh3.googleusercontent.com/pmu_4mv0HxjFKYyneLbmRh4_dUKvKActVx1-KuO4bE6SYVTr_irojvy9ynN1_0HygI4OPxCDDGXYDIRVB_4ccQX8=w640-h400-e365-rj-sc0x00ffffff)
<!-- Here a gif of choosing a currency and loading buff.163.com should be showed -->

## Development
On the 3rd of August 2022, the extension's development environment was drastically simplified. This means, we no longer use NPM, Rollup or Svelte.
It's simply plain vanilla JavaScript.

It is STRONGLY recommended to use `web-ext`, in order to automatically reload and package the extension.
### Setup
1. Clone the repo
	```sh
	git clone https://github.com/realwakils/buffcurrency.git
	cd buffcurrency
	```
2. Install and run web-ext (Optional)
	```sh
	npm install -g web-ext
	web-ext run -t chromium
	```
	
	Use the `--chromium-binary` and `--chromium-profile` flags, if you wish to use your own Chrome profile. By doing this you avoid having to login to Buff every time.

## Contributing
Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your feature branch (`git checkout -b AmazingFeature`)
3. Commit your changes (`git commit -a -m 'Add some amazing feature`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Credits
Extra credits are due to:
- [Zukko04](https://www.instagram.com/lassesejrbrunbjerg/): Helped a lot with testing.
- [CoachDP](https://www.twitch.tv/coachdp): Denmark's greatest streamer! A regular user of Buff.163.com and helped testing aswell.

Thank you!
