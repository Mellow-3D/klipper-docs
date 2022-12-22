# 固件烧录

?> Gemini v3烧录时不要在``G/BT1/3.3V``处插入任何跳线帽，烧录完成后将跳线帽插入``G/BT1``侧（拉低BT1）

1. 拨码开关设置
   * 拨码开关``1``,``2``打开将下位机与上位机通过内置USB连接，拨码``3``,``4``打开将下位机USB连接到板载Type-C端口
   * ``1``,``2``为一组，``3``,``4``为一组。两组不可同时打开

2. 固件编译
   * Gemini v3建议使用Klipper的USB桥接CAN固件，可以省去一个UTOC来通过CAN连接工具板
   * 普通USB固件配置

   ![usb2can](../../images/boards/fly_gemini_v3/usb.png ":no-zooom")

   * USB桥接CAN固件配置

   ![usb2can](../../images/boards/fly_gemini_v3/usb2can.png ":no-zooom")

   * 执行命令```make -j4```来编译固件

3. 固件烧录
   * 执行下面的命令来添加一键烧录工具，这个命令只执行一次，后续烧录不用
   * ```bash
   sudo wget https://cdn.mellow.klipper.cn/shell/geminiv3-flash -O /usr/bin/geminiv3-flash > /dev/null 2>&1 && sudo chmod +x /usr/bin/geminiv3-flash || echo "The operation failed"
   ```
   * 执行下面的命令来自动烧录固件
   * ```bash
   sudo geminiv3-flash
   ```
   * 注意：以上命令烧录固件会将``~/klipper/out/klipper.bin``烧录到下位机，请在烧录前编译好固件