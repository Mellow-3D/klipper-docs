# 19.使用上位机40PIN的UART接口

* 请确保接线牢固稳定！！！

## 1.通过SSH打开UART

```
 sudo nano /boot/armbianEnv.txt
```

![I2C](../../images/boards/fly_pi_v2/I2C.png)

* 找到`overlays=usbhost2 `并且在后面添加`UART2`与`UART1`
* 保存退出并且重启

```
CTRL+S
CTRL+X
sudo reboot
```

