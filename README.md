# gh-rankings-client

## Info


## Before setup

download git_submodule
```
git submodule sync

git submodule update --init
```

copy dotenv and update `VUE_APP_API_URL`
```
cp .env.example

VUE_APP_API_URL=https://gh-rankings.epoch.tw/api/
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
