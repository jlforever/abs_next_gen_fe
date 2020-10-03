# abs_next_gen_fe

## Deploy

### Add staging/production branches

```
heroku git:remote -a abs-next-gen-fe-staging -r abs-next-gen-fe-staging
heroku git:remote -a abs-next-gen-fe-production -r abs-next-gen-fe-production
```

### Staging

```
$ git checkout development
$ git pull
$ git push abs-next-gen-fe-staging development:master
```

### Production

```
$ git checkout master
$ git merge development
$ git push origin master
$ git push abs-next-gen-fe-production master:master
```

### Deploy a feature branch to staging

```
$ git checkout feature-branch
$ git push --force abs-next-gen-fe-staging feature-branch:master
```

push staging branch back when testing is complete

```
git checkout development
git push --force abs-next-gen-fe-staging development:master
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

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
