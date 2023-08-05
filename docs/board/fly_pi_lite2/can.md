# CAN配置

> [!TIP]
> **lite2can速率为1000000**

> [!TIP]
> **可以使用下方代码修改为500k速率**

```
sudo sed -i 's/1000000/500000/g' /etc/network/interfaces.d/can0
```

改完需要重启

```
sudo reboot
```

