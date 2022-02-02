# eslint-plugin-practice

just for practice

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-practice`:

```sh
npm install eslint-plugin-practice --save-dev
```

## Usage

Add `practice` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "practice"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "practice/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


