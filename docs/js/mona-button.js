class MonaButton {
    make(baseUrl, text) {
        const lines = text.split(/\r\n|\n/).filter(v=>v)
        const htmls = []
        for (let i=0; i<lines.length; i+=2) { // i = i + 2
            const [pngName, pngSize, pngSize2, _] = lines[i].split('\t')
            const [svgName, svgSize, svgSize2, isColorScheme] = lines[i+1].split('\t')
            htmls.push(this.#makeHtml(baseUrl, svgName.substring(0, svgName.lastIndexOf("."))))
        }
        console.log(htmls)
        return htmls.join('')
    }
    #makeHtml(baseUrl, baseName, width=64, height=64) {
        return `<a href="javascript:/*await*/ window.mpurse.sendAsset('MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu', 'MONA', 0.114114, 'plain', 'Good job!')" title="投げモナする"><object data="${baseUrl}${baseName}.svg" type="image/svg+xml" width="${width}" height="${height}"><object data="${baseUrl}${baseName}.png" type="image/png" width="${width}" height="${height}"></object></object></a>`
//        `<a href="javascript:/*await*/ window.mpurse.sendAsset('MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu', 'MONA', 0.114114, 'plain', 'Good job!')" title="投げモナする"><object data="./asset/image/monacoin_face_mouth_white.svg" type="image/svg+xml" width="64" height="64"><object data="./asset/image/monacoin_face_mouth_white.png" type="image/png" width="64" height="64"></object></object></a>`
    }
}
