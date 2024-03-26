# 编译固件

编译固件前请确保 [连接到SSH](/board/fly_pi/FLY_π_description5 "点击即可跳转")

这里只简要介绍固件编译参数

> [!TIP]
> 固件配置方法只是参考，需要按主板提供配置来配置

编译好的固件下载链接

1M的CANBOOT

```
https://cdn.mellow.klipper.cn/BL/FLY_SB2040_CANBOOT_1M.uf2
```

500K的CANBOOT

```
https://cdn.mellow.klipper.cn/BL/FLY_SB2040_CANBOOT_500K.uf2
```

**固件配置方法**

1. 进入CanBoot

    ```bash
    cd ~/CanBoot
    ```
    
2. 修改Canboot编译配置

    ```bash
    make menuconfig
    ```

# 固件

<!-- tabs:start -->



### **500k**

![config](../../images/boards/fly_sb2040/canboot1.png ":no-zooom")





### **1M**

![config](../../images/boards/fly_sb2040/canboot2.png ":no-zooom")

<!-- tabs:end -->





# 烧录方法

1. 查看是否连接到SB2040的BOOT烧录模式
   
    按住SB2040板的BOOT键，然后将usb连接到电脑

    ![boot](../../images/boards/fly_sb2040/boot.png)
    

2. 把canboot.uf2放进去，弹窗会关闭

   ![pri](../../images/boards/fly_sht36_pro/pri.png)



3. 检查

如果正确配置编译并烧录成功，则SB2040板的这个灯会闪烁

<img src="../../images/boards/fly_sb2040/statusled.png" alt="firmware_led" style="zoom:85%;" />