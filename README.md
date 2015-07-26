[![Build Status](https://travis-ci.org/CoderCoop/npc.assets.svg?branch=qunit)](https://travis-ci.org/CoderCoop/npc.assets)

```
npm install
grunt
```

```
cd dist
python -m SimpleHTTPServer
```


```
aws s3 cp ./gzip s3://chesapeake-native-plants --profile codercoop --expires "$(date  --date='1 week')" --recursive --content-encoding "gzip"
```
