# Inexorable-Kingslayer

## How to deploy to heroku

```
git checkout master

git pull origin master

git checkout rct/master

git merge rct/master master

git push heroku rct/master:master
```

## Ensure one instance of the server is running

```
heroku ps:scale web=1
```

## Open heroku server with browser

```
heroku open
```
