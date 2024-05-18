# CSI使用

* 镜像烧写完成后，打开TF卡在`/boot/firmware/config.txt`中找到`camera_auto_detect=1`并且修改成`camera_auto_detect=0`然后添加

```
dtoverlay=imx219,cam1
```

![csi](../../images/boards/fly_pro/csi.png)

保存重启系统即可
