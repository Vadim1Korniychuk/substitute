import util from 'util';

const setSubstitute = (self) => {
    String.prototype.substitute = function (o, r) {
        r = r || self.regex;
        if (self.inspectObject)
            return this.replace(r, (_, k, s) => {
                let v = o[k];
                s = typeof s === 'string' ? s : '';
                return self.outsBan.includes(v) ? `${k}=${v}${s}` : typeof v === 'string' ? `${v}${s}` : `${util.inspect(v, false, null)}${s}`;
            });
        return this.replace(r, (_, k, s) => {
            let v = o[k];
            s = typeof s === 'string' ? s : '';
            return self.outsBan.includes(v) ? `${k}=${v}${s}` : `${v}${s}`;
        });
    };
};

export default class Substitute {
    constructor(regex, inspectObject, outUndefined, outNull) {
        this.regex = regex || /\$([^$ ]+)( |$)/g;
        this.inspectObject = typeof inspectObject !== 'undefined' ? inspectObject : true;
        this.outsBan = [];
        if (!outUndefined) this.outsBan.push(undefined);
        if (!outNull) this.outsBan.push(null);
        setSubstitute(this);
    }
}