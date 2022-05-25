class ImageTableHorizon {
    make(baseUrl, text) { // filename,size(1.0KB),sizw2(1024B),hasSvgColorScheme
        const lines = text.split(/\r\n|\n/).filter(v=>v)
        const [pngs, svgs, modes, pngSizes, svgSizes] = [[],[],[],[],[]]
        for (let i=0; i<lines.length; i+=2) { // i = i + 2
            const [pngName, pngSize, pngSize2, pngMode] = lines[i].split('\t')
            const [svgName, svgSize, svgSize2, svgMode] = lines[i+1].split('\t')
            pngs.push(this.#makePngColumns(baseUrl,pngName, pngSize, pngSize2, pngMode))
            pngSizes.push(this.#makePngSizeColumns(pngName, pngSize, pngSize2, pngMode))
            svgs.push(this.#makeSvgColumns(baseUrl,svgName, svgSize, svgSize2, svgMode))
            svgSizes.push(this.#makeSvgSizeColumns(svgName, svgSize, svgSize2, svgMode))
            modes.push(this.#makeSvgColorSchemeColumns(svgMode))
        }
        return `<table>
<tr><th rowspan="2">PNG</th>${pngs.join('')}</tr>
<tr>${pngSizes.join('')}</tr>
<tr><th rowspan="2">SVG</th>${svgs.join('')}</tr>
<tr>${svgSizes.join('')}</tr>
<tr><th title="light/darkモード対応">明暗</th>${modes.join('')}</tr>
</table>`
    }
    #makePngColumns(baseUrl, name, size, size2, mode, width=64, height=64) { return `<td class="checkered-pattern"><img src="${baseUrl}${name}" width="${width}" height="${height}" alt="${name}" title="${name}"></td>` }
    #makePngSizeColumns(pngName, pngSize, pngSize2, pngMode, width=64, height=64) { return `<td title="${pngSize2} B" style="text-align:center;">${pngSize}</td>` }
    #makeSvgColumns(baseUrl, name, size, size2, mode, width=64, height=64) { return `<td class="checkered-pattern"><object data="${baseUrl}${name}" type="image/svg+xml" width="${width}" height="${height}" alt="${name}" title="${name}"></td>` }
    #makeSvgSizeColumns(name, size, size2, mode, width=64, height=64) { return `<td title="${size2} B" style="text-align:center;">${size}</td>` }
    #makeSvgColorSchemeColumns(mode) { return `<td style="text-align:center; vertical-align:middle;">${mode}</td>` }
// SVGを使うときに知っておくといいことをまとめました
// https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e
}
