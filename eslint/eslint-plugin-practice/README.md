# eslint-plugin-es-practice

none

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-es-practice`:

```sh
npm install eslint-plugin-es-practice --save-dev
```

## Usage

Add `es-practice` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "es-practice"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "es-practice/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


