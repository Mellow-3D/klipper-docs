> [!TIP] 
>
> 浏览器打开你的IP:9999来访问FLY-Tools

<!-- tabs:start -->

### **HDMI**

* HDMI屏幕

![hdmi](../../images/boards/fly_pi/hdmi.png)

### **TFT**

* TFT屏幕

![tft](../../images/boards/fly_pi/kp.png)

<!-- tabs:end -->

>[!WARNING]
>通电前请注意屏线方向是否正确

>[!WARNING]
>通电前请注意屏线方向是否正确

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

## TFT屏幕接线

![tft](../../images/boards/fly_gemini_v3/10-2.jpg)

* FLY-Gemini-V3接线**请注意FPC与排线只需要接其中一种**

![tft](../../images/screen/v2.png)

## FLY TFT V2接线图

> [!Warning]
>
> 配置方法与TFT V1一样！！！



![pi-v2](../../images/adv/tftv2.jpg)
