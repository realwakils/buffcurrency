# Buff Currency

[![License](https://img.shields.io/github/license/realwakils/buffcurrency.svg)](https://github.com/realwakils/buffcurrency/blob/master/LICENSE)
[![Stars](https://img.shields.io/github/stars/realwakils/buffcurrency.svg)](https://github.com/realwakils/buffcurrency/stargazers)
[![Issues](https://img.shields.io/github/issues/realwakils/buffcurrency.svg)](https://github.com/realwakils/buffcurrency/issues)
[![Donate PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/wakils)

A currency converter made for buff.163.com (Google Extension)

Created with 💖 by [wakils] & [linnnus]

## Features

* Eases the process of converting currencies from buff.163.com
* Synchronizes user preferences (chosen currency) across all devices on an account.
* Automatically updates currency rates frequently, so you never get inaccurate prices.
* Provides a user-friendly diverse UI, that lets you change to your wanted currency
* Features more than 30 currencies
* Fast and light-weight

## Installation and guide

1. Install the latest version of Buff Currency from the [Google Webstore][webstore link].
2. Find Buff Currency in your Chrome Extensions and choose the currency you
   want to convert to.
3. Head on over to [buff.163.com] (if you are already on buff, make sure to
   reload the page). Now you should see the prices being converted.

### Example

<!-- TODO: a gif of choosing a currency and loading buff.163.com should be showed -->
![Example Gif](https://i.postimg.cc/qv0ZzGrY/Sk-rmbillede-2023-04-03-kl-11-16-59.png "Buff front page. Prices are converted to USD.")

## Development

We recommended using Mozilla's excellent `web-ext`, in order to automatically
reload and package the extension.

1. Clone the repo
   ```sh
   git clone https://github.com/realwakils/buffcurrency.git
   cd buffcurrency
   ```
2. Install `web-ext` globally
   ```sh
   npm install -g web-ext
   ```
3. Test the extension
   ```sh
   web-ext run -t chromium --url https://buff.163.com
   ```
   Use the `--chromium-binary` and `--chromium-profile` flags, if you wish
   to use your own Chrome profile. By doing this you avoid having to login
   to Buff every time.

## Credits

Extra credits are due to:

- [Zukko04]: Helped a lot with testing.
- [CoachDP]: Denmark's greatest streamer! A regular user of Buff.163.com and helped testing aswell.

Thank you!

[wakils]: http://wakils.com
[linnnus]: https://www.youtube.com/watch?v=dQw4w9WgXcQ
[webstore link]: https://chrome.google.com/webstore/detail/buff-currency/ecnjcjbilnpjjnpjlfkoompbpehpbnbc
[buff.163.com]: https://buff.163.com/
[Zukko04]: https://www.instagram.com/lassesejrbrunbjerg/
[CoachDP]: https://www.twitch.tv/coachdp
