# ibot-interface-console

A console interface for your bot (ibot)

## Install

```sh
npm install --save ibot-interface-console
```

## Usage

```js
const iConsole = require('ibot-interface-console')
const bot = require('./lib/your-ibot')

bot.configure({
    interface: iConsole
})

process.on('SIGINT', () => {
    bot.exit()
    process.exit()
});

bot.run()
```

## License

Under the MIT license. See [LICENSE](https://github.com/demsking/ibot-interface-console/blob/master/LICENSE) file for more details.
