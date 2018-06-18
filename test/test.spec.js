"use strict";

var expect = require("chai").expect;
var Substitute = require("../lib/index").default;

var strings = [
        "My long $first $second long $third",
        "My long {first} {second} long {third}"
    ],
    obj = {
        first: {a: 'text'},
        third: null
    };

function defaultSubstitute() {
    new Substitute();
    var count = 0;

    function startCustom() {
        count += 1;
        if (count >= 4) {
            customSubstitute();
        }
    }

    describe("replace object values based on their keys with default Substitute", function () {
        it("replace object values based on many keys", function () {
            startCustom();
            var res = strings[0].substitute(obj);
            expect(res).to.equal("My long { a: 'text' } second=undefined long third=null");
        });

        it("replace object values based on many keys with another regex", function () {
            startCustom();
            var res = strings[1].substitute(obj, /{([^{]+)}/g);
            expect(res).to.equal("My long { a: 'text' } second=undefined long third=null");
        });
    });

    describe("no replace object values based on their keys with default Substitute", function () {
        it("no replace object values based on many keys", function () {
            startCustom();
            var res = strings[1].substitute(obj);
            expect(res).to.equal(strings[1]);
        });

        it("no replace object values based on many keys with another regex", function () {
            startCustom();
            var res = strings[0].substitute(obj, /{([^{]+)}/g);
            expect(res).to.equal(strings[0]);
        });
    });
}

function customSubstitute() {
    new Substitute(/{([^{]+)}/g, false, true, true);

    describe("replace object values based on their keys with custom Substitute", function () {
        it("replace object values based on many keys", function () {
            var res = strings[1].substitute(obj);
            console.log(res);
            expect(res).to.equal("My long [object Object] undefined long null");
        });

        it("replace object values based on many keys with another regex", function () {
            var res = strings[0].substitute(obj, /\$([^$ ]+)( |$)/g);
            expect(res).to.equal("My long [object Object] undefined long null");
        });
    });

    describe("no replace object values based on their keys with custom Substitute", function () {
        it("no replace object values based on many keys", function () {
            var res = strings[0].substitute(obj);
            expect(res).to.equal(strings[0]);
        });

        it("no replace object values based on many keys with another regex", function () {
            var res = strings[1].substitute(obj, /\$([^$ ]+)( |$)/g);
            expect(res).to.equal(strings[1]);
        });
    });
}

defaultSubstitute();