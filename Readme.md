# Youtube Command

## Requirements
- Node.js
    - after v13
- Youtube Data API v3
    - api key

## Installation
```bash
npm i -g youtube-command
```

## Configuration
```bash
youtube config <key> [value]
```

### example
```bash
youtube config API_KEY foobar
```

## Usage
### Help
```bash
youtube --help
youtube data channel --help
```

### Get list of video ids
```bash
youtube data channel <channelId>
```

### Advanced
```bash
youtube data channel UC5nfcGkOAm3JwfPvJvzplHg > futaba.json
```

**result**
```javascript
// futaba.json
[{"id":"jyde3QdUYJ8"},{"id":"jX3n7WPxCLs"},{"id":"IJ98xRf-nVY"},{"id":"8_qAYejpBVk"},{"id":"zgdcTPjn0uA"},{"id":"sU1iOuObLKg"},{"id":"d6k3ZyWQSIM"},{"id":"n3e7VSUqFRI"},{"id":"UU6qaXhHOvs"},{"id":"3d5wTBQLC6M"},{"id":"o-G3v1cioIw"},{"id":"otqcQYE0tsM"},{"id":"Hutd9PLyv7o"},{"id":"bAXZq5ZaSic"},{"id":"NEpJ_4otMiU"},{"id":"JUsjzNY92fM"},{"id":"vzBMh18uGw0"},{"id":"2W0SQr2OpTQ"},{"id":"RMnLZ6Hdt4A"},{"id":"wOUhF0KwB-A"},{"id":"jpDhDa-3NPs"},{"id":"pNhWp-LuhuU"},{"id":"keIGGA2Fbsk"},{"id":"Z_Nio0uM2-o"},{"id":"-V96PrMr2xI"},{"id":"f1lVB_N_FIQ"},{"id":"lYUL2JQH-1M"},{"id":"MuQE8DyBshU"},{"id":"MYN0jkZrIqU"},{"id":"zS17s16OO9E"},{"id":"nKt6ruNaC64"},{"id":"lKW_Qy4gi-Q"},{"id":"cxNFt-wx6Z8"},{"id":"8bb-hclgU2Y"},{"id":"agGqwCUIEMw"},{"id":"7E7e6UKLnL8"},{"id":"G5wuSqOICdA"},{"id":"wrt1Lw5Org4"},{"id":"2xVEesnKiws"},{"id":"DoGG_JlF1pU"},{"id":"dkvXfZvw9Cw"},{"id":"hfkNnZaL0A8"},{"id":"XZYRgSdeGUE"},{"id":"yJVZ-WpWSpM"},{"id":"DuFpIURnzfU"},{"id":"K3xHwYHtzVs"},{"id":"w-oOZ06e44c"},{"id":"BTIbnwznB_U"},{"id":"bpA_MhmK3fU"},{"id":"NZXSnxD0q-0"},{"id":"sN2WvgBNtww"},{"id":"4d-oKZQXMRc"},{"id":"_3kHjURRgS8"},{"id":"rtTRVoTCIgA"},{"id":"3hAZ7-iLv04"},{"id":"QGPNL2tuntI"},{"id":"4oJpFLcHtyk"},{"id":"1yHqx7_ohCg"},{"id":"_QnYLnKIc6Q"},{"id":"SEfrJ59mvi8"},{"id":"HuH08FFnJUE"},{"id":"xvm8bofGJEE"},{"id":"6sJplRgJ8XU"},{"id":"fQ-y6YluXd0"},{"id":"lzPsJ7XmbZM"},{"id":"6FUMrWUf8IE"},{"id":"hKpHc_ujoN4"},{"id":"JeMAzSBCItQ"},{"id":"i3dwW3xXnOc"},{"id":"cwkbQ8LmOSg"},{"id":"YCpIH_6HghQ"},{"id":"G8KjT_hkgYM"},{"id":"TCjweTjrvV8"},{"id":"N5ByWU2aYKw"},{"id":"zv9XS2apY6o"},{"id":"2Fypr1rQbM4"},{"id":"x5JZFk0q-0A"},{"id":"c7Yk4D14__Q"},{"id":"GuTVKarRfaY"},{"id":"iSNZCRtaYAk"},{"id":"2pZGWk9cv5Q"},{"id":"Ql8FYTiHsNQ"},{"id":"VQtSwv8RhhU"},{"id":"-dfdVuE2dtg"},{"id":"kK_e3uA32hs"},{"id":"MhEELh8UmmI"},{"id":"gaHJ2SjQktY"},{"id":"P3d7IgZ1WBA"},{"id":"7zymBmLefqk"},{"id":"jDnp-HPzDQo"},{"id":"b0gooYl8MZc"},{"id":"UPdC-qnjxmo"},{"id":"UKgTh8vZzJ8"},{"id":"B-HTUS5xpig"},{"id":"T6UctRjmQZc"},{"id":"KU7xJTMgEXw"},{"id":"7JmfWHpKJO0"},{"id":"MPSdeEUaFo8"},{"id":"SdVsfQUM4ss"},{"id":"hNa5KXkwdNY"},{"id":"PfWEIAeyx10"},{"id":"KwD3xgZ_hog"},{"id":"KMjNcOLtvhc"},{"id":"aCztyO3AzHg"},{"id":"Bga3zpl-rcc"},{"id":"RjTVj0psZ2w"},{"id":"LlPfxfAc9mU"},{"id":"BN3GLp2zUOk"},{"id":"bDiu8a4BqVQ"},{"id":"QcwOULGvAQg"},{"id":"p5aVYh8I2B0"},{"id":"bIgaY-WhQbA"},{"id":"K26YpeRSlGM"},{"id":"clx-D1acwjk"},{"id":"2O4hEiRK8yY"},{"id":"e32a_IPyfNo"},{"id":"LkApa141gI4"},{"id":"FN1PLpSLtwE"},{"id":"N5pZuj7BtRM"},{"id":"EYNVT4q5kGk"},{"id":"S_MX0gG1YXI"},{"id":"i3v240lEG-M"},{"id":"IwYbc4ali9k"},{"id":"UGyNuIptbj4"},{"id":"iRWfPKbbZHM"},{"id":"a_teQDfSu1g"},{"id":"R9WtU954rME"},{"id":"tkv_dzT0Fsk"},{"id":"4dBZz-2AHaE"},{"id":"nMOSMfJ1lAw"},{"id":"9FCy7XRWCOQ"},{"id":"cHbsT9JKIsQ"},{"id":"Li1QYxDVVWU"},{"id":"6sgCs-16ZfA"},{"id":"DkNVO0gPDTw"},{"id":"t0On84bkN7o"},{"id":"bv3B3pcA6ic"},{"id":"0ateKqzidlc"},{"id":"C9-_htCdbKk"},{"id":"4La9VypbMeM"},{"id":"GWW5gxrBk30"},{"id":"er7mJnStulU"},{"id":"QS_rFUFTR2Y"},{"id":"MljlN7dZGqw"},{"id":"2txo_msH3pk"},{"id":"Sx1LHgZcSAc"},{"id":"5vJ7R-URz30"},{"id":"XPwmXJ2qcNU"},{"id":"QQzGzhTrisw"},{"id":"OnAdE1nUukc"},{"id":"ct-qHdG4fWI"},{"id":"cMBHWY7t29M"},{"id":"MZ3ebHLX7Gg"},{"id":"Yteb0ZfOulE"},{"id":"7AC41UHq4SM"},{"id":"irEJuSj8On8"},{"id":"4La9VypbMeM"},{"id":"KWYNJswwO1s"},{"id":"kyL87y1qP4w"},{"id":"pFz1CSeyJ0c"},{"id":"FKJBZZX1le0"},{"id":"Yh5cVKzWcSI"},{"id":"qRGQGXLWCUc"},{"id":"iTg0z2KflbY"},{"id":"8nlZ9TWaj8Q"},{"id":"1T8THhaZRnI"},{"id":"xOVSD7DdoMM"},{"id":"naUQZJ7eAqM"},{"id":"q-wEuESSMqc"},{"id":"-ruVeFmQaEc"},{"id":"2mVXFH5e0Y8"},{"id":"jTPJVxl3_yM"},{"id":"29XJ6XvBt-o"},{"id":"3nzIS7Tu6Rw"},{"id":"0HSwAXpWXEA"},{"id":"UXKgy1mmf68"},{"id":"UCZ3sVhGils"},{"id":"Kx5TdxtvTas"},{"id":"Crt0nPBRXQI"},{"id":"A9q1c44zWbI"},{"id":"cS9LGJwsFUg"},{"id":"4Plbt80fyu4"},{"id":"aDKzhaVXpcs"},{"id":"y0hFGzLyK1c"},{"id":"fI85YKjmO_c"},{"id":"H3aUIc0G3rE"},{"id":"s8hkW5RCRY0"},{"id":"Vh-0egJTUgk"},{"id":"7xQgKKa2N3g"},{"id":"90-gSEpIuBY"},{"id":"T1239doFYkQ"},{"id":"ynyUm8QNGhQ"},{"id":"5CYmHy224pc"},{"id":"S7qRc7SmMds"},{"id":"xWNjgZ3Qz88"},{"id":"denkWm_CLdI"},{"id":"G3VROLUoa4Y"},{"id":"NKbCJt3CobA"},{"id":"wR6FT2YiZAw"},{"id":"2o_19yh8iDc"},{"id":"-T0qq58joRs"},{"id":"xFlk7cVPvh4"},{"id":"QGGH2gvAe9M"},{"id":"0owyr9SGEAg"},{"id":"XdZtA8Dbgcs"},{"id":"xYnEAP3DohU"},{"id":"-GbQLhUgSCs"},{"id":"esrHI__nMNw"},{"id":"hnlSK13NpWM"},{"id":"pGLPUk8Fh8k"},{"id":"hykQyE2fAPo"},{"id":"wyEPtpL6x5w"},{"id":"Xkj32mU58_E"},{"id":"dzu9FTKsmvc"},{"id":"N_Lh9Q_0i9Y"},{"id":"5MKhriaYyvE"},{"id":"8UqjIKbtBx8"},{"id":"bHV8dVSKN4U"},{"id":"JNdNzISz4No"},{"id":"r6bePiBGzXg"},{"id":"8sLzs69JH-s"},{"id":"dC6wZRzGstU"},{"id":"4BuynCksxBg"},{"id":"ugMlp1v7T7w"},{"id":"PdZdKVtWd3g"},{"id":"Fq7tw7xtBws"},{"id":"x6TBnOOAH2I"},{"id":"tTZA1qAh8YQ"},{"id":"Scor4Zo4ymU"},{"id":"dhUytM-EH_Q"},{"id":"GFno9LxPriU"},{"id":"pDJ581S_Txg"},{"id":"tLlLOSP-PXA"},{"id":"WPHYOAcgrGg"},{"id":"bNe8-lu19Ns"},{"id":"XWGiNmK_FYU"},{"id":"ygFXL3nhxvc"},{"id":"WXIOZItvqBQ"},{"id":"ODFNe8pILpY"}]
```
