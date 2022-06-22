
[![Module Federation.jpg](https://s3.ax1x.com/2021/03/07/6KH4Qe.jpg)](https://imgtu.com/i/6KH4Qe)

## Module Federation介绍
`Module Federation`使 `JavaScript` 应用可以动态运行另一个 `JavaScript` 应用中的代码，同时可以共享依赖。

如何理解上面这句话呢，我们可以从实际场景出发来看待这项技术。在我们日常开发中，经常能遇到需要复用一段代码逻辑的场景，一般我们可以从以下几种方式去实现诉求。

### 文件抽离方式

如果说只需要在当前项目下进行复用，那么这个过程是十分简单而快速的，我们可以新建一个`js`文件，将这段代码放进去，并暴露出来即可实现需求。

虽说这种方式很简洁并且高效，但它的局限性也是十分明显，它仅支持当前项目下进行使用，如果说我们想要多个项目进行复用，我们就需要把相关代码进行复制粘贴，也就是十分简单而又实用的`CV`大法，这种方式无疑是最粗暴的，它很可能在我们项目越来越大之后，让你在后续的维护过程中痛哭流涕。

### npm包方式
对于多项目进行共同依赖的场景，我们一般比较常见的就是维护一个公共`npm`包的方式，在需要使用的项目中进行安装并进行导入。这种模式可以弥补我们上述方式的不足，实现多项目共用的能力，这是它的优势，避免冗余代码。

但是，这种方式最显著的缺陷在于，我们每次对这个公共库进行修改的同时，如果想让其他依赖的项目能即时享用新特性，那么我们需要对这些项目进行更新版本并重新装包，然后实施打包上线的流程，对于大型项目并且牵扯到复杂逻辑的情况下，这个代价是十分昂贵的。

> 说了这么多，终究还是要让今天的主角出场了。
### Module Federation方式
针对上面场景存在的问题，我们来逐一聊聊这哥们的实力。

还是上述的复用逻辑的场景，如果换成`Module Federation`来做，我们需要先把需要复用的代码抽离到单文件中（不抽也行，只要能暴露出来就行），接着我们配置一下`Module Federation`的配置，将这个文件进行导出，使用方就可以直接远程复用这个文件了，并且不需要在乎这个复用文件中的依赖项，它会自动给我们处理好。

同时如果多个项目使用了这个复用文件，那么我们在对它进行改动时，只需要对这个提供服务的项目进行发版即可，使用方可以实时获取到新代码。

> 说的直白点就是，一个已经上线的项目，其他项目可以直接使用这个项目中的指定`js`文件，并且无需关心其依赖。

我们这里针对以上场景不同方案做个简单对比：

|            | js文件 | npm包 | Module Federation |
| ---------- | ------ | ----- | ----------------- |
| 操作复杂度 | 简单   | 中等  | 中等              |
| 发版复杂度 | 复杂   | 中等  | 简单              |
| 可维护性   | 低     | 高    | 高                |

## 深入Module Federation

通过上面场景介绍，相信你对`Module Federation`已经有了一个大概的印象——这哥们能直接使用远端项目的指定`js`文件。

接下来，我们来继续探究这项技术对我们日常业务带来的福音。

[![架构概览.png](https://s3.ax1x.com/2021/03/07/6M2UED.png)](https://imgtu.com/i/6M2UED)

> 这里借用[不知名大佬](https://ichi.pro/ru/arhitektura-micro-fe-webpack-5-ob-edinenie-modulej-i-nastraivaemyj-kod-zapuska-10768553412204)的一张图

### 背景

众所周知，在当前`Vue`、`React`框架横行的时代下，我们写的最多的莫过于各式各样的组件，不仅如此，为了项目的可维护性，我们也会抽离出许许多多的公共组件或方法，也正是在这个需求下，催生了一批批优质的第三方组件库或者`utils`库。

同样的，这些第三方库也面临着我们开篇聊到的问题，如何快速而方便的进行发版和维护、如何降低用户使用负担这也是一个需要值得大家思考的问题。

在一些大型项目中，我们往往需要安装大量的第三方包，在`webpack`的帮助下，我们虽然能方便的进行项目的开发，但不得不提嘴一说的地方就是，在项目优化做的不好的情况下，出现一行代码改动等几分钟还真是有可能的事。

也正是因为这项缺陷，诸如尤大等各个前端大牛们都在探索`no webpack`的方式，比如最近大火的`vite 2.0`的诞生，也的确给深受`webpack`“折磨”的许多开发带来了新的解决方案。基于这个角度来看，难道`webpack`除了不断的走优化之路来降低构建时间之外就真的没有什么其他的好的办法了吗？

> 从前或许我会回答说`Yes`，但今天我想说一次`NO`，`webpack`还能再抢救抢救！

本文对应实践项目地址：[项目源码地址](https://github.com/STDSuperman/practice-repo/tree/master/module-federation)

> 建议`clone`项目进行体验。

### Module Federation应用场景

#### 提供公共服务能力

这一点笔者主要想提的就是它能提供远程公共组件和`js`模块的能力。

怎么说呢，如果运用了这项能力，我们就不再需要组件库`npm`包这种东西了，直接抽一个项目用来承载这项能力，所有的公共组件直接通过一个远程链接就能直接获取，完全不需要安装，就可直接使用。

话不多说，上码：

```html
<template>
  <div id="app">
    <h1>Hello Other Vue2</h1>
    <HelloWorld msg="我是本地Vue组件"></HelloWorld>
    <HelloWorld2 msg="我是远程Vue组件"></HelloWorld2>
  </div>
</template>

<script>
import HelloWorld2 from '@v2hw/HelloWorld'
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld2,
    HelloWorld
  }
}
</script>
```

我们先不用管具体怎么配置的，只需要知道这个`import HelloWorld2 from '@v2hw/HelloWorld'`是一个用来导入一个远程的组件的，然后我们就能直接进行注册使用了。

看看效果：

[![preview.png](https://s3.ax1x.com/2021/03/07/6KvJ6f.png)](https://imgtu.com/i/6KvJ6f)

左边渲染的是当前项目下的组件，右边则表示的是从远端获取并渲染的组件，是不是十分刺激。

> 有了这项能力，还要维护个🔨组件库。

同理，这种远程引入的能力一样适用`js`模块。

#### 让重复构建什么的都见👻去吧

发散思路，除了能进行组件复用，我们还能用它做什么？

>  上面笔者狠狠踩了`webpack`的构建速度一脚，这回也该给个甜枣安慰一下这哥们了。

让我们细细回想一下，我们日常业务中，大多数情况下，我们开发的项目体积中，占比最大的应该当属我们那让人又爱又恨的第三方包了吧。不仅如此，这些第三方包一般是不会进行修改的，所以每次构建（先不管缓存），我们似乎都是在做重复劳动，那我们能不能借助`Module Federation`能力将这些第三方包都放在远端进行维护，我们只需要用`runtime`的方式引入就可以了。

说干就干，码来：

```html
<template>
	<div class="hello">
		<Card hoverable style="width: 240px">
			<img
				slot="cover"
				alt="example"
				src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
			/>
			<CardMeta title="Vue HelloWorld">
				<template slot="description">
					{{ msg }}
				</template>
			</CardMeta>
		</Card>
	</div>
</template>

<script>
import { Card } from '@v2hw/ant-design-vue'
// import { Card } from 'ant-design-vue'
export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
  components: {
    Card,
    CardMeta: Card.Meta
  }
};
</script>

```

这里笔者将原先直接从当前项目导入`ant-design-vue`改成从远程项目直接获取的方式，看是否能够带来构建性能的提升。

光从代码上看无法明显的看出两种方式带来的差距，我们通过他们的运行结果来进行分析（注意红色圈圈中的内容即可）：

![webpack-build-time.png](https://s3.ax1x.com/2021/03/07/6MCQAS.png)](https://imgtu.com/i/6MCQAS)

我们从图中来看，上面一个圈中是采用远程依赖的构建时间，后者就是采用本地第三方包方式的构建时间，一个是`2713ms`、一个是`4695ms`，提升速度：**42%**左右，这还仅仅只是一个第三方包就能带来如此大的提升，一般稍微大点的项目第三方包的数量都是十分庞大的，如果全量移交远端，那么我们每次代码编写仅仅只需要构建我们编写的代码，而无需关心第三方包，这种提升的确让人十分激动。

这个时候可能会有笔者来问了，那我直接将所有第三方全部用`cdn`形式引入不就完事了，和你这个达到的效果也是一样的。

诚然，这种方式和`cdn`方式引入然后配合`webpack`的`external`有着异曲同工之妙，但采用`webpack module federation`可以把这个包的控制权掌握在自己手里，我们不用担心如果哪天这个`cdn`链接挂了，我们却毫不知情，并且对于很多根本不提供`cdn`方式的第三方包，就没法达到你想要的效果了，而这也仅仅只是`webpack module federation`能力中的一项而已。

### 详细配置方式

这里我们需要借助一个`webpack5`自带的插件：`ModuleFederationPlugin`，我们需要配置这个插件来实现我们的需求，首先看看这个插件的配置项：

| 字段名   | 类型   | 含义                                                                   |
| -------- | ------ | ---------------------------------------------------------------------- |
| name     | string | 必传值，即输出的模块名，被远程引用时路径为`${name}/${expose}`          |
| library  | object | 声明全局变量的方式，name为umd的name                                    |
| filename | string | 构建输出的文件名                                                       |
| remotes  | object | 远程引用的应用名及其别名的映射，使用时以key值作为name                  |
| exposes  | object | 被远程引用时可暴露的资源路径及其别名                                   |
| shared   | object | 与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同一份依赖 |

有了这些我们就能进行实战演习了：

> 这里注意提一点，在`ModuleFederationPlugin`的世界里，所有项目既可以是远程组件的提供方，也可以是远程组件的使用方，为了方便区分，这里只演示单一提供方和使用方。

#### 组件提供方

我们想要使用一个远程组件，那么我们就需要配置一下这个远程组件的提供方。

> 为了方便解读，笔者这里移除了其他不必要的代码，仅留下了`ModuleFederationPlugin`插件的使用。

```js

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: 'vue2Project',
            filename: 'hello-world.js',
            exposes: {
                './HelloWorld': path.resolve(projectDir, './src/components/HelloWorld'),
                './ant-design-vue': path.resolve(projectDir, './src/utils/ant-design-vue')
            },
            shared: [vue,'ant-design-vue']
        })
    ]
}
```

首先定义`name`和`filename`属性，这两个很关键，在使用远程组件的时候会被用到。

##### exposes

故名思意，就是暴露给外部使用的意思。笔者这里暴露了两个组件，一个是一个常规的`HelloWorld.vue`组件，另一个是`ant-design-vue`第三方包，也就是我们前面演示的使用远程第三方包的服务提供方，这里不用纠结这个`src/utils/ant-design-vue`里是啥，给你就是一个普通的`js`文件然后将`ant-design-vue`导入并暴露了一下：

```js
// src/utils/ant-design-vue
export * from 'ant-design-vue';
```

这里稍微解读一下这个`exposes`对象里的用法：

- 属性名：一般使用`./xxx`，定义我们暴露出这个组件的名字，然后在使用的时候就能直接写`变量名/xxx`了，也就是前面演示导入方式。

  - ```js
    import { Card } from '@v2hw/ant-design-vue'
    ```

- 属性值：表示这个组件的实际位置。

##### shared

这个属性也很有意思，就是我们在使用远程组件的时候，这个组件如果依赖了某个第三方包，那么它就会首先从使用方的`shared`中查找，如果查找到之后，就会直接使用当前项目的，否则则从该远程组件的提供方进行获取。

#### 组件使用方

当我们的提供方项目启动之后，我们就可以轻松在另一个项目中进行使用了：

##### 入口文件修改

对于一般的项目来说，我们的入口文件都是`src`目录下`index.js`或`main.js`其他的也同理，同时这个入口文件中做了对相关框架或库的一个初始化工作，比如下面这个`Vue`项目的入口文件：

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

```

这里是一个最基础版的实例化`Vue`的过程，那么我们在使用`module federation`中需要怎么修改呢？

其实也很简单，在同级目录下（不同级也行，看你喜好），新建一个`bootstrap.js`，然后把原来入口文件中的内容全部转移到这个文件中去，接着在原来的入口文件中导入并执行这个文件：

```js
// index.js或main.js
import('./bootstrap.js')
```

这样就可以继续往下走啦。

> 这里一不留神就掉进去了，真是巨坑，当时笔者就因为没动这个入口文件，半天都没弄出来，官网还啥也没有😭。

那么为什么要这么做呢，这其实是`module federation`的一个依赖前置的概念，如果是同步执行，那么就无法保证在启动项目的时候已经准备好了依赖模块，所以这里采用`import`的方式实现异步，然后再由`webpack`帮我们去分析依赖，并等待前置依赖加载好之后再执行`bootstrap`中的相关内容启动项目。

> 这里所指的前置依赖，主要是我们当前项目采用`module federation`来使用远程组件的依赖。
###### webpack配置

```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: 'vue2TwoProject',
            filename: 'hello-world.js',
            exposes: {
                './HelloWorld': path.resolve(projectDir, './src/components/HelloWorld')
            },
            remotes: {
                '@v2hw': 'vue2Project@http://localhost:5001/hello-world.js'
            },
            shared: {
                vue: {
                    import: "vue",
                    shareKey: "vue",
                    shareScope: "default",
                    singleton: true
                }
            }
        })
    ]
}
```

其他几个属性也就不多提了，上面也介绍完了，这里主要关注一下这个`remotes`。

##### remotes

用于配置远程项目的引用，属性名表示这个引用的别名（全局唯一值），属性值由几个部分组成：`{name}@{url}/{filename}`：

- name： 远程项目的名字，也就是远程组件提供方`ModuleFederationPlugin`配置中的`name`字段。
- url： 远程项目的地址
- filename：远程组件提供方`ModuleFederationPlugin`配置中的`filename`字段。

接下来就能直接在项目中使用了：

```js
import { Card } from '@v2hw/ant-design-vue'
```

是不是一下子思绪就清晰了，这个`@v2hw`远程项目暴露了这个`ant-design-vue`属性，所以我们就可以直接这种方式进行获取了。

除了上述这种配置方式以外，你也可以借助`library`配置的方式来使用远程组件，区别就是我们需要在项目中引入远程项目的`js`文件，笔者还是比较喜欢这种直接配置方式，不太喜欢再多此一举引入`script`标签，这里就不进行演示了，有兴趣的可以去官网查找。

> 关于动态引入远程组件的方式请往后看。

## 奇淫技巧

既然我们的项目具备了使用其他项目远程组件的能力，那是不是...（嘿嘿嘿）可以尝试一下在不同框架间互用组件呢？比如`Vue3`使用`Vue2`组件，或者`Vue`中使用`React`项目的组件？

> 想想都刺激，`try`一下。

### Vue3使用Vue2组件

通过前面的讲述，相信大家对远程组件的导入应该也有了一定的认识，在同版本的`Vue`项目中，我们可以将组件导入之后直接进行注册使用，而对于不同版本的`Vue`组件来说，我们需要做一个适配器的能力，也就是把不兼容的组件变成兼容的，这里来演示一下如何使`Vue2`组件能够在`Vue3`中使用：

```html
<template>
  <div id="vue2HW"></div>
  <Vue2HelloWorld></Vue2HelloWorld>
</template>

<script>
import { vue2ToVue3 } from './utils'
import HelloWorld2 from '@v2hw/HelloWorld'
console.log(HelloWorld2);

export default {
  name: 'App',
  components: {
    Vue2HelloWorld: vue2ToVue3(HelloWorld2, 'vue2HW')
  }
}
</script>
```

从代码中看，与之前`Vue2`项目使用`Vue2`远程组件不一样的是，这里在注册的同时调用了一个方法，从这个方法的名字上来看我们能大概知道这是一个将`Vue2`组件转化为`Vue3`能识别的结构的方法，接下来我们来看看这个方法具体做了哪些事。

#### Vue适配器

在研究详细代码之前，我们先了解一下我们上述导入的组件数据究竟长成啥样（注意上面代码的`console.log`）:

[![Vue2组件.png](https://s3.ax1x.com/2021/03/07/6MYX6A.png)](https://imgtu.com/i/6MYX6A)

没错，就是我们熟悉的`Vue2 Options`写法的组件，是不是很清晰了，接下来我们来研究怎么转换：

```js
import Vue2 from './vue2';

export function vue2ToVue3(WrapperComponent, wrapperId) {
    let vm;
    return {
        mounted() {
            vm = new Vue2({
                render: createElement => {
                    return createElement(
                        WrapperComponent,
                        {
                            on: this.$attrs, // Vue3把Vue2的`$listeners`与`$attrs`合并到`$attrs`上去了
                            attrs: this.$attrs,
                            props: this.$props,
                            scopedSlots: this.$scopedSlots
                        }
                    )
                }
            });
            vm.$mount(`#${wrapperId}`)
        },
        props: WrapperComponent.props,
        render() {
            vm && vm.$forceUpdate();
        }
    }
}
```

我们需要知道的是，对于我们`Vue`组件模板来说，最终都会被编译成一个`render`函数提供渲染能力，故，我们需要将我们从远程获取到的`Vue2`组件数据变成`Vue3`组件兼容的结构，保证`Vue3`能够正确的解析该组件。

从代码中看，我们`return`了一个包含`mounted`、`props`、`render`三个属性的对象，相信大家对这三个属性也不太陌生（如果有不熟悉`render`属性的可以参考`Vue`官网`jsx`部分），组件进行每次更新和渲染时，都会调用`render`方法，所以这里直接对我们创建的`vue2`实例进行更新即可。第一步先定义一个`vm`变量，用于后续接收实例化后的`Vue`对象，然后让我们看到这个`mounted`函数，接下来重点来关注这个函数所做的事。

我们这里导入一个一个`Vue2`版本的包，然后使用这个包对传入的`Vue2`组件进行渲染，同样内部采用`render`函数的方式，调用`createElement`方法执行渲染，并对需要传入该组件的属性进行传递，由于`Vue3`和`Vue2`的特殊性，`on`属性传入的也是`Vue3`的`$attrs`属性。

然后渲染完成之后，再手动调用`$mount`进行挂载，挂载对象为传入的`dom`上的`id`。

就这样，一个简单的`Vue2`转`Vue3`就完成了，是不是也十分简单呢。

#### 动态引入

前面我们在使用远程组件的时候采用了配置化的方式，这种方式在有些需要灵活动态引入的时候就显得不够方便了，接下来演示一下动态组件导入的方式：

> 接下来采用`Vue3`项目进行演示，不太了解也没啥关系，使用其他框架也一样的。

```html
<template>
  <div id="vue2Remote"></div>
  <dynamicHelloWorld></dynamicHelloWorld>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { vue2ToVue3, loadRemoteComponent } from './utils'

export default {
  name: 'App',
  components: {
    dynamicHelloWorld: defineAsyncComponent(async () => {
        const component = await loadRemoteComponent({
            url: 'http://localhost:5001/hello-world.js',
            scope: 'vue2Project',
            module: './HelloWorld'
        });
        return vue2ToVue3(component.default, 'vue2Remote');
    })
  }
}
</script>
```

这里使用了`Vue3`的`defineAsyncComponent`注册异步组件的方法，因为动态获取远程组件会有一个请求远程组件的过程，所以是异步的。

同时这里核心部分就是这个`loadRemoteComponent`方法，它接受三个参数：

- url：远程项目地址。
- scope：远程项目的名字。
- module：远程项目中的指定模块。

然后我们来研究下这个`loadRemoteComponent`中又是怎么实现的吧：

```js
export async function loadRemoteComponent(config) {
    return loadScript(config).then(() => loadComponentByWebpack(config))
}

function loadScript(config) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = config.url
        script.type = 'text/javascript'
        script.async = true
        script.onload = () => {
            console.log(`Dynamic Script Loaded: ${config.url}`)
            document.head.removeChild(script);
            resolve();
        }
        script.onerror = () => {
            console.error(`Dynamic Script Error: ${config.url}`)
            document.head.removeChild(script)
            reject()
        }
        document.head.appendChild(script)
    })
}

async function loadComponentByWebpack({ scope, module }) {
    // 初始化共享作用域，这将使用此构建和所有远程提供的已知模块填充它
    await __webpack_init_sharing__('default')
    const container = window[scope] // 获取容器
    // 初始化容器，它可以提供共享模块
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    return factory();
}
```

我们先观察到这个`loadRemoteComponent`方法，它内部`return`了获取到的远程组件的数据，往下看这个`loadScript`方法，它返回了一个`Promise`，内部的代码我们稍微瞄一眼就知道这里是在使用`js`动态创建`script`标签的方式来加载一个远程`js`文件，当加载完毕时，将这个标签从页面中移除，然后结束。

当`js`文件加载完毕之后，页面中就拿到了远程项目暴露的组件信息，这个时候，我们就能使用` loadComponentByWebpack`来加载指定的组件了，这个函数中主要就是初始化远程组件所需的环境，并根据我们传入的`module`，从相关作用域中查到到对应的模块进行返回。

### React中引入Vue2组件

同理，这个过程也需要一个`Adapter`，这里笔者就没有自己写一个了，直接采用第三方包`vuera`来实现这个效果了。

> 安利安利，这个包支持在`Vue`中使用`React`，也支持在`React`中使用`Vue`。

```js
import React, { useState } from "react";
import { VueWrapper } from "vuera";
import VueHelloWorld from "@v2hw/HelloWorld";
import styled from 'styled-components'
import { Card } from "antd";
const { Meta } = Card;

const AppDiv = styled.div`
  display: flex;
  justify-content: space-around;
`

const ReactContainer = styled.div`
  margin: 10px;
  display: inline-block;
  width: 240px;
  height: 400px;
`

function App() {
	return (
		<AppDiv>
			<ReactContainer>
				<Card
					hoverable
					style={{ width: 240 }}
					cover={
						<img
							alt="example"
							src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
						/>
					}
				>
					<Meta
						title="Hello World!"
						description="我是React组件"
					/>
				</Card>
			</ReactContainer>
			<VueWrapper component={VueHelloWorld}></VueWrapper>
		</AppDiv>
	);
}

export default App;

```

看看效果

[![VueInReact.png](https://s3.ax1x.com/2021/03/07/6MR1Ig.png)](https://imgtu.com/i/6MR1Ig)

## 原理剖析

[项目源码地址](https://github.com/STDSuperman/practice-repo/tree/master/module-federation)

首先克隆项目到本地，进入`module-federation`目录下（这里将以此目录中`vue2`与`vue2-two`两个子项目进行演示），然后执行构建命令（详见`package.json`）。

1. `npm run build:vue2:dev`或`yarn build:vue2:dev`
2. `npm run build:vue2:two:dev`或`yarn build:vue2:two:dev`

执行完以上命令之后，我们就拿到了这两个子项目的构建结果（结果输出到`dist`目录下对应目录），我们给这两个项目指代一个名字：

- 项目A：`vue2`
- 项目B：`vue2-two`

依赖关系为：项目B采用`module federation`使用了项目A暴露出来的一个远程组件，故A是提供者，B是消费者。

首先来看看项目B也就是消费者构建的产物，对于远程组件或库的使用部分源码（为了方便理解，笔者这里删除了一些复杂代码）：

```js
// dist/vue2-two/hello-world.js

// 依赖的chunk和其内部依赖关系，这里表示我们使用的ant-design-vue来自webpack/container/remote/@v2hw/ant-design-vue
var chunkMapping = {
	"webpack_container_remote_v2hw_ant-design-vue": [
		"webpack/container/remote/@v2hw/ant-design-vue"
	]
};
// 对应模块的所有依赖
var idToExternalAndNameMapping = {
	"webpack/container/remote/@v2hw/ant-design-vue": [
		"default",
		"./ant-design-vue",
		"webpack/container/reference/@v2hw"
	]
};
__webpack_require__.f.remotes = (chunkId, promises) => {
    // 判断当前需要加载的chunk是否在module-federation配置项中的remotes中声明，也就是是否存在于上面的chunkMapping中
	if(__webpack_require__.o(chunkMapping, chunkId)) {
        // 根据当前加载模块在chunkMapping中的映射,找到该chunk依赖的其他模块
		chunkMapping[chunkId].forEach((id) => {

            // 根据所需要加载的模块在idToExternalAndNameMapping中的映射，找到所需要的其他依赖
			var data = idToExternalAndNameMapping[id];

			var onFactory = (factory) => {
				data.p = 1;
				__webpack_modules__[id] = (module) => {
					module.exports = factory(); // 返回加载完的模块内容
				}
			};
		});
	}
}
```

结合源码的注释来看,我们可以发现它的整个流程大致是:

导入一个远程模块  =>  获取该模块对应的实际来源  =>  通过该模块`id`获取其所有依赖项  =>  得到最终结果

## 总结

通过这一番介绍，相信大家也对`Module Federation`这项技术有了一个大致的了解，如果说有兴趣的话，可以再深入挖掘挖掘它的其他有意思的玩法，笔者在探索的过程当中感受到这项技术的潜力，在未来，或许它将会是微前端的终极解决方案，一个天然支持远程组件调用的方案。

> 小声bb：全面拥抱`Module Federation`、抛弃微前端、抛弃`iframe`，`webpack yes`。

## 参考链接

[探索 webpack5 新特性 Module federation 在腾讯文档的应用](http://www.alloyteam.com/2020/04/14338/)

[官方文档](https://webpack.docschina.org/concepts/module-federation/)

[YY团队emp](https://github.com/efoxTeam/emp/blob/main/README-zh_CN.md)

[一起来看一看Webpack Module Federation](https://zhuanlan.zhihu.com/p/245114955)

[三大应用场景调研，Webpack 新功能 Module Federation 深入解析](https://developer.aliyun.com/article/755252)
