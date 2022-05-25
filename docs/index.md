## 目的

* 誰でも気兼ねなく自由に使える画像がほしい
    * 法的リスクを極限まで減らす
    * 改変、再配布、商用など一切の制約なし
* モナコインの布教に貢献したい

　そのためには次のことを満たす必要があると考えました。

## 目標

* ライセンスを[CC0][]にする
* ファイルサイズを小さくする
* 一覧できてダウンロードできるページを作る
* SVGでレスポンシブ対応する
* SVGでlight/darkモード対応する
* PNGでフォールバックする

### ライセンス

　[CC0][]です。ここにある画像はDMD様の素材を元に[私][]が改変したものです。

[CC0]:https://creativecommons.org/publicdomain/zero/1.0/deed.ja
[私]:https://ytyaru.github.io/ "ytyaru"

* [DMD様の素材を元にしてます][source.html]

[source.html]:./source.html

<details><summary>技術</summary>

### light/darkモード

　SVGには明暗モードに対応しているものがあります。OSのlight/darkモードに応じて色が変化します。

　Chromeブラウザではこれをテストできます。その手順は以下の通りです。

1. デベロッパツールを開く（<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>）
1. デベロッパツール右上<kbd>⚙⋮❌</kbd>のうち<kbd>⋮</kbd>をクリックする
1. <kbd>More tools</kbd>→<kbd>Rendering</kbd>をクリックする
1. デベロッパツール下にある<kbd>Rendering</kbd>タブをクリックする
1. `Emurate CSS media feature prefers-color-shceme`の所までスクロールする
1. その下にあるコンボボックスからテストしたいカラースキームを選ぶ
    * <kbd>prefers-color-shceme: light</kbd>
    * <kbd>prefers-color-shceme: dark</kbd>
1. SVGがその状態に応じた色になる

### SVG

#### light/dark + フォールバック

　SVGは`<img>`で表示すると内部のスタイルが適用されず、light/darkモードが適用されない。そこで`<object>`を使うと解決する。`<object>`でPNGにフォールバックするにはネストする。以下のように。

```html
<object data="some.svg" 
        type="image/svg+xml" 
        width="64" 
        height="64">
        <object data="some.png" 
                type="image/png" 
                width="64" 
                height="64">
        </object>
</object>
```

####  light/dark + フォールバック + リンク

　リンクやボタンにするには上記を`<a>`で囲む。

```html
<a href="#"><object data="some.svg" ... </object></a>
```

　だがこれはクリックできない。そこで以下CSSを追加する。

```css
a {
    display: inline-block;
}
object {
    pointer-events: none;
}
```

　情報源は以下。

* [SVGを使うときに知っておくといいことをまとめました - qiita][]

[SVGを使うときに知っておくといいことをまとめました - qiita]:https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e

#### 投げモナ

　[Mpurse API][Mpurse API を試す] で投げモナするときは以下。

```javascript
await window.mpurse.sendAsset(
  'MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu', 
  'MONA', 
  0.114114, 
  'plain', 
  'Good job!')
```

[Mpurse API を試す]:https://ytyaru.github.io/Html.Mpurse.Api.20220517160403/
[5分で暗号通貨モナコインを使う方法]:https://ytyaru.github.io/Html.Mpurse.Api.20220517160403/setup.html

　これを`<a>`の中に入れる。

```html
<a href="javascript:/*await*/ window.mpurse.sendAsset('MEHCqJbgiNERCH3bRAtNSSD9uxPViEX1nu', 'MONA', 0.114114, 'plain', 'Good job!')" title="投げモナする">
<object ...></object>
</a>
```

</details>

