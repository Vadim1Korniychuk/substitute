# Substitude
Substitute keys in a string to values of json.

## Install ##
``` bash
npm i --save substitude
```

## Include ##
```
import Substitude from 'substitude'
```

## Initialize ##
```
new Substitute();
```
or
```
new Substitute(/{([^{]+)}/g, false, true, true);
```

#params# 
```$xslt
regex: regex for replacing, default - /\$([^$ ]+)( |$)/g
inspectObject: flag for parse object, default - true
outUndefined: flag for out undefined, default - false
outNull: flag for out null, default - false
```

## Usages ##
```
console.log("My long {first} {second} long {third}".substitute({
    first: {value: 'text'},
    third: null
}, /{([^{]+)}/g));
|
or with custom regex
|
console.log("My long $first $second long $third".substitute({
    first: {a: 'asgsag'},
    third: null
}));``
```