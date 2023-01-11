const axios = require('axios');
const fs = require('fs');
const URLS_TO_WATCH = ['https://jysk.de/schlafzimmer/bettwasche/flanell/bettwaesche-ronja-flanell-135x200-0'];

const extractor = (html) => {
	let price = html.match(/(?<=price__value">)(.*)(?= €)/)[0].replace(',', '.');
	const product = html.match(/(?<=product-name">)(.*)(?=<)/)[0];
	return { name: product, price };
};

const promises = [];
const allItems = [];
for (url of URLS_TO_WATCH) {
	promises.push(
		axios.request(url).then((resp) => {
			allItems.push(extractor(resp.data));
		})
	);
}

Promise.allSettled(promises).then(() => {
	console.log('allItems', allItems);
	fs.writeFileSync('./public/items.json', JSON.stringify(allItems, null, 2));
});
