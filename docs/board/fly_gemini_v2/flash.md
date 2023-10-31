# 9. 固件编译烧录

## 1. 拨码开关设置

如图所示，需要将第 **3**、**4**  拨码开关向上拨至打开状态，其余保持关闭状态。在这种模式下，可以理解为STM32直接通过内部走线连接到上位机。**一般使用这种模式**

![dip1](../../images/boards/fly_gemini_v2/dip1.png)

## 2. 固件编译

编译固件前请确保 [连接到SSH](/board/fly_pi/FLY_π_ssh "点击即可跳转")

这里只进行简要说明，完整编译步骤请查看：[编译klipper固件](/board/fly_super8/firmware?id=_1-编译klipper固件 "点击即可跳转")。

**固件配置方法**

<!-- tabs:start -->

#### ****普通USB固件配置****

![usb](../../images/boards/fly_gemini_v3/usb.png)

#### ****CAN固件配置****

>[!Tip]
>此方法是通过主板连接CAN设备，请确保上位机的can0、桥接主板的CAN速率、CAN工具板的速率完全一致

![usb2can](../../images/boards/fly_gemini_v2/config-can.png)

<!-- tabs:end -->

* 执行命令下方指令来编译固件

```
make clean
make -j4
```



## 3. 固件烧录

1. 准备一张SD卡(<32GB)，并且格式化成 **FAT32** 格式
2. 将klipper.bin复制到SD卡，并且重命名为```firmware.bin```

![putty](../../images/firmware/flash1.png ":no-zooom")

3. 主板断电，将SD卡插入主板
4. 给主板上电，等待10秒左右
5. 取下SD卡，插入电脑。如果SD卡中的看``firmware.bin``消失，出现```FLY.CUR```就是烧录成功了

![putty](../../images/firmware/flash2.png ":no-zooom")

