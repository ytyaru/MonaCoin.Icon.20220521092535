window.addEventListener('DOMContentLoaded', async(event) => {
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', isUnlocked => console.log(isUnlocked))
          .on('addressChanged', address => console.log(address));
    } catch(e) { console.debug(e) }
    const baseUrl = `./asset/image/`
    let res = await fetch(`${baseUrl}list.tsv`)
    let text = await res.text()
    const tableH = new ImageTableHorizon()
    const monaBtn = new MonaButton()
    console.debug(text)
    document.getElementById(`image-table-horizon`).innerHTML = tableH.make(baseUrl, text)
    document.getElementById(`throw-mona-buttons`).innerHTML = monaBtn.make(baseUrl, text)
    window["markdown"].ready.then(async(markdown) => {
        res = await fetch(`index.md`)
        text = await res.text()
        document.getElementById(`content`).innerHTML = markdown.parse(text)
        hljs.highlightAll();
    })
    const mention = new WebMention(30) 
    await mention.make() 
});

