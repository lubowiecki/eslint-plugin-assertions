# @lubowiecki/eslint-plugin-assertions

## Dependencies

### Install dependencies

```
npm install -D @lubowiecki/eslint-plugin-assertions
```

### Install peerDependencies

```
npm install -D eslint

```

## Config

.eslintrc.json

```
"plugins": ["@lubowiecki/assertions"],
"rules": {
    "@lubowiecki/assertions/assertions-code": [
        "error",
        "^[a-z0-9]{8}$"
    ],
    "@lubowiecki/assertions/assertions-condition": ["error"]
}
```
