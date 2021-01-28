import 'reflect-metadata';

function Prop(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const type = Reflect.getMetadata('design:returntype', target, propertyKey);
        console.log(type)
    }
}

class Greeter {
    @Prop()
    getUsername(username: string): string {
        return username;
    };
}

// 实现路由Controller与GET、POST实现

const METHOD_METADATA = 'METHOD';
const PATH_METADATA = 'PATH';

const Controller = (path: string): ClassDecorator => target => {
    Reflect.defineMetadata(METHOD_METADATA, path, target);
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(METHOD_METADATA, method, target, descriptor.value);
        Reflect.defineMetadata(PATH_METADATA, path, target, descriptor.value);
    }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');

@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world';
  }

  @Post('/b')
  somePostMethod() {}
}

function isConstructor(name: string) {
    return name === 'constructor';
}

const isFunction = (item: any) => typeof item === 'function';

function mapRoute (instance: Object) {
    const prototype = Object.getPrototypeOf(instance);
    const methodNames = Object.getOwnPropertyNames(prototype).filter(item => !isConstructor(item) && isFunction(prototype[item]));
    let result: Array<object> = [];
    methodNames.forEach(methodName => {
        const path = Reflect.getMetadata(PATH_METADATA, prototype, prototype[methodName]);
        const method = Reflect.getMetadata(METHOD_METADATA, prototype, prototype[methodName]);
        result.push({
            method,
            path,
            fn: prototype[methodName],
            methodName
        });
    })
    console.log(result);
}

mapRoute(new SomeClass());