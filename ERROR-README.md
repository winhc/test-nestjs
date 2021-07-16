### If you have found this problem in REDIS
```zsh
stop-writes-on-bgsave-error
```

### redis-cli
```zsh
127.0.0.1:6379> CONFIG SET dir data/tmp
OK
127.0.0.1:6379> CONFIG SET dbfilename temp.rdb
OK
127.0.0.1:6379> BGSAVE
Background saving started
127.0.0.1:6379> CONFIG SET stop-writes-on-bgsave-error no
```

### restart redis service

```zsh
brew services stop redis
brew services start redis
```

➡️ [reference](https://gist.github.com/kapkaev/4619127)