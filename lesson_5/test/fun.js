function myFunction () {
    let self = this;
    let a = 1;
    let functionDeclaration = function (b = 2) {
        console.log(self === this);
    }

    let arrowFun = (c = 3) => {
        console.log(self === this, this.a)
    };

    functionDeclaration();
    arrowFun();
}

myFunction.call("some");