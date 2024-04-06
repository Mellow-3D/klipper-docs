# 首页-设备ID

## 功能演示

![id](../../images/boards/fly_tools/home.gif)

* 支持一键复制设备ID，自动识别ID并且前面对应的配置添加**serial:** ，**canbus_uuid:** ，**device:**

* 支持CAN速率与CAN缓存修改，可方便玩家自定义CAN
* 支持摄像头设备查询，避免了玩家搜索摄像头的麻烦

>[!Tip]
>
>请注意FLY-Tools不会自动创建can配置需要自行创建CAN配置才可以使用CAN速率与CAN缓存修改

* 请提供SSH使用网络连接到你的用户后执行下方命令

```
sudo /bin/sh -c "cat > /etc/network/interfaces.d/can0" << EOF
allow-hotplug can0
iface can0 can static
    bitrate 1000000
    up ifconfig $IFACE txqueuelen 1024
    pre-up ip link set can0 type can bitrate 1000000
    pre-up ip link set can0 txqueuelen 1024
EOF
```

