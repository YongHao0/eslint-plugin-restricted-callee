# eslint-plugin-restricted-callee

Provides rule configurations to organize specific method executions within designated directories

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-restricted-callee`:

```sh
npm install eslint-plugin-restricted-callee --save-dev
```

## Usage

Add `restricted-callee` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "restricted-callee"
    ]
}
```


Then configure the rules you want to use under the rules section.

```js
{
    "rules": {
        "restricted-callee/limit-callee": [
            "error",
            [
                {
                    limitCallee: 'provide',
                    limitDir: [
                        '/src/views/house-detail'
                    ]
                }
            ]
        ]
    }
}
```
