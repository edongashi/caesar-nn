# caesar-nn

Feedforward neural network trained using `brain.js` with around 1000 words and sentences in Albanian to learn frequency patterns between ciphertext and encryption keys.

## Training the model

A trained model is already given in `model.js`

```console
$ node train
```

## Running the model

```js
const predict = require('./predict.js')
console.log(predict('Ahrptp tihola al zoabulu whzkpal ul hmlyzp al zoalwpzl zptl.'))
```

Outputs:

```
[ { text:
     'Takimi mbahet te shtunen pasdite ne afersi te shtepise sime.',
    key: 7,
    probability: '91.35%' },
  { text:
     'Elvtxt xmlspe ep dsefypy aldotep yp lqpcdt ep dsepatdp dtxp.',
    key: 22,
    probability: '3.37%' },
  { text:
     'Szjhlh lazgds sd rgstmdm ozrchsd md zedqrh sd rgsdohrd rhld.',
    key: 8,
    probability: '3.13%' } ]
```
