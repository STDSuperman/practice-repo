
function classDecorator(constructor: Function) {
    constructor.prototype.getGreeter = function getGreeter () {
        console.log(this.greeting);
    }
}

interface GreeterInterface {
    greeting: string;
    getGreeter?: Function;
}

@classDecorator
class Greeter implements GreeterInterface{
    greeting: string;
    getGreeter() {
        console.log(7777);
    }
    constructor(message: string) {
        this.greeting = message;
    }
}

const greeter = new Greeter('我是服务员');
greeter.getGreeter();