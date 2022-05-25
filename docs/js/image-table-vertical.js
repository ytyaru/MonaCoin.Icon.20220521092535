class ImageTableVertical {
    make(sourceTsv) {
        const lines = text.split(/\r\n|\n/).filter(v=>v)
        const rows = []
        for (let i=0; i<lines.length; i+=2) { // i = i + 2
            const [name, pngSize, pngSize2, isColorScheme] = lines[i].split('\t')
            const [_, svgSize, svgSize2, x] = lines[i+1].split('\t')
            rows.push(this.#makeRow(
                './asset/image/',
                name.substring(0, name.lastIndexOf(".")),
                isColorScheme,
                pngSize, pngSize2,
                svgSize, svgSize2,
                64, 64,
            ))
        }
        return `<table>
<tr>
<th>名前</th>
<th title="light/darkモード対応">明暗</th>
<th>PNG</th>
<th>SVG</th>
</tr>
${rows.join('\n')}
</table>`

    }
    #makeRow(baseUrl, name, isColorScheme, pngSize, pngSize2, svgSize, svgSize2, width=64, height=64) { return `
<tr>
<th rowspan="2" style="text-align:center; vertical-align:middle;">${name}</th>
<td rowspan="2" style="text-align:center; vertical-align:middle;">${isColorScheme}</td>
<td class="checkered-pattern"><img src="${baseUrl}${name}.png" alt="${name}.png" width="${width}" height="${height}"></td>
<td class="checkered-pattern"><object data="${baseUrl}${name}.svg" type="image/svg+xml" width="${width}" height="${height}" alt="${name}.svg"></td>
</tr>
<tr>
<td title="${pngSize2} B" style="text-align:center;">${pngSize}</td>
<td title="${svgSize2} B" style="text-align:center;">${svgSize}</td>
</tr>`
    }
// SVGを使うときに知っておくといいことをまとめました
// https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e
}
