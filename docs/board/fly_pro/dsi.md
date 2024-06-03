# DSI使用

* 镜像烧写完成后，打开TF卡在`/boot/firmware/config.txt`中添加

```
dtoverlay=vc4-kms-dsi-7inch
```

![dsi](../../images/boards/fly_pro/dsi.png)

保存重启系统即可

![dsi](../../images/boards/fly_pro/dsi.jpg)
