const puppeteer = require("puppeteer");
const  fs = require("fs");

const URL = "https://free-proxy-list.net/";

const FreeProxy = {
    browser: null,
    page: null,

    init: async () => {
        FreeProxy.browser = await puppeteer.launch({headless: true});
        FreeProxy.page = await FreeProxy.browser.newPage();
        await FreeProxy.page.setViewport({ width: 1920, height: 1920});
        await FreeProxy.page.goto(URL, {waitUntil: "networkidle2"});
    },

    getProxies: async () => {
        let displayRecSelect = await FreeProxy.page.$("#proxylisttable_length select[name=proxylisttable_length]");
        let optionValue = await displayRecSelect.evaluate(node => {
            return node.options[node.options.length - 1].value;
        }, displayRecSelect);

        await FreeProxy.page.select("#proxylisttable_length select[name=proxylisttable_length]", optionValue);
        const ipRows = await FreeProxy.page.$$("table#proxylisttable tr[role=row]");
        await fs.writeFile(`data.csv`, "" , error => {});
        for(let row of ipRows){
            let td = await row.evaluate(node => {
                node = node.cells; 
                return [node[0].innerText, node[1].innerText, node[2].innerText, node[3].innerText, node[4].innerText, node[5].innerText, node[6].innerText, node[7].innerText];
            }, row);
            await fs.appendFile(`data.csv`,`${td[0]}, ${td[1]}, ${td[2]}, ${td[3]}, ${td[4]}, ${td[5]}, ${td[6]}, ${td[7]}\n`, error => {});
        }
    }
}

module.exports = FreeProxy;