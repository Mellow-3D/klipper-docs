## 1. Klipperscreen的配置

找到下图所示选项，将``klipperscreen=flase``修改为``klipperscreen=true``，则可启用klipperscreen屏幕。

![config1](../../images/boards/fly_pi/config1.png)

另外还需要指定使用的屏幕类型才能够正常使用！！！按下图中的提示修改为对应的配置即可。

<!-- tabs:start -->

### **HDMI**

* HDMI屏幕只需要修改Display此选项即可

![hdmi](../../images/boards/fly_pi/hdmi.png)

### **TFT**

![tft](../../images/boards/fly_pi/tft1.png)

* 请注意(FLY-Pi) & (FLY-π) & (FLY-Gemini v1~v3) & (FLY-Pi Lite2) 使用FLY-TFT-V1
* (FLY-Pi v2) & (FLY-C8)使用FLY-TFT-V1-NEW

![tft](../../images/boards/fly_pi/tft2.png)

* TFT屏幕旋转只能选择**90**或者**270**

![tft](../../images/boards/fly_pi/tft3.png)

<!-- tabs:end -->



>[!WARNING]
>通电前请注意屏线方向是否正确

## 2. CAN与klipperscreen导致超时的解决方法

>[!WARNING]
>如果搭配CAN工具板则有可能导致归位超时，只需执行下方命令即可

>[!WARNING]
>此操作可以解决归位超时，但是会修改Klipper源码，请慎重选择

```bash
sed -i 's/TRSYNC_TIMEOUT = 0.025/TRSYNC_TIMEOUT = 0.05/g' /home/fly/klipper/klippy/mcu.py 
sudo systemctl restart klipper
```

> [!WARNING]
> 如果更新了Klipper则可能会将源码修改回去

## 3. HDMI与TFT屏幕接线

![](../../images/boards/fly_c8/screen.jpg)

## FLY TFT V2接线图

> [!Warning]
>
> 配置方法与TFT V1一样！！！



![pi-v2](../../images/adv/tftv2.jpg)
